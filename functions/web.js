const admin = require('firebase-admin');
const functions = require('firebase-functions');

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const stringify = require('json-stringify');
const db = admin.database();
const chatReceivedRef = db.ref("chatReceived");
const fbSubEnrlRef = db.ref("fbSubEnrl");
const app = express();
const VERIFY_TOKEN = "pullmodel";
const SUBSCRIBE = 'subscribe';
const ENROLL = 'enroll';

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
            enroll(sender, text);
          } else if (isSubscribeTo(text)) {
            subscribe(sender, text);
          } else {
            text = "Thanks. We got your message, and will respond as quickly as our rather modest systems allow."
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

const enroll = function (sender, text) {
  let id = text.substring(8, text.length);
  return db.ref('/fbSearch/' + id).once('value').then(function (snapshot) {
      let msg = "Enrollment failed. We will respond as quickly as our rather modest systems allow, to help you resolve this issue";
      if (!!snapshot) {
        doThing(snapshot.val(), sender, id, msg);
      }else {
        sendText(sender, msg);
      }
    }
  );
  return false;
}

const doThing = function(snapVal, sender, id, msg){
  if (snapVal !== null) {
    var timeStamp = (snapVal.timeStamp);
    if (!!timeStamp) {
      msg = "You are enrolled!";
      console.log("DID THING");
      fbSubEnrlChange(sender, id, ENROLL);
    }
  }
  sendText(sender, msg);
}

const fbSubEnrlChange = function (sender, id, status) {
  let statusRef = null;
  if(status===ENROLL || status===SUBSCRIBE){
    statusRef = fbSubEnrlRef.child("/"+status+"/").ref

  }else{
    console.log("WOOPSIES DON'T DO THAT NEED ENROLL OR SUBSCRIBE");
  }
  let obj = {
    "sender": sender,
    "id": id,
    "timeStamp": Date.now()
  };
  statusRef.push().set(obj);
}

const subscribe = function (sender, text) {
  let id = text.substring(11, text.length);
  console.log("LOOK AT " + id);
  return db.ref('/topicLookup/' + id).once('value').then(function (snapshot) {
      let msg = "Subscription failed. We will respond as quickly as our rather modest systems allow, to help you resolve this issue";
      if (!!snapshot) {
        if (snapshot.val() !== null) {
          var topicKey = (snapshot.val().topicKey);
          if (!!topicKey) {
            msg = "You are subscribed!";
            fbSubEnrlChange(sender, id, SUBSCRIBE);
          }
        }
      }
      sendText(sender, msg);
    }
  );
  return false;
}

exports.app = functions.https.onRequest(app);