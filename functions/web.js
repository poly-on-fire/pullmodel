const admin = require('firebase-admin');
const functions = require('firebase-functions');

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const stringify = require('json-stringify');
const db = admin.database();
const chatReceivedRef = db.ref("chatReceived");
const app = express();
const VERIFY_TOKEN = "pullmodel";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/webhook/', function (req, res) {
  let token = req.query['hub.verify_token'];
  let mode = req.query['hub.mode'];
  let challenge = req.query['hub.challenge'];
  if (token === VERIFY_TOKEN && mode === 'subscribe') {
    res.send(challenge);
  } else {
    console.log('WEBHOOK_NOT VERIFIED ' + token + ' - ' + challenge);
    res.send(403);
  }
});

app.post('/webhook/', function (req, res) {
  let token = req.query['hub.verify_token'];
  let mode = req.query['hub.mode'];
  let challenge = req.query['hub.challenge'];
  if (req.body.entry[0].messaging[0]) {
    let messaging_events = req.body.entry[0].messaging;
    for (let i = 0; i < messaging_events.length; i++) {
      let event = messaging_events[i];
      if (event.message && event.message.text) {
        let sender = event.sender.id;
        let text = event.message.text;
        try {
          if (isEnrollAs(text)) {
            enrollmentOptioned(sender, text);
          } else {
            if (isSubscribeTo(text)) {
              text = "You are subscribed!"
            } else {
              text = "Thanks. We got your message, and will respond as quickly as our rather modest systems allow."
            }
            sendText(sender, text);
          }
        } catch (err) {
          console.log("FAILED DUDE\n" + err);
        }
        chatReceivedRef.push().set({
          "sender": sender,
          "message": text
        });
      }
      else {
        //ignores parts of the message that are not text from the user
      }
    }
  }
  res.sendStatus(200);
})
;

const sendText = (sender, text) => {
  let messageData = {text: text}
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: {access_token: functions.config().pmpageaccesstoken.id},
    method: "POST",
    json: {
      recipient: {id: sender},
      message: messageData,
    }
  }, function (error, response, body) {
    if (error) {
      console.log("ERROR " + stringify(error))
    } else if (response.body.error) {
      console.log("RESPONSE BODY ERROR " + stringify(response.body.error))
    }
  })
}

const enrollmentOptioned = function (sender, text) {
  let id = text.substring(8, text.length);
  return db.ref('/fbSearch/' + id).once('value').then(function (snapshot) {
      let msg = "Enrollment failed. We will respond as quickly as our rather modest systems allow to help you resolve this issue";
      if (!!snapshot) {
        if (snapshot.val() !== null) {
          var timeStamp = (snapshot.val().timeStamp);
          if (!!timeStamp) {
            msg = "You are enrolled!";
          }
        }
      }
      sendText(sender, msg);
    }
  );
  return false;
}

exports.app = functions.https.onRequest(app);