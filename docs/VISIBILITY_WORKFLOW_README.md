# Visibility Workflow

This doc explains how the visibility system works, to assist the maintaining developer as he re-familiarizes himself
with the functionality of the code. Ideally, this will save him much time, as it is not entirely intuitive.

* **Basic Ideas** What is the intent of this design and implementation?
* **Reference Project** Usage as a reference project
* **Redux** Basic Redux and points of intersection
* **QueryParams, Cookies, Redux, DB** How the various key parts ratchet the role as it gathers it's final state act as the initial gate-keeper
* **States** What are the different states of a user?
* **Code: What Where?** Where to look for what, in the code.
* **Future Redux Options** Possible expansion of Redux into other areas
* **Logging** What is logged to db and where?
* **Multiple Passes** Notes on chatter and how ignored
* **Features Not Attempted** Notes on stuff that would be nice, but not now.
* **Visibility Code** How the specific code works for making something visible
* **Real Security** What it is NOT: Security vs visibility & workflow

## Basic Ideas

1. Provide modest **access control** - who can get into the app and use it
1. **Reduce overwhelm** for the user caused by too many options visible at any one time, especially options which
the user is not authorized to access even if he/she could see them.

In a practical sense, this system is a surrogate for client side security. Please note Real Security section for the 
difference between this system, and actual application security.

To understand this system you need to first grasp the tension between two opposing technical challenges around the design
of this system.

* This visibility system is **heart** of the pullmodel app, in that more time and attention
has gone into this part of the app than any other part of the app, by far.
* It remains inadequate on many levels, and should probably always remain inadequate, in that perfection would be both 
impossible and probably a waste of time due to ever-conflicting user needs.

So based on this assumption of inadequacy, the basic idea is that TMI/overwhelm is the biggest problem
to be overcome with this or any similar app, and this is the primary goal of the visibility system, 
to somehow throttle down the overwhelm factor and **_to keep the user of this app..._**

* focused
* relaxed
* productive

## Reference Project

Given that every app needs to curb overwhelm and TMI, note also that these goals are not specific to this app's primary 
function as a drip delivery system.

Almost any app would share these same needs.

Thus it is expected that other apps might be created which start from this code base, given what it is already
in the visibility workflow system. 

## Redux

Redux is not documented here as plenty of great docs exist on the redux and other sites. Items of interest are noted 
below, otherwise this is a reasonably tame usage of Redux code.

