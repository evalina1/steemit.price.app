# Intro
I wanted to see the real earnings you could get from a Steemit Post. I couldn't find any usable app or solution.

I created a mobile app that helps estimate your post payouts. Calculates how much reward you will receive for your posts in the currency of your country or any currency you wish to choose!!

[![https://play.google.com/store/apps/details?id=steemit.price.app](https://i.imgur.com/plsEMoU.png)](https://play.google.com/store/apps/details?id=steemit.price.app)
https://play.google.com/store/apps/details?id=steemit.price.app

### Screenshots

https://i.imgur.com/BCCKOqx.png

https://i.imgur.com/l4jJWbE.png

### What can it do?
- Completely Free!
- Calculate the real earnings of your posts.
- Calculate price & exchange it into 30+ currencies!
- Use username to get all post payouts.
- Get UP TO DATE information based on https://coinmarketcap.com/
- Calcualte your earnings in your prefered currency
- Exchange the price of Steem Dollars in your prefered currency
- Track Hourly & Daily percentage change of the price
- IOS & Android Support

### Built with:
- Ionic 2
- https://coinmarketcap.com/api/

### Cool, but is it safe?
Absolutely!
The simple fact, is that it doesn't ask for password, keys or anything like that. 
It only uses the publicly available information from coinmarketcap and steemit website's api to provide you with the results.

### Prerequisites
To build the application you will need the following to be installed
- NodeJs (https://nodejs.org/en/)
- Ionic2 (https://ionicframework.com/getting-started)
- Cordova (https://cordova.apache.org/#getstarted)
- Android Studio for Android
- XCode for IOS

### Build & Deploy

**Install Cordova & Ionic2 Plugins**

Debug build:
`ionic cordova build android`
or
`ionic cordova run android`

Release build:
`ionic cordova build --release android`

For proper release build you have to create a signing key file in keys folder
`cordova build android --release -- --keystore=./keys/<keystorefile> --storePassword=<password> --alias=<alias> --password=<password>`

### Question & Problem & Bug?
Please Comment :)

### Feedback is always welcome!

-   I am also preparing a contribution on github and sharing the source code :)

Edit just pushed an update that fixed a couple of issues thanks for the feedback everyone :)