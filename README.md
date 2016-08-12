# trackParser
trackParser is a tiny credit card or magstripe card parser that reads in the raw string from the card and converts it to usable data. This can be used to charge a credit card as well as just read what is inside random magnetic stripe cards. For more information how magnetic cards work as well as the 3 different types of tracks available for the cards, visit [This Wikipedia Article On The Magnetic Stripe Card](https://en.wikipedia.org/wiki/Magnetic_stripe_card)

### *NOTE* ************************************
This libary only supports track 1 and track 2, **NOT** track 3

# Installation
	
Currently it is only available through npm or right here on github

	$ npm install trackparser

# Usage

```lang-js
const trackParser = require('trackparser');

var trackData = new trackParser("%B1234123412341234^CardUser/John^030510100000019301000000877000000?;1234123412341234=0305101193010877?");

if ( trackData.hasTrack1 ){
    console.log( trackData.lastName, trackData.firstName, trackData.account, trackData.expMonth + "/" + trackData.expYear)
}

// do stuff with trackData
```
