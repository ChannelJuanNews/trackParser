let trackParser     = require('./new-track-parser').trackParser
let trackParserSync = require('./new-track-parser').trackParserSync

trackParser("%B5555555555554444^LAST/FIRST^14021019999900888000000?;5555555555554444=14021019999988800000?", (err, result) => {
    if(err) return console.error(err)
    console.log(result)
})

console.log("=================================== DONE WITH ASYNC ============================================================")

let result = trackParserSync("%B5555555555554444^LAST/FIRST^14021019999900888000000?;5555555555554444=14021019999988800000?")
if(result.error){
    console.error(result.error)
} else {
    console.log(result.data)
}

console.log("=================================== DONE WITH SYNC ============================================================")
