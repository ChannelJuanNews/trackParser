var trackParser = function(rawtrack ,callback) {

    // check to see if they even passed in an actual string 
    if (rawtrack == "" || rawtrack == null || rawtrack == undefined){ return callback("ERR::NoDataPresent") }

    // before we parse, check if the raw track string is even a credit card 
    let match_data = rawtrack.match(/^%(.*)\?;(.*)\?$/) 
    if ( match_data == null) {
        return callback("ERR::NotACreditCard", null)
    } 



    //-- Example: Track 1 & 2 Data
    //-- %B1234123412341234^CardUser/John^030510100000019301000000877000000?;1234123412341234=0305101193010877?
    //-- Key off of the presence of "^" and "="

    //-- Example: Track 1 Data Only
    //-- B1234123412341234^CardUser/John^030510100000019301000000877000000?
    //-- Key off of the presence of "^" but not "="

    //-- Example: Track 2 Data Only
    //-- 1234123412341234=0305101193010877?
    //-- Key off of the presence of "=" but not "^"

    // check to see if we have track one or track two 
    let hasTrack1 = rawtrack.indexOf("^");
    let hasTrack2 = rawtrack.indexOf("=");
    
    if(hasTrack1 > 0 && hasTrack2 > 0) {
        // we parse for track one and track two data 
        let track1_raw = match_data[1]
        let track2_raw = match_data[2]

        let track1_match_data = track1_raw.match(/^(.)(\d*)\^([^\/]*)\/(.*)\^(.{4})(.{3})(.*)$/)
        if (track1_match_data == null) { return callback("ERR::UnparseableTrackOne", null) }
        let track2_match_data = track2_raw.match(/^(\d*)=(.{4})(.{3})(.*)$/)
        if(track2_match_data == null) { return callback("ERR::UnparseableTrackTwo", null) }


        let extracted_data_track1 = {
            raw : track1_raw,
            match_data : track1_match_data,
            format_code : track1_match_data[1],
            number : track1_match_data[2],
            last_name : track1_match_data[3],
            first_name : track1_match_data[4],
            expiration : track1_match_data[5],
            service_code : track1_match_data[6],
            discretionary : track1_match_data[7]
        }

        let extracted_data_track2 = {
            raw : track2_raw,
            match_data : track2_match_data,
            number : track2_match_data[1],
            expiration : track2_match_data[2],
            service_code : track2_match_data[3],
            discretionary : track2_match_data[4]
        }

        // 
        if(extracted_data_track1.number != extracted_data_track2.number) {
            return callback("ERR::NumberMismatch", null)
        }
        //
        if(extracted_data_track1.expiration != extracted_data_track2.expiration){
            return callback("ERR::ExpirationMismatch", null)
        }
        //
        if(extracted_data_track1.service_code != extracted_data_track2.service_code){
            return callback("ERR::ServiceCodeMismatch", null)
        }

        

        let extracted_data = {
            track_1_raw : track1_raw, 
            track_1_match_data : track1_match_data,
            track_1_extracted_data : extracted_data_track1,

            track_2_raw : track2_raw, 
            track_2_match_data : track2_match_data,
            track_2_extracted_data : extracted_data_track2,

            format_code : track1_match_data[1], 
            number : track1_match_data[2],
            first_name : track1_match_data[4],
            last_name : track1_match_data[3],
            expiration : track1_match_data[5],
            service_code : track1_match_data[6],
            discretionary : track1_match_data[7]

        }
        callback(null, extracted_data)

    } else if(hasTrack1 > 0 ){
        // we parse for only track 1 data 
        let track1_raw = match_data[1]
            // before we continue, let us check to see if we can parse the track data 
        let track1_match_data = track1_raw.match(/^(.)(\d*)\^([^\/]*)\/(.*)\^(.{4})(.{3})(.*)$/)
        if (track1_match_data == null) { return callback("ERR::UnparseableTrackOne", null) }

            // if we are here, then the raw string is acceptable to be parsed
        let extracted_data_track1 = {
            raw : track1_raw,
            match_data : track1_match_data,
            format_code : track1_match_data[1],
            number : track1_match_data[2],
            last_name : track1_match_data[3],
            first_name : track1_match_data[4],
            expiration : track1_match_data[5],
            service_code : track1_match_data[6],
            discretionary : track1_match_data[7]
        }
        return callback(null, extracted_data_track1)
    


    } else if(hasTrack2 > 0) {
        // we parse for only track 2 data 
        let track2_raw = match_data[2]
        let track2_match_data = track2_raw.match(/^(\d*)=(.{4})(.{3})(.*)$/)
        if(track2_match_data == null) { return callback("ERR::UnparseableTrackTwo", null) }

        // if we are here, then the raw string is acceptable to be parsed
        let extracted_data_track2 = {
            raw : track2_raw,
            match_data : track2_match_data,
            number : track2_match_data[1],
            expiration : track2_match_data[2],
            service_code : track2_match_data[3],
            discretionary : track2_match_data[4]
        }

        return callback(null, extracted_data_track2)
    
    } else {
        return callback("ERR::TrackNotSupported", null)
    }
}

