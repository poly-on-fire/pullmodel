const admin = require('firebase-admin');
const functions = require('firebase-functions');

function oneWord (content){
  let trimmedContent = content.trim().replace("-", "");
  if(trimmedContent.length===0){return false}
  return trimmedContent.trim().split(/\b\W+\b/).length===1?true:false;
}

function startsWith (start, content){
  let trimmedContent = content.trim();
  return trimmedContent.substr(0, start.length).toUpperCase() == start.toUpperCase()?true:false;
}

function oneWordStartsWith(start, content){
  if(!oneWord(content)){return false};
  if(!startsWith(start, content)){return false};
  return true;
}

isSubscribeTo = (content) => {
  if(!oneWordStartsWith("subscribeTo", content)){return false};
  if(content.trim().length<25){return false};
  return true;
}

isEnrollAs = (content) => {
  if(!oneWordStartsWith("enrollAs", content)){return false};
  if(content.trim().length<30){return false};
  return true;
}

foo = () => {
  console.log("legafoo");
}

// Update a user's roles based on changes the their roles entry in the database
// exports.setUserRoles = functions.database.ref('/users/{userId}/roles').onWrite((event) => {

