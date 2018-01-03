# Intro
I wanted to see the real earnings you could get from a Steemit Post. I couldn't find any usable app or solution.

I created a mobile app that helps estimate your post payouts. Calculates how much reward you will receive for your posts in the currency of your country or any currency you wish to choose!!


[![https://github.com/azarus/steemit.price.app](https://i.imgur.com/cHRsRB0.png)](https://github.com/azarus/steemit.price.app)
**Source code is available here:**
https://github.com/azarus/steemit.price.app



[![https://play.google.com/store/apps/details?id=steemit.price.app](https://i.imgur.com/plsEMoU.png)](https://play.google.com/store/apps/details?id=steemit.price.app)
**Prebuilt packages are also available in the appstore:**
https://play.google.com/store/apps/details?id=steemit.price.app


### Screenshots

![https://i.imgur.com/BCCKOqx.png](https://i.imgur.com/BCCKOqx.png)

![https://i.imgur.com/l4jJWbE.png](https://i.imgur.com/l4jJWbE.png)

### Built with:
- Ionic 2
- https://coinmarketcap.com/api/

### Prerequisites

To build the application you will need the following to be installed
- NodeJs (https://nodejs.org/en/)
- Ionic2 (https://ionicframework.com/getting-started)
- Cordova (https://cordova.apache.org/#getstarted)
- Android Studio for Android
- XCode for IOS

### Install Cordova & Ionic2 plugins

**Install Dependencies**
`npm install`

**Add platforms**
`cordova platform add android`

**Install Plugins**

`ionic cordova plugin add cordova-plugin-advanced-http`

To include admob api:
`ionic cordova plugin add cordova-plugin-admob-free`
`ionic cordova plugin add cordova-plugin-admob-sdk`




### Develpoment Environment with livereload

**For browsers:**
`ionic serve`

**For mobile version**
`ionic cordova run android --livereload`


### Build & Deploy

Emulator
`ionic cordova run android`

Debug build:
`ionic cordova build android`

Release build:
`ionic cordova build --release android`

**Android** For proper release build you have to create a signing key file in keys folder
or edit build.json
`cordova build android --release -- --keystore=./keys/<keystorefile> --storePassword=<password> --alias=<alias> --password=<password>`

### I have a question, feedback, feature requests, problem or found a bug?
Please open an issue ;)

