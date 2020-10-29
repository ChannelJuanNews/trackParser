const trackParser = require('./trackparser.js')

var trackData = new trackParser("%B1234123412341234^CardUser/John^030510100000019301000000877000000?;1234123412341234=0305101193010877?");

console.log(trackData)