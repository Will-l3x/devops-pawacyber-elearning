'use strict';
var sql = require('mssql');
var generator = require('generate-password');
var rn = require('random-number');
var moment = require('moment');
var bcrypt = require('bcryptjs');



var gen = rn.generator({
    min: 10000009,
    max: 99999909,
    integer: true
});

/////////////////////////////roles

let roles = (req, res) => {
    var query = "select * from [roles] ";
    var request = new sql.Request();

    request.query(query, function (err, recordset) {

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

            return res.json({
                status: 200,
                success: true,
                data: JSON.parse(JSON.stringify({ roles: recordset.recordset }))
            });
        }
    });
};

let role = (req, res) => {
    var id = req.params.id;

    var query = "select * from [roles] \
    where roleId =@id";

    var request = new sql.Request();

    request
        .input("id", id)
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

                return res.json({
                    status: 200,
                    success: true,
                    data: JSON.parse(JSON.stringify({ role: recordset.recordset }))
                });
            }
        });
};

let del_role = (req, res) => {
    var id = req.params.id;
    var query = "DELETE from [roles] where roleId=@id";

    request
        .input("id", id)
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

                return res.json({
                    status: 200,
                    success: true,
                    message: "Deleted"
                });
            }
        });
};

let add_role = (req, res) => {
    var rolename = req.body.rolename;

    var query = "INSERT INTO [roles] \
    (rolename) \
    VALUES(@name)";
    var request = new sql.Request();

    request
        .input("name", rolename)
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

                if (recordset.rowsAffected[0] > 0) {

                    return res.json({
                        status: 200,
                        success: true,
                        message: "Role Added"
                    });

                } else {

                    return res.json({
                        status: 400,
                        success: false,
                        message: 'Failed to add Role'

                    });
                }
            }
        });
};

let update_role = (req, res) => {
    var rolename = req.params.rolename;
    var roleid = req.params.id;

    let query = "UPDATE [roles] \
    SET rolename=@name \
    WHERE roleId = @id";

    var request = new sql.Request();

    request
        .input("id", roleid)
        .input("name", rolename)
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
                if (recordset.rowsAffected[0] > 0) {
                    return res.json({
                        status: 202,
                        success: true,
                        message: 'Updated'
                    });
                } else {
                    return res.json({
                        status: 400,
                        success: false,
                        message: 'Failed to update'
                    });
                }
            }
        });
};

////////////////////////////schools
let schools = (req, res) => {
    var query = "select * from [schools] ";
    var request = new sql.Request();

    request.query(query, function (err, recordset) {

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

            return res.json({
                status: 200,
                success: true,
                data: JSON.parse(JSON.stringify({ schools: recordset.recordset }))
            });
        }
    });
};

