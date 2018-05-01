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

pullmodel.com has an actual end user to keep me from just producing _happy-path_ software, but this user is neither large nor impatient, so I only work on pullmodel in my spare time.

## More about pullModel

This project is summarized in [this blog post](https://betterologist.net/2018/04/about-pullmodel/).

Most of the other poly-on-fire projects were built first, to test out pieces of pullModel before implementing here.

PullModel acts as a matched pair with autoPm, where

* pullModel is the client code, mostly doing straight writes to firebase. Written in Polymer 2
* [autoPm](https://github.com/poly-on-fire/autopm) listens to those writes, and responds appropriately on the back end. Written in Java.