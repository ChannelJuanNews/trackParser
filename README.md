# trackParser
trackParser is a tiny credit card or magstripe card parser that reads in the raw string from the card and converts it to usable data. This can be used to charge a credit card as well as just read what is inside random magnetic stripe cards. For more information how magnetic cards work as well as the 3 different types of tracks available for the cards, visit [This Wikipedia Article On The Magnetic Stripe Card](https://en.wikipedia.org/wiki/Magnetic_stripe_card)

### *NOTE* ************************************
This library DOES support track 1, track 2, AND track 3 though track 3 is rarely used

# Installation

Currently it is only available through npm or right here on github

	$ npm install trackparser

# Usage

```javascript

const trackParser 		= require('trackparser').trackParser
const trackParserSync 	= require('trackparser').trackParserSync

// method for parsing a credit card
var cardinfo = trackParserSync("STRING HERE")
console.log(cardinfo)

// method for parsing a credit card with a callback
trackParser( "STRING HERE", function(cardinfo){
	console.log(cardinfo)
})

```

# More Examples

```javascript
var cardinfo = trackParserSync("STRING HERE")

if (cardinfo.successful){
	// the parsing was successful
	console.log(cardinfo.account, cardinfo.lastName, cardinfo.firstName, cardinfo.expYear, cardinfo.expMonth, cardinfo.cvv)
}
else {
	console.log("There was an error parsing the track data")
}

// method for parsing a credit card with a callback
trackParser( "STRING HERE", function(cardinfo){

	if (cardinfo.successful){
		// the parsing was successful
		console.log(cardinfo.account, cardinfo.lastName, cardinfo.firstName, cardinfo.expYear, cardinfo.expMonth, cardinfo.cvv)
	}
	else {
		console.log("There was an error parsing the track data")
	}
})

```
