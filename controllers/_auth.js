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
 
let profile = (req, res) => {
    var id = req.decoded.userid;
    var role = req.decoded.roleid;

    var query = "";

    if (role === 3) { //students
        query = "select users.email,activefrom,schoolname,activated,gendername,users.userId,studentid,firstname,lastname,dob,grade,elevel,rolename from [users] \
            LEFT OUTER JOIN students ON users.userId = students.userid \
            LEFT OUTER JOIN schools ON schools.schoolId = students.schoolid \
            LEFT OUTER JOIN genders ON users.genderid = genders.genderId \
            LEFT OUTER JOIN grades ON grades.gradeId = students.gradeid \
            LEFT OUTER JOIN elevels ON grades.gradeId = students.gradeid \
            LEFT OUTER JOIN roles ON roles.roleId = users.roleid\
            WHERE users.userId=@id";
    } else if (role === 1) {//teachers
        query = "select users.email,activefrom,activated,genders.gendername,schoolname,users.userId,teacherid,firstname,lastname,rolename from [users] \
            LEFT OUTER JOIN teachers ON users.userId = teachers.userid \
            LEFT OUTER JOIN genders ON users.genderid = genders.genderId \
            LEFT OUTER JOIN schools ON schools.schoolId = teachers.schoolid \
            LEFT OUTER JOIN roles ON roles.roleId = users.roleid\
            WHERE users.userId=@id";
    } else if (role === 2) {//parents
        query = "select users.email,activefrom,activated,genders.gendername,users.userId,parentid,firstname,lastname,rolename from [users] \
            LEFT OUTER JOIN parents ON users.userId = parents.userid \
            LEFT OUTER JOIN roles ON roles.roleId = users.roleid\
            LEFT OUTER JOIN genders ON users.genderid = genders.genderId \
            WHERE users.userId=@id";
    } else if (role === 4) {//schooladmins
        query = "select users.email,activefrom,activated,genders.gendername,users.userId,systemadminid,firstname,lastname,rolename,schoolname from [users] \
            LEFT OUTER JOIN schooladmins ON users.userId = schooladmins.userId \
            LEFT OUTER JOIN genders ON users.genderid = genders.genderId \
            LEFT OUTER JOIN schools ON schools.schoolId = teachers.schoolid \
            LEFT OUTER JOIN roles ON roles.roleId = users.roleid\
            WHERE users.userId=@id";
    } else if (role === 5) {//system admins
        query = "select users.email,activefrom,activated,genders.gendername,users.userId,systemadminid,firstname,lastname,rolename from [users] \
            LEFT OUTER JOIN systemadmins ON users.userId = systemadmins.userid \
            LEFT OUTER JOIN genders ON users.genderid = genders.genderId \
            LEFT OUTER JOIN roles ON roles.roleId = users.roleid\
            WHERE users.userId=@id";
    } else if (role === 6) {//sub system admins
        query = "select users.email,activefrom,activated,genders.gendername,users.userId,subdminid,firstname,lastname,rolename from [users] \
            LEFT OUTER JOIN subadmins ON users.userId = subadmins.userid \
            LEFT OUTER JOIN genders ON users.genderid = genders.genderId \
            LEFT OUTER JOIN roles ON roles.roleId = users.roleid\
            WHERE users.userId=@id";
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
};

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
                            from: 'noreply@newschool.com',
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

            var query = "select * from [users] where userId=@id and password=@password";

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

                                query = "UPDATE [users] set password = @password where userId=@userid";

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


        var otpexpiry = moment().add(1, 'day').format('YYYY-MM- DD');
        var pin = gen();

        var query = 'UPDATE [users] SET otp=@pin,otpexpiry=Convert(datetime, @otpexpiry) WHERE email=@email';
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
                            from: 'Cyberschool school',
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
                                    message: 'Could not send verification pin'
                                });
                            }

                          
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
        console.log(pin.length);
        if (pin.length !== 8) {
            return res.json({
                status: 400,
                success: false,
                message: 'Invalid pin1',
                error: 'error'
            });
        }

        var query = "select * from [users] where email=@email and otp=@pin";
        var request = new sql.Request();
        //var expdate = moment().format('YYYY-MM-DD');

        request
            .input('email', email)
            .input('pin', pin)
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
                    if (recordset.recordset.length > 0) {

                        var result = {} = JSON.parse(JSON.stringify(recordset.recordset[0]));

                        var currentDate, expirydate = Date();
                        currentDate = moment().format('YYYY-MM-DD');
                        expirydate = moment().format(result.otpexpiry);
                        console.log('cur ' + currentDate);
                        console.log('ex ' + expirydate);


                        if (expirydate >= currentDate) {

                            query = 'UPDATE [users] SET activated = 1, otp=0 WHERE email=@email2';

                            request
                                .input('email2', email)
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
                                            return res.json({
                                                status: 200,
                                                success: true,
                                                message: 'account verified successfuly'
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
let register = (req, res) => {

    var roleid = req.body.roleid;
    var email = req.body.email;
    var password = req.body.password;
    var vpassword = req.body.vpassword;
    var gender = req.body.gender;
    var userid = 0;

    var grade = req.body.gradeid;

    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var title = req.body.title;
    var schoolid = req.body.schoolid;
    var activefrom = Date();
    var dob = Date();
    dob = req.body.dob;
    activefrom = moment().format('YYYY-MM-DD');
    var enrolmentkey  = generator.generate({
        length: 5,
        numbers: true
    });

    var otpexpiry = Date();
    otpexpiry = moment().add(31, 'day').format('YYYY-MM-DD');
    var pin = gen();


    let query = "INSERT INTO [users] (email,password,roleid,otp,OtpExpiry,activefrom,gender) VALUES(@femail,@password,@roleid,@otp,Convert(datetime, @otpexpiry ),Convert(datetime, @activefrom,@gender ))";
    query = query + ';select @@IDENTITY AS \'identity\'';

    let query_email = "SELECT * FROM [users] WHERE email = @email";

    var query_teacher = "INSERT INTO [teachers] (firstname,lastname,datejoined,userid) VALUES(@firstname,@lastname,Convert(datetime, Convert(datetime, @dj ) ),@userid)";

    var query_parent = "INSERT INTO [parents] (firstname,lastname,datejoined,userid,title) VALUES(@firstname,@lastname,Convert(datetime, @dj ),@userid,@title)";

    var query_student = "INSERT INTO [students] (firstname,lastname,datejoined,userid,dob,enrolmentkey,gradeid,schoolid) VALUES(@firstname,@lastname,Convert(datetime, @dj ),@userid,Convert(datetime, @dob ),@ek,@grade,@schoolid)";

    var query_subadmin = "INSERT INTO [subadmins] (firstname,lastname,datejoined,userid) VALUES(@firstname,@lastname,Convert(datetime, @dj ),@userid)";

    var schema = new passwordValidator();
     
    schema
        .is().min(8)                                    // Minimum length 8                                 
        .has().letters()
        .has().digits()                                 // Must have digits
        .has().not().spaces();                           // Should not have space00

    if (email && password && vpassword) {

        if (!validator.isEmail(email)) {
            return res.json({
                status: 400,
                success: false,
                message: 'Invalid email address'
            });
        }

        if (schema.validate(password)) {
            if (password !== vpassword) {
                return res.json({
                    status: 400,
                    success: false,
                    message: 'Passwords do not match'
                });
            } else {
                var transaction = new sql.Transaction();
                transaction.begin(function (err) {
                    if (err) {
                        console.log(err.message);
                        return res.json({
                            status: 400,
                            success: false,
                            message: 'Internal server error'
                        });
                    }
                 var request = new sql.Request(transaction);
                request
                    .input('email', email)
                    .query(query_email, function (err, recordset) {

                        if (err) {
                            console.log(err);

                            return res.json({
                                status: 500,
                                success: false,
                                message: 'Database error'

                            });
                        } else {
                            if (recordset.recordset.length > 0) {

                                return res.json({
                                    status: 400,
                                    success: false,
                                    message: email + ' is already taken'
                                });
                            } else {

                                password = bcrypt.hashSync(password, process.env.bcrypt_salt);
                                //  var SubscriptionEndDate = moment().format();

                                request
                                    .input('password', password)
                                    .input('femail', email)
                                    .input('roleid', roleid)
                                    .input('otp', pin)
                                    .input('otpexpiry', otpexpiry)
                                    .input('activefrom', activefrom)
                                    .input('gender', gender)
                                    .query(query, function (err, recordset) {

                                        if (err) {
                                            console.log(err);

                                            return res.json({
                                                status: 400,
                                                success: false,
                                                message: 'Database error',
                                                error: err.message
                                            });
                                        } else {

                                            if (recordset.rowsAffected[0] > 0) {
                                                userid = recordset.recordset[0].identity; 
                                                console.log(userid);
                                                var q = "";
                                                if (roleid === "1") {
                                                    //teacher
                                                    q = query_teacher;
                                                    console.log("teacher");
                                                } else if (roleid === "2") {
                                                    console.log("parent");
                                                    //parent
                                                    q = query_parent;
                                                } else if (roleid === "3") {
                                                    //student
                                                    q = query_student;
                                                    console.log("student");
                                                } else if (roleid === "6") {
                                                    //student
                                                    q = query_subadmin;
                                                    console.log("subadmin");
                                                }
                                                request
                                                    .input('firstname', firstname)
                                                    .input('title', title)
                                                    .input('lastname', lastname)
                                                    .input('dob', dob)
                                                    .input('userid', userid)
                                                    .input('ek', enrolmentkey)
                                                    .input('dj', activefrom)
                                                    .input('grade', grade)
                                                    .input('schoolid', schoolid)
                                                    .query(q, function (err, recordset) {

                                                        if (err) {
                                                            console.log(err);

                                                            return res.json({
                                                                status: 400,
                                                                success: false,
                                                                message: 'Database error',
                                                                error: err.message
                                                            });
                                                        } else {
                                                            console.log(recordset);
                                                            if (recordset.rowsAffected[0] > 0) {
                                                                console.log("done sending email");
                                                                transaction.commit();

                                                                var message = {
                                                                    from: 'noreply@cyberchool.com',
                                                                    to: email,
                                                                    subject: "Activate your cyberschool account",
                                                                    text: "Your newschool activation code is " + pin,
                                                                    html: "<h3>Welcome to cyberschool</h3><hr><p>Your activation pin is <b>" + pin + "</b>."
                                                                };

                                                                transporter.sendMail(message, (error, info) => {
                                                                    if (error) {
                                                                        console.log('Error occurred');
                                                                        console.log(error.message);

                                                                        return res.json({
                                                                            status: 201,
                                                                            success: true,
                                                                            message: 'Account Registered',
                                                                            error: 'Failed to send authorization pin'
                                                                        });
                                                                        //    return res.status(400).json({ message: 'Account Registration succeded but failed to send verification pin' });

                                                                        //try again to send pin
                                                                    }

                                                                    console.log('Message sent successfully!');
                                                                    
                                                                    transporter.close();
                                                                    
                                                                    return res.json({
                                                                        status: 201,
                                                                        success: true,
                                                                        message: 'Account Created'
                                                                    });
                                                                });
                                                            } else {
                                                                transaction.rollback();
                                                                return res.json({
                                                                    status: 400,
                                                                    success: false,
                                                                    message: 'Failed to register'
                                                                });

                                                            }
                                                        }
                                                    });

                                            } else {
                                                transaction.rollback();
                                                return res.json({
                                                    status: 400,
                                                    success: false,
                                                    message: 'Failed to register account',
                                                    error: 'error'
                                                });
                                            }

                                        }
                                    });
                            }
                        }
                    });
                });
            }

        } else {

            var errlist = schema.validate(password, { list: true });

            return res.json({
                status: 400,
                success: false,
                message: 'Invalid password',
                error: errlist
            });
        }
        
    } else {
        return res.json({
            status: 400,
            success: false,
            message: 'Some Required fields are not provided',
            erro: 'error'
        });
    }
}; 
//login
let login = (req, res) => {
  
    let email = req.body.email;
    let password = req.body.password;
    let lastpassword = password;

    var userid = 0;
    var roleid = 0;
    var noschoolid = 0;
    var activesubscriptions = 0;

    var currdate = moment().format('YYYY-MM-DD');
      
        if (email && password) {
            if (!validator.isEmail(email)) {
                return res.json({
                    status: 400,
                    success: false,
                    message: 'Invalid email address'
                });
            }

            password = bcrypt.hashSync(password, process.env.bcrypt_salt);

            var query = "select * from[users] where email=@email and password=@password";

            var request = new sql.Request();
            request
                .input('email', email)
                .input('password', password)
                .query(query, function (err, recordset) {
                    console.log(recordset.recordsets[0]);

                    if (err) {

                        console.log(err.message);
                        return res.json({
                            status: 500,
                            success: false,
                            message: 'something went wrong',
                            error: err.message
                        });
                    } else {

                        if (recordset.recordset.length > 0) {
                           
                            var result = {} = JSON.parse(JSON.stringify(recordset.recordset[0]));

                            var grade = "";

                            for (let prop in result) {
                               
                                if (prop === "userId") {
                                    userid = result[prop]; 
                                }

                                if (prop === "roleid") {
                                    roleid = result[prop];
                                }
                            }

                            var p = "";
                            if (roleid === 3) {
                                p = "students";
                                ///////////////////////////
                                var p2 = "select * from[student_subscriptions]  \
                                         LEFT OUTER JOIN students ON students.studentId = student_subscriptions.studentid  \
                                         LEFT OUTER JOIN users ON students.userid = users.userId  \
                                         where users.userId =@id AND Convert(datetime, @cd) < student_subscriptions.enddate";

                                request
                                    .input("id", userid)
                                    .input("cd", currdate)
                                    .query(p2, function (err, recordset) {

                                        if (err) {

                                            console.log(err.message);
                                            return res.json({
                                                status: 500,
                                                success: false,
                                                message: 'something went wrong sub',
                                                error: err.message
                                            });
                                        } else {

                                            if (recordset.recordset.length > 0) {
                                                activesubscriptions = 1;
                                                console.log("success - " + activesubscriptions);
                                            } else {
                                                
                                                var p22 = "select * from[students]  \
                                                 where students.userid =@uid AND  students.schoolid = @sid";

                                                request
                                                    .input("uid", userid)
                                                    .input("sid", noschoolid)
                                                    .query(p22, function (err, recordset) {

                                                        if (err) {

                                                            console.log(err.message);
                                                            return res.json({
                                                                status: 500,
                                                                success: false,
                                                                message: 'something went wrong p22.',
                                                                error: err.message
                                                            });
                                                        } else {
                                                            if (recordset.recordset.length > 0) {

                                                                activesubscriptions = 1;
                                                                console.log("icho 3 " + activesubscriptions);
                                                            } else {
                                                                activesubscriptions = 0;
                                                    
                                                            }
                                                        }
                                                    });
                                            }
                                        }
                                    });

                                ////////////////////////////

                            } else if (roleid === 2) {
                              
                                p = "parents";
                                ////////////////////////////////////////////////////////
                                activesubscriptions = 1;
                                
                            } else if (roleid === 1) {
                                p = "teachers";
                            } else if (roleid === 5) {
                                p = "systemadmins";
                                activesubscriptions = 1;
                            } else if (roleid === 4) {
                                p = "schooladmins";
                            } else if (roleid === 6) {
                                p = "subadmins";
                                activesubscriptions = 1;
                            }
                            console.log("icho2 -" + activesubscriptions);
                            var q = "select * from[" + p + "] where userid = @id2";
                            var resp = "";

                            //verify password hash
                            if (!bcrypt.compareSync(lastpassword, result.password)) {
                                return res.json({
                                    status: 401,
                                    success: false,
                                    message: 'Invalid credentials'
                                });
                            } else {
                                console.log("icho -" + activesubscriptions);
                                let token = jwt.sign({ email: result.email, roleid: result.roleid, userid: result.userId, activesubscriptions: activesubscriptions },
                                    process.env.jwt_secret,
                                    {
                                        expiresIn: '36h' // expires in 1.5 days
                                    }
                                );
                                //////////////////////////////

                                request
                                    .input("id2",userid)
                                    .query(q, function (err, recordset) {
                                        
                                        if (err) {

                                            console.log(err.message);
                                            return res.json({
                                                status: 500,
                                                success: false,
                                                message: 'something went wrong',
                                                error: err.message
                                            });
                                        } else {

                                            if (recordset.recordset.length > 0) {

                                                resp = {} = JSON.parse(JSON.stringify(recordset.recordset[0]));

                                                return res.json({
                                                    status: 200,
                                                    success: true,
                                                    message: 'Login successful',
                                                    roleid: roleid,
                                                    token: token,
                                                    User: resp,
                                                    activesubscriptions: activesubscriptions
                                                });

                                            }
                                        }
                                    });
                            }
                        }else {

                            return res.json({
                                status: 401,
                                success: false,
                                message: 'Login Failed'
                            });
                        }
                    }
                });

        } else {
            res.json({
                status: 400,
                success: false,
                message: 'Email and password are required'
            });
        }
   
};

module.exports = {
    profile: profile, 
    resetpassword: resetpassword,
    checktoken: checkToken,
    changepassword: changepassword,
    refreshotp: refreshotp,
    verifyacc: verifyacc,
    register: register,
    login:login
};