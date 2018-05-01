*poly-on-fire* is a collection of proof-of-concept projects using [Polymer](https://www.polymer-project.org/) and [Firebase](https://firebase.google.com/)

|[**_Pete Carapetyan_**](http://appwriter.com)|  [TL;DR? blog](https://betterologist.net/2018/04/poly-on-fire-polymer-on-firebase/) |[TL;DR? _video:_](https://youtu.be/P9DwkqqUxNs)|
| --- | --- | --- |
|<a href="http://appwriter.com"><img class="style-svg" src="https://betterologist.net/wp-content/uploads/2016/05/pete-300x297.jpg" alt="pete" width="116" height="115" /></a>|<a href="https://betterologist.net/2018/04/poly-on-fire-polymer-on-firebase/" ><img class="style-svg" src="http://docs.datafundamentals.com/txt.png" alt="jammazwanPhotoSmall" width="200" height="116" /></a>|<a href="https://youtu.be/P9DwkqqUxNs"><img class="style-svg" src="https://betterologist.net/wp-content/uploads/2016/05/jamzVid1.png" alt="about" width="115" height="115" /></a>|


##### A project for learning an aspect of developing a Polymer app, deployed on Firebase hosting.

The idea is to prove out an approach or component in the simplest project first, before combining it with other code in a real project.

----

# \<pullmodel\>

## What it does:

PullModel is a lab project to prove out Polymer2 on Firebase as a viable application platform.

It is developed by me, Pete Carapetyan, on and off in 2016, 2017, 2018.

## Why? What is the Motive?

I've been writing apps that suck, since 1972 when I wrote my first APL Basic app on a 1960's mainframe.
They **always fall short:**


* Won't **deploy** on meaningfully wide array of devices.
* **Hard** to write or maintain the code.
* What I write is immediately **obsolete** code because the next, and also **fat**, framework is completely better and different.
* Subsequent **releases** becomes a nightmare.
* Features are too **limited** - users find app more trouble than it's worth.
* High **costs** make it where only a large corporation can bankroll a decent application through it's lifecycle.

Web components in a PWA, deployed on a free hosting platform such as Firebase make all of these sucks go away.

* **No excuses** - anyone with decent technical chops can write, deploy, maintain, and pay for a fully featured app.
* Front end, back end, whole deal - **NO OPS!** Not devOps, NO OPS. Bad ass.
* **Anyone can bankroll it**, free tier is enough, paid tier is affordable.
* **Deploys anywhere**, mobile, desktop, anywhere that a browser is already installed.
* Won't have to rewrite in 'latest' 3 years later??? Because this relies **browser** code, not a fat layer on top.
* Awesome features even **compete with native** phone apps. But still works on desktop!
* Responsive - lightweight code uses browser to do the heavy lifting.
* Don't even get me started on how cool the **event based** realtime database is, says the decades-experienced synchronous back end dev.

Personal opinion: _We haven't yet metabolized how big this moment is._ We're so used to _this sucks_ that it might not
occur to us how the ground will shift when it doesn't suck any more.  If it sucks from 1972 to 2017, and it doesn't suck
in 2018, would anyone even notice? Probably not.

But it's a big moment, even if nobody notices.

## Primary Technical Features

All primary features are developed first in poly-on-fire projects separately one at a time. In this manner, you can
isolate the code for achieving that feature without the confusion of the entire app.

These features are all pretty normal features as might be found in any modern application.

The poly-on-fire projects linked below are code building blocks or demo projects for this pullModel codebase.

* cookies
* query params
* state management
* CRUD: Create, Retrieve, Update, Delete
* db permissions for actual data security
* visibility hiding for functional UI security and workflow management
* Authorization/Authentication using external OAuth (google, facebook, twitter, github)
* messaging via SMS, Facebook Messenger
* back end processing - fired by database events

## Primary Functional Features - Education or Pull Marketing

The feature set that pullModel uses to expose it's technical features:

* Publisher can create a topic and release email messages on a drip basis, one day at a time.
* Subscriber can both subscribe and unsubscribe to email message streams.
* Subscriber can add SMS and Facebook Messenger noticifications that an email has been dropped.
* Publisher can create and publish a basic pair of web pages offering his video as preview content.

I haven't used it before but pullModel is probably a poor man's version of AWeber or something like that.

## What is Pull Education or Marketing?

Pull Education or Pull Marketing is too big a topic for discussion here, but it has been a very hot topic for years, and you
should have no trouble searching the web for good information.

## Is the app deployed where I can view it working?

Yes, and no.

Yes, it is a working app. And yes, you can view it working on my youtube video, or at least whenever I create a latest
version.

But it is an app that can be easily abused by marketers so my own installation is strictly limited to
invitation only.

The good news for a techie is that it's pretty easy to install and run on your own free Firebase account, so there is that.

## What external providers does it consume?

* SMTP email host vendor
* SMS vendor
* Facebook for Messenger
* Google, Twitter, Facebook and GitHub for OAuth
* Firebase for hosting, serverless nodeJs functions, database.

None of these rack up any kind of serious monthly charges, but you still have to set them up to run the app in
it's fully featured form.

## Project Building Blocks ##

This project was used to initialize almost all of the other projects

* poly-on-fire-init

These projects were code-builing blocks - demo/test projects for code before implementing them in pullmodel:

* poly-on-fire-cookies
* poly-on-fire-crud-simple		
* poly-on-fire-social-logins
* poly-on-fire-fb-messenger-bot		
* poly-on-fire-nodejs-admin-server
* poly-on-fire-query-params		
* poly-on-fire-redux
* poly-on-fire-all-ui-combined		
* poly-on-fire-roles-DB-permissions
