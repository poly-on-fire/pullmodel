'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const stringify = require('json-stringify');
const db = admin.database();
const chatReceivedRef = db.ref("chatReceived");
const app = express();
const VERIFY_TOKEN = "pullmodel";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/webhook/', function(req, res){
  let token = req.query['hub.verify_token'];
  let mode = req.query['hub.mode'];
  let challenge = req.query['hub.challenge'];
  if(token === VERIFY_TOKEN && mode === 'subscribe'){
    res.send(challenge);
  }else{
    console.log('WEBHOOK_NOT VERIFIED '+ token + ' - ' + challenge);
    res.send(403);
  }
});

app.post('/webhook/', function(req, res){
  let token = req.query['hub.verify_token'];
  let mode = req.query['hub.mode'];
  let challenge = req.query['hub.challenge'];
  if(req.body.entry[0].messaging[0]){
    let messaging_events= req.body.entry[0].messaging;
    for (let i=0; i < messaging_events.length; i++){
      let event = messaging_events[i];
      if (event.message && event.message.text) {
        let sender = event.sender.id;
        let text = event.message.text;
        sendText(sender, "Back at you: " + text.substring (0, 100));
        chatReceivedRef.push().set({
          "sender": sender,
          "message": text
        });
      } else {
        //ignores parts of the message that are not text from the user
      }
    }
  }else{
    console.log("NO EVENT ENTRY MESSAGE: \n "+stringify(req.body));
  }
  res.sendStatus(200);
});

function sendText(sender, text) {
  let messageData = {text: text}
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs : {access_token: functions.config().pmpageaccesstoken.id },
    method: "POST",
    json: {
      recipient: {id: sender},
      message : messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log("ERROR "+ stringify(error))
    } else if (response.body.error) {
      console.log("RESPONSE BODY ERROR " + stringify(response.body.error))
    }
  })
}

exports.app = functions.https.onRequest(app);
