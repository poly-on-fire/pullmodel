'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports = Object.assign(
  exports,
  require('./web.js'),
  require('./fbMessengerProcess.js')
);