* Redux is much more powerful and useful than the minimal usage within this code base.
* This project consumes polymer-redux, [an adapatation of redux itself](https://github.com/tur-nr/polymer-redux)
* Redux itself is helpful to study just [to learn the basic terms](https://redux.js.org/)
* An absolutely cut-back usage of redux for the most understandable demo is [here](https://github.com/poly-on-fire/poly-on-fire-redux)
* I used this demo to guide me in my [initial implementation](https://github.com/danielepiccone/polymer-redux-demo)


## Params, Cookies, Redux, DB, Roles

Each of the parts below serves a subset of the functionality furnished within this system:

* **QueryParams** One cannot get into the real app initially without the required params, unless a previous set of params deposits
a cookie on the site.
* **Cookies** As one progresses through pre-login state, cookies act as a local database of progress to date. 
This is especially helpful before first social login, because until then, nothing is persisted in the db about
that particular user. Cookie also could act as a temporary source for role until DB returns role, but that has proven
to be not necessary because DB returns role so quickly.
* **Redux** State management engine does the work of maintaining role status for the rest of the UI
* **DB** Maintains external state of roles, beginning at first login. DB is the
ultimate arbiter of role status, and over-rides Params or Cookies when different.
* **VisibilityController** Moderates inputs from Params, Cookies, DB to give Redux a single source of information.
* **Roles** List of roles that redux moderates is mostly sequential, see states below.

**Sequence:** Before anything of consequence is allowed to happen, params, cookies, and db is read into VisibilityController 
for it to dynamically configure what to pay attention to. Params and cookies are read synchronously, the DB is read real
time, but asynchronously. After these events, the highest role allowed per the rules of VisibilityController is sent to Redux, which moderates 
the UI and how it is consumed.

**Burping** It is a feature of this system to respond in a friendly way when information coming from the DB is slow to arrive.
As a negative side effect, it is possible, but not likely, that the cookie might allow the user a higher access state, 
and then, when the DB returns it's result, the user is moved down to a lower state - for example if the admin has revoked
the user's publisher permissions. This would show up on the user's side as a kind of burp - first he has access to something, 
then this access disappears. Though less than perfectly graceful, this negative side effect is both rare and of little consequence,
so the design has not changed to avoid it. 

## States (or Roles)

This system assigns every user to a named role, and then, according to that role, assigns one or more charachter based 
role codes. The role codes (such as d, e, f) are what make any UI component visible, or not, within the UI.

It is not obvious until you look within the code, but a typical user is configured for multiple role codes, allowing 
him or her to see multiple types of UI components.

The most fundamental typical user is assigned to e. 

The typical publisher or leader within this system is assigned to both e and h 

a-d are used to funnel the user through the various initial states of gathering information to become a typical logged in user

Admin would be assigned e, g, and h, where h is for admin-only UI components.

* **a: anonymous** blah
* **b: passive** blah
* **b: unknown** blah
* **b: invited** blah
* **d: passiveUser** blah
* **d: unknownUser** blah
* **e: subscriber** blah
* **f: pendingLeader** blah
* **g: leader** blah
* **h: admin** blah
* **j: superAdmin** blah

## Code: What Where?

Where to look for what, in the code.


* **Initial Access Point** my-app.html provides the initial access point for users into this system. Note that it
shunts off as much as it can, as quickly as it can, to the visibility-controller
* **Messy Stuff** The visibility-controller does most of the messy stuff like negotiating when state changes etc. Look 
here first when you're trying to fix problems or add features. Look for calls to the dispatch() method for keys to
the most important functionality in this class.
* **dispatch()** When the messy stuff is done and it is time to assign a role to the user, that work is done in 
**redux-store.html**. This is where the code of the redux dispatch() method is actually run.
This class tries to stay as clean and dumb as possible.
* **...extends ReduxMixin** Note that all UI components tend to extend ReduxMixin. This allows them to use this 
functionality within the properties. ```role: {
                                                    type: Object,
                                                    statePath: 'role'
                                                  }```
* **UI Visibility Code** See Visibility Code below

## Future Redux Options

I am putting this special section here because recent commentary on the polymer slack channel has pointed to 
opportunities beyond what I have coded for in this app.

Both westbrook and amurdock have pointed to options to use routing beyond the system I implemented from the starter
kit. This did not present much incentive for me until westbrook pointed out that he has been using this system for his 
routing which uses Redux for it's base: https://medium.freecodecamp.org/an-introduction-to-the-redux-first-routing-model-98926ebf53cb

Two notable points:

* The redux-first routing system offers some nice features to think about.
* There are other usages of Redux within this app which have not been conceptualized.

Also note that there is a general discussion on slack about the migration to lit-html and the subsequent, intentional
lack of 2 way binding in that system. Here 2 way binding is described as a negative, not a positive. I don't know
enough about this to think about alternatives. It remains possible that Redux may step in as one possible alternative?
Something to study.

## Logging

As of the time of this writing, there is some minimal logging of timestamp and date when a user logs in.

* This is experimental only, no idea if it will prove useful
* Should probably move to firestore, if it remains.


## Multiple Passes
 
Notes on chatter and how ignored ??? not sure why I started this section but I guess I'll find out 

* TODO
 
## Features Not Attempted

Notes on stuff that would be nice, but not now. 

* TODO

## Visibility Code
 
How the specific code works for making something visible:

I found that the code for making things visible was less than perfectly consistent - what worked in some circumstances
did not seem to work in all circumstances. So with this caveat, the basics of making something visible or not goes like
the examples below, but you would need to experiment and search the code for more realistic examples.

Visible 

`<div hidden$=[[!role.show.h]]>`

Not Visible 

`<div hidden$=[[!user]]>`

##Real Security

What it is NOT: Security!

This system does not provide for security. Making things visible or not, with javascript on the client, is very useful
for many purposes, but this provides absolutely no security in the real sense because any client based script can be
replaced on the client.

The developer is reminded that any true security must be furnished on the back end, such as - within the constraints
of this application - on the server or database side. 

Most typically that would happen within this app as database-rules within the firebase realtime DB. But this is way 
beyond the scope of this document.
