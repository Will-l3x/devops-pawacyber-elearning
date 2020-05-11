'use strict';
let jwt = require('jsonwebtoken');
var sql = require('mssql');
var validator = require('validator');
var bcrypt = require('bcryptjs');
var passwordValidator = require('password-validator');
var rn = require('random-number');
var moment = require('moment');
var nodemailer = require('nodemailer');
var generator = require('generate-password');

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
        debug: true // include SMTP traffic in the logs
    });

var gen = rn.generator({
    min: 10000009,
    max: 99999909,
    integer: true
});

let checkToken = (req, res, next) => {


    if (req.url !== '/api/login' && req.url !== '/api/register'  && req.url !== '/api/resetpassword' && req.url.indexOf('/api/verify') < 0 && req.url !== '/api/refreshotp') {

        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

        if (token) {
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }
        } else {
            return res.json({
                status: 401,
                success: false,
                message: 'Auth token is not supplied'
            });
        }


        if (token) {
            jwt.verify(token, process.env.jwt_secret, (err, decoded) => {
                if (err) {
                    return res.json({
                        status: 401,
                        success: false,
                        message: 'Token is not valid'
                    });
                } else {
                    req.decoded = decoded;
                    console.log(decoded);

                    next();
                }
            });
        } else {
            return res.json({
                status: 401,
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    } else {
        next();
    }
};

async function profile(req, res) {
    var id = req.decoded.userid;
    var role = req.decoded.roleid;

    var query = "";

    if (role === 1) { //students
        query = "select * from [users] \
            LEFT OUTER JOIN students ON users.UserId = students.UserId \
            LEFT OUTER JOIN roles ON roles.RoleId = users.RoleId\
            WHERE users.UserId=@id";
    } else if (role === 2) {//teachers
        query = "select * from [users] \
            LEFT OUTER JOIN teachers ON users.UserId = teachers.UserId \
            LEFT OUTER JOIN roles ON roles.RoleId = users.RoleId\
            WHERE users.UserId=@id";
    } else if (role === 3) {//parents
        query = "select * from [users] \
            LEFT OUTER JOIN parents ON users.UserId = parents.UserId \
            LEFT OUTER JOIN roles ON roles.RoleId = users.RoleId\
            WHERE users.UserId=@id";
    } else if (role === 4) {//schooladmins
        query = "select * from [users] \
            LEFT OUTER JOIN schooladmins ON users.UserId = schooladmins.UserId \
            LEFT OUTER JOIN roles ON roles.RoleId = users.RoleId\
            WHERE users.UserId=@id";
    } else if (role === 5) {//system admins
        query = "select * from [users] \
            LEFT OUTER JOIN systemadmins ON users.UserId = systemadmins.UserId \
            LEFT OUTER JOIN roles ON roles.RoleId = users.RoleId\
            WHERE users.UserId=@id";
    } else {
        console.log("error role not exists");
        return res.json({
            status: 400,
            success: false,
            message: "Something went wrong"
         
        });
    }

  
    var request = new sql.Request();

    request
        .input("id", id)
        .query(query, function (err, recordset) {

            if (err) {
                console.log(err);

                return res.json({
                    status: 500,
                    success: false,
                    message: "An error occured",
                    error: err.message
                });
            } else {

                return res.json({
                    status: 200,
                    success: true,
                    data: JSON.parse(JSON.stringify({ Profile: recordset.recordset }))
                });
            }
        });
}

let resetpassword = (req, res) => {

    var email = req.body.email;

    var password = generator.generate({
        length: 10,
        numbers: true
    });

    console.log(password);
    var oldpassword = password;

    password = bcrypt.hashSync(password, process.env.bcrypt_salt);

    console.log(password);

    if (email) {

        if (!validator.isEmail(email)) {
            return res.json({
                status: 400,
                success: false,
                message: 'Invalid Email address'

            });
        }

        var request = new sql.Request();

        var query = "UPDATE [users] set password = @password where email=@email";

        request
            .input('email', email)
            .input('password', password)
            .query(query, function (err, recordset) {

                if (err) {

                    console.log(err.message);
                    return res.json({
                        status: 400,
                        success: false,
                        message: 'internal server error',
                        error: err.message

                    });
                } else {


                    if (recordset.rowsAffected[0] > 0) {

                        var message = {
                            from: 'noreply@auragrp.com',
                            to: email,
                            subject: "Password reset",
                            text: "Your school temporary password is " + oldpassword + " please change this password as soon as possible",
                            html: "<h3>Your password has been reset.</h3><hr><p>Your school temporary password is - <b>" + oldpassword + "</b> - please change this password as soon as possible</b>."
                        };

                        transporter.sendMail(message, (error, info) => {
                            if (error) {
                                transporter.close();
                                console.log('Error occurred');
                                console.log(error.message);

                                return res.json({
                                    status: 400,
                                    success: false,
                                    message: 'An error occured whilst reseting your password. Please try again',
                                    error: 'Failed to send temporary password'
                                });
                                //    return res.status(400).json({ message: 'Account Registration succeded but failed to send verification pin' });

                                //try again to send pin
                            }

                            console.log('Message sent successfully!');
                            console.log(nodemailer.getTestMessageUrl(info));

                            // only needed when using pooled connections
                            transporter.close();
                            //  return res.status(201).json({ message: 'Registration successfull' });

                            return res.json({
                                status: 201,
                                success: true,
                                message: 'An email has been sent with your temporary password. Be sure to change it as soon as possible.'
                            });
                        });
                    } else {
                        return res.json({
                            status: 400,
                            success: false,
                            message: 'Account not found'
                        });
                    }

                    return res.json({
                        status: 202,
                        success: true,
                        message: 'Password reset link sent successfully'

                    });
                }
            });
    }

};

let changepassword = (req, res) => {

    var userid = req.decoded.userid;
    var newpassword = req.body.newpassword;
    var vnewpassword = req.body.vnewpassword;
    var oldpassword = req.body.oldpassword;
    let lastpassword = oldpassword;

    var schema = new passwordValidator();

    schema
        .is().min(8)                                    // Minimum length 8                                 
        .has().letters()                               // Must have digits
        .has().not().spaces();                           // Should not have spaces

    if (newpassword && vnewpassword && oldpassword) {

        if (!validator.isEmail(email)) {
            return res.json({
                status: 400,
                success: false,
                message: 'Invalid Email address'

            });
        }

        if (schema.validate(newpassword)) {

            if (newpassword !== vnewpassword) {
                return res.json({
                    status: 400,
                    success: false,
                    message: 'Passwords do not match'

                });
            }

            oldpassword = bcrypt.hashSync(oldpassword, process.env.bcrypt_salt);

            var query = "select * from [users] where UserId=@id and Password=@password";

            var request = new sql.Request();
            request
                .input('id', userid)
                .input('password', oldpassword)
                .query(query, function (err, recordset) {

                    if (err) {

                        console.log(err.message);
                        return res.json({
                            status: 400,
                            success: false,
                            message: 'internal server error',
                            error: err.message

                        });
                    } else {

                        if (recordset.recordset.length > 0) {

                            var result = {} = JSON.parse(JSON.stringify(recordset.recordset[0]));

                            //verify password hash
                            if (!bcrypt.compareSync(lastpassword, result.Password)) {

                                return res.json({
                                    status: 400,
                                    success: false,
                                    message: 'Wrong Password'

                                });
                            } else {
                                newpassword = bcrypt.hashSync(newpassword, process.env.bcrypt_salt);

                                query = "UPDATE [users] set password = @password where UserId=@userid";

                                request
                                    .input('password', newpassword)
                                    .input('userid', userid)
                                    .query(query, function (err, recordset) {

                                        if (err) {

                                            console.log(err.message);
                                            return res.json({
                                                status: 400,
                                                success: false,
                                                message: 'internal server error',
                                                error: err.message

                                            });
                                        } else {

                                            return res.json({
                                                status: 202,
                                                success: true,
                                                message: 'Password Changed successfully'


                                            });
                                        }
                                    }
                                    );
                            }
                        } else {

                            return res.json({
                                status: 400,
                                success: false,
                                message: 'Invalid Password'


                            });
                        }
                    }
                });

        } else {
            var errlist = schema.validate(newpassword, { list: true });
            return res.json({
                status: 400,
                success: false,
                message: 'Invalid Password',
                error: err.errlist

            });
        }

    } else {
        return res.json({
            status: 400,
            success: false,
            message: 'Please input required fields'

        });
    }
};

let refreshotp = (req, res) => {
    var email = req.body.email;
    if (email) {

        if (!validator.isEmail(email)) {
            return res.json({
                status: 400,
                success: false,
                message: 'Invalid Email address'

            });
        }


        var otpexpiry = moment().add(1, 'day').format();
        var pin = gen();

        var query = 'UPDATE [users] SET Otp=@pin,OtpExpiry=@otpexpiry WHERE Email=@email';
        var request = new sql.Request();

        request
            .input('email', email)
            .input('pin', pin)
            .input('otpexpiry', otpexpiry)
            .query(query, function (err, recordset) {
                if (err) {

                    console.log(err.message);
                    return res.json({
                        status: 500,
                        success: false,
                        message: 'Internal server error',
                        error: err.message
                    });
                } else {
                    if (recordset.rowsAffected[0] > 0) {


                        var message = {
                            from: 'Strimai Team',
                            to: email,
                            subject: "Activate your newschool account",
                            text: "Your activation code is " + pin + " which expires in 24hrs.",
                            html: "<h3>Welcome to newschool</h3><hr><p>Your activation code is <b>" + pin + "</b>. It expires in 24hrs on " + otpexpiry + " "
                        };

                        transporter.sendMail(message, (error, info) => {
                            if (error) {
                                console.log('Error occurred');
                                console.log(error.message);
                                return res.json({
                                    status: 400,
                                    success: false,
                                    message: 'Account registration completed with errors',
                                    error: 'Could not send verification pin '
                                });
                            }

                            console.log('Message sent successfully!');
                            console.log(nodemailer.getTestMessageUrl(info));

                            // only needed when using pooled connections
                            transporter.close();
                            return res.json({
                                status: 200,
                                success: true,
                                message: 'Verification pin sent'

                            });
                        });
                    } else {


                        return res.json({
                            status: 404,
                            success: false,
                            message: 'The specified account could not be found'

                        });
                    }

                }

            });


    } else {
        return res.json({
            status: 400,
            success: false,
            message: 'Invalid Email address'

        });
    }
};

let verifyacc = (req, res) => {

    var email = req.body.email;
    var pin = req.body.pin;

    if (email && pin) {
        console.log('verify');
        if (!validator.isEmail(email)) {
            return res.json({
                status: 400,
                success: false,
                message: 'Invalid email address',
                error: 'error'
            });
        }

        if (!validator.isNumeric(pin)) {
            return res.json({
                status: 400,
                success: false,
                message: 'Invalid Pin',
                error: 'error'
            });
        }

        if (pin.length !== 6) {
            return res.json({
                status: 400,
                success: false,
                message: 'Invalid pin',
                error: 'error'
            });
        }

        var query = "select * from [users] where Email=@email and Otp=@pin";
        var request = new sql.Request();
        var subscriptionenddate = moment().add(7, 'day').format();

        request
            .input('email', email)
            .input('pin', pin)
            .input('subscriptionenddate', subscriptionenddate)
            .query(query, function (err, recordset) {

                if (err) {

                    console.log(err.message);
                    return res.json({
                        status: 500,
                        success: false,
                        message: 'Internal server error',
                        error: errr.message
                    });
                } else {
                    if (recordset.recordset.length > 0) {

                        var result = {} = JSON.parse(JSON.stringify(recordset.recordset[0]));

                        var currentDate, expirydate = Date();
                        currentDate = moment().format();
                        expirydate = moment().format(result.OtpExpiry);
                        console.log('cur ' + currentDate);
                        console.log('ex ' + expirydate);


                        if (expirydate >= currentDate) {

                            query = 'UPDATE [strimai_users] SET Activated = 1, OtpPin=0 ,SubscriptionEndDate = @subscriptionenddate WHERE Email=@email';

                            request
                                .input('email', email)
                                .query(query, function (err, recordset) {
                                    if (err) {

                                        console.log(err.message);
                                        return res.json({
                                            status: 500,
                                            success: false,
                                            message: 'Internal server error',
                                            error: errr.message
                                        });
                                    } else {
                                        if (recordset.rowsAffected[0] > 0) {

                                            let token = jwt.sign({ email: result.Email, role: result.Role, userid: result.UserId, 'enddate': subscriptionenddate },
                                                process.env.jwt_secret,
                                                {
                                                    expiresIn: '678h' // expires in 28 days
                                                }
                                            );

                                            console.log(token);

                                            // return res.status(200).json({ message: 'account verified successfuly', token: token });
                                            return res.json({
                                                status: 200,
                                                success: true,
                                                message: 'account verified successfuly',
                                                token: token
                                            });
                                        } else {

                                            console.log(err.message);
                                            return res.json({
                                                status: 400,
                                                success: false,
                                                message: 'Failed to verify account',
                                                error: 'error'
                                            });
                                        }

                                    }

                                });

                            // return res.status(200).json({ message: 'Account verified successfuly. You can now login' });
                        } else {
                            return res.json({
                                status: 403,
                                success: false,
                                message: 'Activation code has expired'

                            });
                        }

                    } else {

                        console.log(recordset);
                        return res.json({
                            status: 400,
                            success: false,
                            message: 'Invalid pin'

                        });
                    }

                }
            });


    } else {
        return res.json({
            status: 400,
            success: false,
            message: 'Invalid pin or email'

        });
    }
};

//register
//login
//verify_acc

module.exports = {
    profile: profile, 
    resetpassword: resetpassword,
    checktoken: checkToken,
    changepassword: changepassword,
    refreshotp: refreshotp
};