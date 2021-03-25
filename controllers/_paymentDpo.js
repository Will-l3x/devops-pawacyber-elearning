let moment = require("moment");
let axios = require("axios");
let xml2js = require('xml2js');
var sql = require('mssql');

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
    let userid = req.body.customerid;

  var xmlRequestBody = `
  <?xml version="1.0" encoding="utf-8"?>
  <API3G>
  <CompanyToken>FB5F5337-FC9F-4DDB-B407-DB11691D71B9</CompanyToken>
  <Request>createToken</Request>
  <Transaction>
  <PaymentAmount>${paymentAmount}</PaymentAmount>
  <PaymentCurrency>NAD</PaymentCurrency>
  <CompanyRef>49FKEOA</CompanyRef>
  <RedirectURL>${routeSuccessLink}</RedirectURL>
  <BackURL> https://pawacyberschool.net/#/canceled</BackURL>
  <CompanyRefUnique>0</CompanyRefUnique>
  <PTL>1440</PTL>
  <PTLtype>minutes</PTLtype>
  <customerFirstName>${customerFirstName}</customerFirstName>
  <customerLastName>${customerLastName}</customerLastName>
  <customerEmail>${customerEmail}</customerEmail>
  </Transaction>
  <Services>
   <Service>
     <ServiceType>38846</ServiceType>
     <ServiceDescription>${serviceDescription}</ServiceDescription>
     <ServiceDate>${serviceDate}</ServiceDate>
   </Service>
  </Services>
  </API3G>`;

  var createTokenUrl = 'https://secure.3gdirectpay.com/API/v6/';

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

              ///////////////////////////////
               //when adding multiple commission types in the future , 
            //you might want to link every referal in the referal table to a commision id 
            //to make sure no isssues arise. 
            //NB*****this setup only works if there is one commission type in the system. 
             
              var refered = [];
              var commission = [];
              var amount = paymentAmount;

              var query = "select * from [referals] where ReferedUser=@id ";
              var request = new sql.Request();

              request
                  .input("id", userid)
                  .query(query, function (err, recordset) {

                      if (err) {
                          console.log(err);
                          console.log(err.stack);
                          return res.json({
                              status: 500,
                              success: false,
                              message: "An error occured",
                              error: err.message
                          });
                      } else {
                          refered = recordset.recordset[0];

                          var { ReferedBy } = refered;

                          var type = "referal";
                          var query = "select * from [commissions] where Type=@type ";

                          request
                              .input("type", type)
                              .query(query, function (err, recordset) {

                                  if (err) {
                                      console.log(err);
                                      console.log(err.stack);
                                      return res.json({
                                          status: 500,
                                          success: false,
                                          message: "An error occured",
                                          error: err.message
                                      });
                                  } else {
                                      commission = recordset.recordset[0];
                                      console.log(commission);

                                      var { Percent } = commission;

                                      var comm = (amount / 115) * Percent;

                                      console.log(comm);

                                      var query = "UPDATE users SET referalBalance=@comm + referalBalance Where userId = @userid ";

                                      request
                                          .input("comm", comm)
                                          .input("userid", ReferedBy)
                                          .query(query, function (err, recordset) {

                                              if (err) {
                                                  console.log(err);
                                                  console.log(err.stack);
                                                  return res.json({
                                                      status: 200,
                                                      success: true,
                                                      message:"Transaction successfull, but failed to pay commission",
                                                      data: {
                                                          transactionToken: dpoRes.tokenResult.API3G.TransToken[0],
                                                          message: dpoRes.tokenResult.API3G.ResultExplanation[0]
                                                      }
                                                  });
                                              } else {

                                                  return res.json({
                                                      status: 200,
                                                      success: true,
                                                      data: {
                                                          transactionToken: dpoRes.tokenResult.API3G.TransToken[0],
                                                          message: dpoRes.tokenResult.API3G.ResultExplanation[0]
                                                      }
                                                  });

                                              }
                                          });

                                  }
                              });

                      }
                  });



              ///////////////////////////////


         
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
    