let add_school = (req, res) => {
    var schoolid = 0;
    var schoolname = req.body.schoolname;
    var contacts = req.body.contacts;
    var address = req.body.address;
    var email = req.body.email;
    var datejoined, activefrom = moment().format('YYYY-MM-DD');
    var enrolmentkey = generator.generate({
        length: 5,
        numbers: true
    });

    var password = generator.generate({
        length: 8,
        numbers: true
    });

    password = bcrypt.hashSync(password, process.env.bcrypt_salt);

    var roleid = 4; //schooladmin
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var otpexpiry = moment().add(31, 'day').format();
    var pin = gen();

    var query = "INSERT INTO [schools] \
    (schoolname,contacts,address,email,datejoined,enrolmentkey) \
    VALUES(@name,@contacts,@address,@email,@dj,@enrolmentkey)";
    query = query + ';select @@IDENTITY AS \'identity\'';

    var query_user = "INSERT INTO [users] \
    (email,password,otp,roleid,otpexpiry,activefrom) \
    VALUES(@email,@password,@otp,@roleid,@otpe,@dj)";
    query_user = query_user + ';select @@IDENTITY AS \'identity\'';

    var query_schooladmin = "INSERT INTO [schooladmins] \
    (firstname,lastname,activefrom,userid,schoolid) \
    VALUES(@firstname,@lastname,@dj,@userid,@schoolid)";

    let query_email = "SELECT * FROM [schools] WHERE email = @email";

    var transaction = new sql.Transaction();
    transaction.begin(function (err) {
        transaction.rollback();
        if (err) {
            console.log(err.message);
            return res.json({
                status: 400,
                success: false,
                message: 'Internal server error'
            });
        } else {
            //
            var request = new sql.Request(transaction);

            request
                .input('email', email)
                .query(query_email, function (err, recordset) {
                    if (err) {
                        console.log(err);
                        transaction.rollback();
                        return res.json({
                            status: 500,
                            success: false,
                            message: 'Database error'

                        });
                    } else {
                        if (recordset.recordset.length > 0) {
                            transaction.rollback();
                            return res.json({
                                status: 400,
                                success: false,
                                message: email + ' is already taken'
                            });
                        } else {
                            //////
                            request
                                .input('email', email)
                                .input('schoolname', schoolname)
                                .input('address', address)
                                .input('contacts', contacts)
                                .input('datejoined', datejoined)
                                .input('enrolmentkey', enrolmentkey)
                                .query(query, function (err, recordset) {
                                    if (err) {
                                        console.log(err);
                                        transaction.rollback();
                                        return res.json({
                                            status: 500,
                                            success: false,
                                            message: 'Database error'

                                        });
                                    } else {
                                        if (recordset.rowsAffected[0] > 0) {
                                            //if school added succ
                                            schoolid = recordset.recordset[0].identity;

                                            ////////////////////
                                            request
                                                .input('email', email)
                                                .input('password', password)
                                                .input('otp', pin)
                                                .input('roleid', roleid)
                                                .input('otpe', otpexpiry)
                                                .input('dj', datejoined)
                                                .query(query_user, function (err, recordset) {
                                                    if (err) {
                                                        console.log(err);
                                                        transaction.rollback();
                                                        return res.json({
                                                            status: 500,
                                                            success: false,
                                                            message: 'Database error'

                                                        });
                                                    } else {
                                                        if (recordset.rowsAffected[0] > 0) {
                                                            //if user added succ
                                                            userid = recordset.recordset[0].identity;
                                                            ////////////////////////////////////////////////////
                                                            request
                                                                .input('firstname', firstname)
                                                                .input('lastname', lastname)
                                                                .input('userid', userid)
                                                                .input('schoolid', schoolid)
                                                                .input('dj', datejoined)
                                                                .query(query_schooladmin, function (err, recordset) {
                                                                    if (err) {
                                                                        console.log(err);
                                                                        transaction.rollback();
                                                                        return res.json({
                                                                            status: 500,
                                                                            success: false,
                                                                            message: 'Database error'

                                                                        });
                                                                    } else {
                                                                        if (recordset.rowsAffected[0] > 0) {
                                                                            return res.json({
                                                                                status: 2001,
                                                                                success: false,
                                                                                message: 'school Added'
                                                                            });

                                                                        } else {

                                                                            transaction.rollback();
                                                                            return res.json({
                                                                                status: 400,
                                                                                success: false,
                                                                                message: 'Failed to add school , admin. Rolled back changes'
                                                                            });
                                                                        }
                                                                    }
                                                                });




                                                            /////////////////////////////////////////////////////

                                                        } else {

                                                            transaction.rollback();
                                                            return res.json({
                                                                status: 400,
                                                                success: false,
                                                                message: 'Failed to add school , user. Rolled back changes'
                                                            });
                                                        }
                                                    }
                                                });

                                            //////////////////////

                                        } else {

                                            transaction.rollback();
                                            return res.json({
                                                status: 400,
                                                success: false,
                                                message: 'Failed to add school. Rolled back changes'
                                            });
                                        }
                                    }
                                });
                            //////
                        }
                    }
                });
        }
    });
};

let del_school = (req, res) => {
    var id = req.params.id;
    var query = "DELETE from [events] where EventId=@id";

    request
        .input("id", id)
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

                return res.json({
                    status: 200,
                    success: true,
                    message: "Deleted"
                });
            }
        });
};

