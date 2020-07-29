let moment = require("moment");
let axios = require("axios");
let xml2js = require('xml2js');

//Create Token
let createToken = (req, res) => {

  console.log('\n\nLogs for Transaction to DPO BEGINS :::::' + moment().format("YYYY/MM/DD HH:MM")+ '::::: \n');
  let paymentAmount = req.body.paymentAmount;
  let customerEmail = req.body.customerEmail;
  let customerFirstName = req.body.customerFirstName;
  let customerLastName = req.body.customerLastName;
  let serviceDescription = req.body.serviceDescription;
  let routeSuccessLink = req.body.routeSuccessLink
  let serviceDate = moment().format("YYYY/MM/DD HH:MM");

  var xmlRequestBody = `
    <?xml version="1.0" encoding="utf-8"?>
    <API3G>
    <CompanyToken>9F416C11-127B-4DE2-AC7F-D5710E4C5E0A</CompanyToken>
    <Request>createToken</Request>
    <Transaction>
    <PaymentAmount>${paymentAmount}</PaymentAmount>
    <PaymentCurrency>NAD</PaymentCurrency>
    <CompanyRef>49FKEOA</CompanyRef>
    <RedirectURL>${routeSuccessLink}</RedirectURL>
    <BackURL>https://cybers.azurewebsites.net/#/canceled </BackURL>
    <CompanyRefUnique>0</CompanyRefUnique>
    <PTL>5</PTL>
    <customerEmail>${customerEmail}</customerEmail>
    <customerFirstName>${customerFirstName}</customerFirstName>
    <customerLastName>${customerLastName}</customerLastName>
    </Transaction>
    <Services>
      <Service>
        <ServiceType>5525</ServiceType>
        <ServiceDescription>${serviceDescription}</ServiceDescription>
        <ServiceDate>${serviceDate}</ServiceDate>
      </Service>
    </Services>
    </API3G>`;

  var createTokenUrl = 'https://secure1.sandbox.directpay.online/API/v6/';

  axios.post(createTokenUrl, xmlRequestBody)
    .then((tokenResponse) => {
      console.log('Payment Token Creation::  ' + moment().format("YYYY/MM/DD HH:MM") + ' ---->> Initializing ........... ');
      xml2js.parseString(tokenResponse.data, { mergeAttrs: true }, (err, tokenResult) => {
        if (err) {
          console.log('Payment Token Creation:: ' + moment().format("YYYY/MM/DD HH:MM") + ' ----->> Fail to initialize\n\n');
          throw err;
        } else {
          dpoRes = JSON.parse(JSON.stringify({ tokenResult }));
          if (dpoRes.tokenResult.API3G.Result[0] === "000") {
            console.log('Transaction Verification :: ' + moment().format("YYYY/MM/DD HH:MM") + '------->> Token Created: ' + dpoRes.tokenResult.API3G.TransToken[0]);
            return res.json({
              status: 200,
              success: true,
              data: {
                transactionToken: dpoRes.tokenResult.API3G.TransToken[0],
                message: dpoRes.tokenResult.API3G.ResultExplanation[0]
              }
            });
          } else {
            console.log('_Payment Token Creation :: ' + moment().format("YYYY/MM/DD HH:MM") + ' -------->> Failed to Create Token. Code: ' + dpoRes.tokenResult.API3G.Result[0] + '. Reason:' + dpoRes.tokenResult.API3G.ResultExplanation[0]+'\n\n');
            return res.json({
              status: 500,
              success: false,
              dpoResponseCode: dpoRes.tokenResult.API3G.Result[0],
              message: dpoRes.tokenResult.API3G.ResultExplanation[0],
            });
          }
        }
      });
    })
    .catch((err) => {
      console.log('Payment Token Creation :: ' + moment().format("YYYY/MM/DD HH:MM") + ' ------->> Failed to contact DPO. Reason:' +  err.message+'\n\n');  
      return res.json({
        status: 500,
        success: false,
        message: "An error occured",
        error: err.message,
      });
    });

};

module.exports = {
  createToken
};
