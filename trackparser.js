/* This function was originally written in C# by Paulo Ruvalcaba
   And has been translated into javascript
*/

/*
    NOTE This is an npm package that takes in the raw track data from a credit card
     and returns to you the information you need to charge that card as well
     as the type of card
*/



//-- Example: Track 1 & 2 Data
//-- %B1234123412341234^CardUser/John^030510100000019301000000877000000?;1234123412341234=0305101193010877?
//-- Key off of the presence of "^" and "="

//-- Example: Track 1 Data Only
//-- B1234123412341234^CardUser/John^030510100000019301000000877000000?
//-- Key off of the presence of "^" but not "="

//-- Example: Track 2 Data Only
//-- 1234123412341234=0305101193010877?
//-- Key off of the presence of "=" but not "^"


'use strict'


var trackParser = function (strParse){
    // Init members
    this.InputTrackdataStr  = strParse;
    this.AccountName        = "";
    this.LastName           = "";
    this.FirstName          = "";
    this.Account            = "";
    this.ExpMonth           = "";
    this.ExpYear            = "";
    this.Track1             = "";
    this.Track2             = "";
    this.Track1Pure         = "";
    this.Track2Pure         = "";
    this.HasTrack1          = false;
    this.HasTrack2          = false;
    this.ResultDesc         = "";

    let sTrackData = this.InputTrackdataStr; // Get the track data

    //-- Example: Track 1 & 2 Data
    //-- %B1234123412341234^CardUser/John^030510100000019301000000877000000?;1234123412341234=0305101193010877?
    //-- Key off of the presence of "^" and "="

    //-- Example: Track 1 Data Only
    //-- B1234123412341234^CardUser/John^030510100000019301000000877000000?
    //-- Key off of the presence of "^" but not "="

    //-- Example: Track 2 Data Only
    //-- 1234123412341234=0305101193010877?
    //-- Key off of the presence of "=" but not "^"

    if (strParse != ""){
        //--- Determine the presence of special characters
        let nHasTrack1 = strParse.IndexOf("^");
        let nHasTrack2 = strParse.IndexOf("=");
        let bHasTrack1 = false;
        let bHasTrack2 = false;

        //--- Set boolean values based off of character presence
        this.HasTrack1 = bHasTrack1;
        this.HasTrack2 = bHasTrack2;
        if (nHasTrack1 > 0) { this.HasTrack1 = bHasTrack1 = true; }
        if (nHasTrack2 > 0) { this.HasTrack2 = bHasTrack2 = true; }

        //--- Initialize
        let bTrack1_2   = false;
        let bTrack1     = false;
        let bTrack2     = false;

        //--- Determine tracks present
        if ((bHasTrack1) && (bHasTrack2)) { bTrack1_2 = true; }
        if ((bHasTrack1) && (!bHasTrack2)) { bTrack1 = true; }
        if ((!bHasTrack1) && (bHasTrack2)) { bTrack2 = true; }

        //--- Initialize alert message on error
        let bShowAlert = false;

        //-----------------------------------------------------------------------------
        //--- Track 1 & 2 cards
        //--- Ex: B1234123412341234^CardUser/John^030510100000019301000000877000000?;1234123412341234=0305101193010877?
        //-----------------------------------------------------------------------------
        if (bTrack1_2){

            let strCutUpSwipe = "" + strParse + " ";
            let arrayStrSwipe = strCutUpSwipe.plit('^');
            let sAccountNumber, sName, sShipToName, sMonth, sYear;

            if (arrayStrSwipe.length > 2) {

                this.Account = StripAlpha(arrayStrSwipe[0].Substring(1));
                this.AccountName = arrayStrSwipe[1];
                this.ExpMonth = arrayStrSwipe[2].Substring(2, 2);
                this.ExpYear = "20" + arrayStrSwipe[2].Substring(0, 2);

                //--- Different card swipe readers include or exclude the % in the front of the track data - when it's there, there are
                //---   problems with parsing on the part of credit cards processor - so strip it off
                if (sTrackData.Substring(0, 1) == "%")
                {
                    sTrackData = sTrackData.Substring(1);
                }

                int track2sentinel = sTrackData.IndexOf(";");
                if (track2sentinel != -1)
                {
                    this.Track1 = sTrackData.Substring(0, track2sentinel);
                    this.Track2 = sTrackData.Substring(track2sentinel);
                }

                //--- parse name field into first/last names
                int nameDelim = this.AccountName.IndexOf("/");
                if (nameDelim != -1)
                {
                    this.LastName = this.AccountName.Substring(0, nameDelim);
                    this.FirstName = this.AccountName.Substring(nameDelim + 1);
                }
            }
            else  //--- for "if ( arrayStrSwipe.Length > 2 )"
            {
                bShowAlert = true;  //--- Error -- show alert message
            }
        }

        //-----------------------------------------------------------------------------
        //--- Track 1 only cards
        //--- Ex: B1234123412341234^CardUser/John^030510100000019301000000877000000?
        //-----------------------------------------------------------------------------
        if (bTrack1)
        {
            string strCutUpSwipe = "" + strParse + " ";
            string[] arrayStrSwipe = strCutUpSwipe.Split('^');

            string sAccountNumber, sName, sShipToName, sMonth, sYear;

            if (arrayStrSwipe.Length > 2)
            {
                this.Account = sAccountNumber = StripAlpha(arrayStrSwipe[0].Substring(1));
                this.AccountName = sName = arrayStrSwipe[1];
                this.ExpMonth = sMonth = arrayStrSwipe[2].Substring(2, 2);
                this.ExpYear = sYear = "20" + arrayStrSwipe[2].Substring(0, 2);


                //--- Different card swipe readers include or exclude the % in
                //--- the front of the track data - when it's there, there are
                //---   problems with parsing on the part of credit cards processor - so strip it off
                if (sTrackData.Substring(0, 1) == "%")
                {
                    this.Track1 = sTrackData = sTrackData.Substring(1);
                }

                //--- Add track 2 data to the string for processing reasons
                this.Track2 = ";" + sAccountNumber + "=" + sYear.Substring(2, 2) + sMonth + "111111111111?";
                sTrackData = sTrackData + this.Track2;

                //--- parse name field into first/last names
                int nameDelim = this.AccountName.IndexOf("/");
                if (nameDelim != -1)
                {
                    this.LastName = this.AccountName.Substring(0, nameDelim);
                    this.FirstName = this.AccountName.Substring(nameDelim + 1);
                }

            }
            else  //--- for "if ( arrayStrSwipe.Length > 2 )"
            {
                bShowAlert = true;  //--- Error -- show alert message
            }
        }

        //-----------------------------------------------------------------------------
        //--- Track 2 only cards
        //--- Ex: 1234123412341234=0305101193010877?
        //-----------------------------------------------------------------------------
        if (bTrack2)
        {
            int nSeperator = strParse.IndexOf("=");
            string sCardNumber = strParse.Substring(1, nSeperator - 1);
            string sYear = strParse.Substring(nSeperator + 1, 2);
            string sMonth = strParse.Substring(nSeperator + 3, 2);
            string sAccountNumber;

            this.Account = sAccountNumber = StripAlpha(sCardNumber);
            this.ExpMonth = sMonth = sMonth;
            this.ExpYear = sYear = "20" + sYear;

            //--- Different card swipe readers include or exclude the % in the front of the track data - when it's there,
            //---  there are problems with parsing on the part of credit cards processor - so strip it off
            if (sTrackData.Substring(0, 1) == "%")
            {
                sTrackData = sTrackData.Substring(1);
            }

        }

        //-----------------------------------------------------------------------------
        //--- No Track Match
        //-----------------------------------------------------------------------------
        if (((!bTrack1_2) && (!bTrack1) && (!bTrack2)) || (bShowAlert))
        {
            this.ResultDesc = "Difficulty Reading Card Information.\n\nPlease Click Reset and Swipe Card Again.";
            return false;
        }
        else
        {
            // discard the starting and ending sentinels
            if (this.HasTrack1)
            {
                // strip end sentinel
                if (this.Track1.Substring(this.Track1.Length - 1) == "?")
                {
                    this.Track1Pure = this.Track1.Substring(0, this.Track1.Length - 1);
                }
            }

            if (this.HasTrack2)
            {
                // strip start sentinel
                if (this.Track2.Substring(0, 1) == ";")
                {
                    this.Track2Pure = this.Track2.Substring(1);
                }
                // strip end sentinel
                if (this.Track2.Substring(this.Track2.Length - 1) == "?")
                {
                    if (this.Track2Pure != "")
                    {
                        this.Track2Pure = this.Track2Pure.Substring(0, this.Track2Pure.Length - 1);
                    }
                    else
                    {
                        this.Track2Pure = this.Track2.Substring(0, this.Track2.Length - 1);
                    }
                }
            }
        }

        this.ResultDesc = "Successful read.";
        return true;
    }
    else {

        this.ResultDesc = "Difficulty Reading Card Information.\n\nPlease Swipe Card Again.";
        return false;
    }
}

var newTrack = new trackParser();



module.exports = trackParser