let school = (req, res) => {
    var schoolid = req.params.id;
    var school_obj, admin_obj, subscriptions_obj;

    var query_school = "select * from [schools] \
    where schoolId =@id";

    var query_subscriptions = "select * from [school_subscriptions] \
    LEFT OUTER JOIN schools ON schools.schoolId = school_subscriptions.schoolid \
    LEFT OUTER JOIN subscriptions ON subscriptions.subscriptionId = school_subscriptions.subscriptionid \
    where school_subscriptions.schoolid =@id";

    var query_admin = "select * from [schooladmins] \
    where schoolid =@id";

    var request = new sql.Request();

    request
        .input("id", schoolid)
        .query(query_school, function (err, recordset) {

            if (err) {
                console.log(err);
                return res.json({
                    status: 500,
                    success: false,
                    message: "An error occured",
                    error: err.message
                });
            } else {
                school_obj = recordset.recordset;

                request
                    .input("id", schoolid)
                    .query(query_subscriptions, function (err, recordset) {

                        if (err) {
                            console.log(err);
                            return res.json({
                                status: 500,
                                success: false,
                                message: "An error occured",
                                error: err.message
                            });
                        } else {
                            subscriptions_obj = recordset.recordset;

                            request
                                .input("id", schoolid)
                                .query(query_admin, function (err, recordset) {

                                    if (err) {
                                        console.log(err);
                                        return res.json({
                                            status: 500,
                                            success: false,
                                            message: "An error occured",
                                            error: err.message
                                        });
                                    } else {
                                        admin_obj = recordset.recordset;

                                        return res.json({
                                            status: 200,
                                            success: true,
                                            school: JSON.parse(JSON.stringify({ school_obj })),
                                            subscriptions: JSON.parse(JSON.stringify({ subscriptions_obj })),
                                            admin: JSON.parse(JSON.stringify({ event: admin_obj }))
                                        });
                                    }
                                });
                        }
                    });
            }
        });
};

let update_school = (req, res) => {

    var schoolid = req.body.id;
    var schoolname = req.body.schoolname;
    var contacts = req.body.contacts;
    var address = req.body.address;
    //var email = req.body.email;
    //var enrolmentkey = generator.generate({
    //    length: 5,
    //    numbers: true
    //});


    let query = "UPDATE [schools] \
    SET schoolname=@name \
      SET contacts=@contacts \
      SET address=@address \
    WHERE schoolId = @id";

    var request = new sql.Request();

    request
        .input("id", schoolid)
        .input("name", schoolname)
        .input("contacts", contacts)
        .input("address", address)
        .input("name", schoolname)
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
                if (recordset.rowsAffected[0] > 0) {
                    return res.json({
                        status: 202,
                        success: true,
                        message: 'Updated'
                    });
                } else {
                    return res.json({
                        status: 400,
                        success: false,
                        message: 'Failed to update'
                    });
                }
            }
        });
};

////////////////////////////subscription
let subscriptions = (req, res) => {
    var query = "select * from [subscriptions]";
    var request = new sql.Request();

    request.query(query, function (err, recordset) {

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

            return res.json({
                status: 200,
                success: true,
                data: JSON.parse(JSON.stringify({ subscriptions: recordset.recordset }))
            });
        }
    });
};

let add_subscription = (req, res) => {
    var subscriptionname = req.body.subscriptionname;
    var subscriptiondesc = req.body.subscriptiondesc;
    var mingrade = req.body.mingrade;
    var maxgrade = req.body.maxgrade;
    var price = req.body.price;

    var query = "INSERT INTO [subscriptions] \
    (subscriptionname,subscriptiondesc,mingrade,maxgrade,price) \
    VALUES(@name,@desc,@min,@max,@price)";
    var request = new sql.Request();

    request
        .input("name", subscriptionname)
        .input("desc", subscriptiondesc)
        .input("min", mingrade)
        .input("max", maxgrade)
        .input("price", price)
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

                if (recordset.rowsAffected[0] > 0) {

                    return res.json({
                        status: 200,
                        success: true,
                        message: "Subscription Added"
                    });

                } else {

                    return res.json({
                        status: 400,
                        success: false,
                        message: 'Failed to add subscription'

                    });
                }

            }
        });
};

let del_subscription = (req, res) => {
    var id = req.params.id;
    var query = "DELETE from [subscriptions] where subscriptionId=@id";

    request
        .input("id", id)
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

                return res.json({
                    status: 200,
                    success: true,
                    message: "Deleted"
                });
            }
        });
};