var trackParserSync = function(rawtrack){

    // check to see if they even passed in an actual string 
    if (rawtrack == "" || rawtrack == null || rawtrack == undefined){ return { error : "ERR::NoDataPresent", data : null} }

    // before we parse, check if the raw track string is even a credit card 
    let match_data = rawtrack.match(/^%(.*)\?;(.*)\?$/) 
    if ( match_data == null) {
        return { error : "ERR::NotACreditCard", data : null }
    } 



    //-- Example: Track 1 & 2 Data
    //-- %B1234123412341234^CardUser/John^030510100000019301000000877000000?;1234123412341234=0305101193010877?
    //-- Key off of the presence of "^" and "="

    //-- Example: Track 1 Data Only
    //-- B1234123412341234^CardUser/John^030510100000019301000000877000000?
    //-- Key off of the presence of "^" but not "="

    //-- Example: Track 2 Data Only
    //-- 1234123412341234=0305101193010877?
    //-- Key off of the presence of "=" but not "^"

    // check to see if we have track one or track two 
    let hasTrack1 = rawtrack.indexOf("^");
    let hasTrack2 = rawtrack.indexOf("=");
    
    if(hasTrack1 > 0 && hasTrack2 > 0) {
        // we parse for track one and track two data 
        let track1_raw = match_data[1]
        let track2_raw = match_data[2]

        let track1_match_data = track1_raw.match(/^(.)(\d*)\^([^\/]*)\/(.*)\^(.{4})(.{3})(.*)$/)
        if (track1_match_data == null) { return { error : "ERR::UnparseableTrackOne", data : null } }
        let track2_match_data = track2_raw.match(/^(\d*)=(.{4})(.{3})(.*)$/)
        if(track2_match_data == null) { return { error : "ERR::UnparseableTrackTwo", data : null } }


        let extracted_data_track1 = {
            raw : track1_raw,
            match_data : track1_match_data,
            format_code : track1_match_data[1],
            number : track1_match_data[2],
            last_name : track1_match_data[3],
            first_name : track1_match_data[4],
            expiration : track1_match_data[5],
            service_code : track1_match_data[6],
            discretionary : track1_match_data[7]
        }

        let extracted_data_track2 = {
            raw : track2_raw,
            match_data : track2_match_data,
            number : track2_match_data[1],
            expiration : track2_match_data[2],
            service_code : track2_match_data[3],
            discretionary : track2_match_data[4]
        }

        // 
        if(extracted_data_track1.number != extracted_data_track2.number) {
            return { error : "ERR::NumberMismatch", data : null }
        }
        //
        if(extracted_data_track1.expiration != extracted_data_track2.expiration){
            return { error : "ERR::ExpirationMismatch", data : null } 
        }
        //
        if(extracted_data_track1.service_code != extracted_data_track2.service_code){
            return { error : "ERR::ServiceCodeMismatch", data : null } 
        }

        

        let extracted_data = {
            track_1_raw : track1_raw, 
            track_1_match_data : track1_match_data,
            track_1_extracted_data : extracted_data_track1,

            track_2_raw : track2_raw, 
            track_2_match_data : track2_match_data,
            track_2_extracted_data : extracted_data_track2,

            format_code : track1_match_data[1], 
            number : track1_match_data[2],
            first_name : track1_match_data[4],
            last_name : track1_match_data[3],
            expiration : track1_match_data[5],
            service_code : track1_match_data[6],
            discretionary : track1_match_data[7]

        }
        return { error : null, data: extracted_data }

    } else if(hasTrack1 > 0 ){
        // we parse for only track 1 data 
        let track1_raw = match_data[1]
            // before we continue, let us check to see if we can parse the track data 
        let track1_match_data = track1_raw.match(/^(.)(\d*)\^([^\/]*)\/(.*)\^(.{4})(.{3})(.*)$/)
        if (track1_match_data == null) { return { error : "ERR::UnparseableTrackOne", data : null} }

            // if we are here, then the raw string is acceptable to be parsed
        let extracted_data_track1 = {
            raw : track1_raw,
            match_data : track1_match_data,
            format_code : track1_match_data[1],
            number : track1_match_data[2],
            last_name : track1_match_data[3],
            first_name : track1_match_data[4],
            expiration : track1_match_data[5],
            service_code : track1_match_data[6],
            discretionary : track1_match_data[7]
        }
        return { error : null, data : extracted_data_track1 }
    


    } else if(hasTrack2 > 0) {
        // we parse for only track 2 data 
        let track2_raw = match_data[2]
        let track2_match_data = track2_raw.match(/^(\d*)=(.{4})(.{3})(.*)$/)
        if(track2_match_data == null) { return { error : "ERR::UnparseableTrackTwo", data : null} }

        // if we are here, then the raw string is acceptable to be parsed
        let extracted_data_track2 = {
            raw : track2_raw,
            match_data : track2_match_data,
            number : track2_match_data[1],
            expiration : track2_match_data[2],
            service_code : track2_match_data[3],
            discretionary : track2_match_data[4]
        }

        return { error : null, data : extracted_data_track2 }
    
    } else {
        return { error : "ERR::TrackNotSupported", data : null }
    }
}


module.exports = { trackParser, trackParserSync }
