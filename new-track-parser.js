var trackParser = function(rawtrack ,callback) {

    cardinfo = {

        successful : false, /*Checks to see if the parse was successful or not*/
        account    : null,  /*This is the PAN (primary account number)*/
        lastName   : null,  /*This is the last name*/
        firstName  : null,  /*This is the first name*/
        expYear    : null,  /*This is the expiration year*/
        expMonth   : null,  /*This is the expiration month*/
        cvv        : null   /*This is the service code*/
    }

    // do stuffs


    callback(cardinfo)
}

var trackParserSync = function(rawtrack){

    cardinfo = {

        successful : false, /*Checks to see if the parse was successful or not*/
        account    : null,  /*This is the PAN (primary account number)*/
        lastName   : null,  /*This is the last name*/
        firstName  : null,  /*This is the first name*/
        expYear    : null,  /*This is the expiration year*/
        expMonth   : null,  /*This is the expiration month*/
        cvv        : null   /*This is the service code*/
    }

    // do stuffs




    return cardinfo
}





module.exports = { trackParser, trackParserSync }