let subscription = (req, res) => {
    var id = req.params.id;

    var query = "select * from [subscriptions] \
    where subscriptionId =@id";

    var request = new sql.Request();

    request
        .input("id", id)
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

                return res.json({
                    status: 200,
                    success: true,
                    data: JSON.parse(JSON.stringify({ subscription: recordset.recordset }))
                });
            }
        });
};

let update_subscription = (req, res) => {
    var subscriptionid = req.params.subscriptionid;
    var subscriptionname = req.body.subscriptionname;
    var subscriptiondesc = req.body.subscriptiondesc;
    var mingrade = req.body.mingrade;
    var maxgrade = req.body.maxgrade;
    var price = req.body.price;

    let query = "UPDATE [subscriptions] \
      SET price=@price \
      SET subscriptionname=@name \
      SET subscriptiondesc=@desc \
      SET mingrade=@min \
      SET maxgrade=@max \
    WHERE subscriptionId = @id";

    var request = new sql.Request();

    request
        .input("id", subscriptionid)
        .input("name", subscriptionname)
        .input("desc", subscriptiondesc)
        .input("min", mingrade)
        .input("max", maxgrade)
        .input("price", price)
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
                if (recordset.rowsAffected[0] > 0) {
                    return res.json({
                        status: 202,
                        success: true,
                        message: 'Updated'
                    });
                } else {
                    return res.json({
                        status: 400,
                        success: false,
                        message: 'Failed to update'
                    });
                }
            }
        });
};

let subscribe = (req, res) => {
    var schoolid = req.body.schoolid;
    var subscriptionid = req.body.subscriptionid;
    var subscriptionenddate = req.body.subscriptionenddate;


    var query1 = "select * from [school_subscriptions] \
    where schoolid=@school and subscriptionid=@subscription ";

    var query2 = "INSERT INTO [school_subscriptions] \
    (subscriptionid,schoolid,subscriptionenddate) \
    VALUES(@subid,@scid,@enddate)";

    let query3 = "UPDATE [school_subscriptions] \
    SET subscriptionenddate=@enddate \
    where schoolid=@school and subscriptionid=@subscription ";


    var request = new sql.Request();
    request
        .input('school', schoolid)
        .input('subcription', subscriptionid)
        .query(query1, function (err, recordset) {

            if (err) {

                console.log(err.message);
                return res.json({
                    status: 400,
                    success: false,
                    message: 'Internal server error',
                    error: err.message
                });
            } else {

                if (recordset.recordset.length > 0) {
                    request
                        .input('school', schoolid)
                        .input('subcription', subscriptionid)
                        .input('enddate', subscriptionenddate)
                        .query(query3, function (err, recordset) {

                            if (err) {

                                console.log(err.message);
                                return res.json({
                                    status: 400,
                                    success: false,
                                    message: 'Internal server error',
                                    error: err.message
                                });
                            } else {

                                if (recordset.recordset.length > 0) {
                                    return res.json({
                                        status: 200,
                                        success: true,
                                        message: 'Subscription added'
                                    });
                                } else {
                                    return res.json({
                                        status: 400,
                                        success: false,
                                        message: 'failed to subscribe'
                                    });
                                }
                            }
                        });
                } else {
                    request
                        .input('school', schoolid)
                        .input('subcription', subscriptionid)
                        .input('enddate', subscriptionenddate)
                        .query(query2, function (err, recordset) {

                            if (err) {

                                console.log(err.message);
                                return res.json({
                                    status: 400,
                                    success: false,
                                    message: 'Internal server error',
                                    error: err.message
                                });
                            } else {

                                if (recordset.recordset.length > 0) {
                                    return res.json({
                                        status: 200,
                                        success: true,
                                        message: 'Subscription added'
                                    });
                                } else {
                                    return res.json({
                                        status: 400,
                                        success: false,
                                        message: 'failed to subscribe'
                                    });
                                }
                            }
                        });
                }
            }
        });
};

module.exports = {
    roles: roles,
    role: role,
    del_role: del_role,
    add_role: add_role,
    update_role: update_role,
    subscriptions: subscriptions,
    subscription: subscription,
    add_subscription: add_subscription,
    del_subscription: del_subscription,
    update_subscription: update_subscription,
    subscribe: subscribe,
    schools: schools,
    school: school,
    update_school:update_school,
    add_school:add_school
};