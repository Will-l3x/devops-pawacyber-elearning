"use strict";
//const webpush = require('web-push');
//const pool = require('../db')
var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport(
{
    host: 'n3plcpnl0071.prod.ams3.secureserver.net',
    port: 465,
    secure: true,
    secureConnection: true,
    auth: {
        user: 'strimai@auragrp.com',
        pass: 'strimai'
    },
    logger: true,
    debug: true 
});

async function sendemailnotification(toemail, subject, msgtxt, msghtml) {

        var message = {
            from: 'noreply@pawacyberschool.com',
            to: toemail,
            subject: subject,
            text: msgtxt,
            html: '<img style="Height:50px,Width:100%" src="cid:unique@kreata.ee"/><br/>' + msghtml,
            attachments: [{
                filename: 'main2.jpg',
                path: __dirname + '/main2.jpg',
                cid: 'unique@kreata.ee'
            }]
        };

transporter.sendMail(message, (error, info) => {
                
            if (error) {
                console.log('Error occurred');
                console.log(error.message);
                transporter.close();
            } else {
                console.log('Message sent successfully!');
                console.log(nodemailer.getTestMessageUrl(info));
                transporter.close();
            }

        });
    }


module.exports = {
sendemailnotification: sendemailnotification
};