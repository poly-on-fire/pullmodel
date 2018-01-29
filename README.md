# poly-on-fire-all-ui-combined
Combined UI built from all other poly-on-fire building blocks - Polymer on Firebase

* Built with polymer starter kit
* Will not work on localhost because dependent on social media logins
* To view working version demo video is about only reasonable option
* My idea of what a 'real' or usable starter kit would look like
* Even better would be a jhipster like version of this ...
* Still need a polymer2 iron form to make it cooler

this is still needed
https://stackoverflow.com/questions/35087649/how-do-i-change-the-favicon-in-googles-web-starter-kit

# poly-on-fire-roles-UI-visibility
polymer project deployed to firebase, using roles to define UI visibility.

# First, the Logic of _Where?_

A short history of what not to do, first:

I did a variation of this project a year ago, and it ended up being a nightmare because I tried to do everything on the client, while still relying on the server for the basic information and persistence of the resulting visibility permissions.

The code ended up being complex, bordering on unmaintainable. More to the point, all that complexity wasn't serving any real purpose.

# Here are the design criteria that matter most

* Some combination of client, server, and db need to inform the decision of what the user should be seeing at any given point.
* The client should only have a copy of it's visibility permissions, never the original. DB should always hold the user's visibility permissions.
* The client should always use cookies with last time's permissions for that period of time when it is waiting for the latest updated copy of visibility permissions.
* The UI should never be unusable while waiting for visibility permissions.
* Clients can always be hijacked, so visibility and workflow are usability concerns, not truly security concerns. The db always needs to restrict access data by user, separately, even when the UI is totally hijacked.

# Resulting Design

Fast forward to 2018 and it occurred to me that really, almost none of the hairy-ass logic from above, belongs on the client. Rather than negotiating between the many concerns such as role based security, which are all based in the DB, just relegate all of these concerns to the same server that is doing the DB admin in the first place! This is what servers do well, and there's no need for async calls and weird logic combinations on the client.

* Client creates a service request record with user's id, indicating a need for the latest visibility permissions.
* GoogleCloudFunctions is listening for new request records, and responding appropriately by creating the correct usability records in the database.
* Until it receives the latest permission from the DB, client uses the last visibility permissions from the visibility cookie, if any.
* Once it gets the latest visibility permissions object from the DB, it's the job of Redux to pump it out to all visual components that care.

Simple, dumb, and easy. At least for the UI. And that's the primary concern of this project!

# Records > Events? or Events > Records

Another simpler way of visualizing the async problem is by noticing that every time we handle an event, part of that process is to maintain proper logs so that we can always audit what happened when. So there is a de-facto one-to-one coupling of logs and events.

When log and event is coupled, and our system is inherently driven by logged events, then we can simply rely on the log as a driver. This is backwards. But it works perfectly? And handles the async problem perfectly, as a side effect.

# Companion Projects - UI-visibility, and server

These two projects are, by necessity, are now joined at the hip:

1. poly-on-fire-**roles-UI-visibility**
1. poly-on-fire-**roles-server**

Or, put more appropriately, poly-on-fire-**roles-UI-visibility** has a dependency on poly-on-fire-**roles-server**. Thus, the docs in poly-on-fire-roles-server refer back to this doc for the same logic as noted above.

# How do UI-visibility, and server communicate?

Restating from above, UI-visibility, and server do not communicate directly. Instead, they are both writing to and listening for changes in the firebase DB.

* When UI-visibility writes to the DB, the server listens and writes to the DB
* When the server writes to the DB, UI-visibility listens

# So there's a running admin server just for roles?

In real life, these functions would probably be combined with other functions.

So poly-on-fire-**roles-server** would really just be poly-on-fire-**server**, one of whose functions is the maintenance of role-UI-visibility.
