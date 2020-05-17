'use strict';
var sql = require('mssql');

/////////////////////////////roles

async function roles(req, res) {
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
}

async function role(req, res) {
    var id = req.params.id;

    var query = "select * from [roles] \
    where RoleId =@id";

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
}

async function del_role(req, res) {
    var id = req.params.id;
    var query = "DELETE from [roles] where RoleId=@id";

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
}

async function add_role(req, res) {
    var rolename = req.body.rolename;
   
    var query = "INSERT INTO [roles] \
    (RoleName) \
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
}

async function update_role(req, res) {
    var rolename = req.params.rolename;
    var roleid = req.params.id;

    let query = "UPDATE [roles] \
    SET RoleName=@name \
    WHERE RoleId = @id";

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
}

////////////////////////////schools
async function schools(req, res) {
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
}

async function add_school(req, res) {
    var EventName = req.body.name;
    var StartTime = req.body.starttime;
    var EndTime = req.body.endtime;
    var Description = req.body.description;
    var Venue = req.body.venue;
    var Contacts = req.body.contacts;
    var AddedBy = req.decoded.userid;
    var invited = req.body.invited;

    var query = "INSERT INTO [events] \
    (EventName,StartTime,Endtime,Description,Venue,Contacts,AddedBy,Invited) \
    VALUES(@name,@st,@et,@desc,@venue,@contacts,@ab,@invited)";
    var request = new sql.Request();

    request
        .input("name", EventName)
        .input("st", StartTime)
        .input("et", EndTime)
        .input("desc", Description)
        .input("venue", Venue)
        .input("contacts", Contacts)
        .input("ab", AddedBy)
        .input("invited", invited)
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

                    var message = {
                        from: 'FRSMS ADMIN',
                        to: 'staff@frs.co.zw',
                        subject: "New Event Added",
                        text: "New event added, please login to see full details",
                        html: "<h3>FRSMS</h3><hr><p>A new event: <b>" + EventName + "</b> starting  " + StartTime + " and ending " + EndTime + " has been added. Please login to your fms account to view more details"
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
                            message: "Event Added"
                        });
                    });
                } else {

                    return res.json({
                        status: 400,
                        success: false,
                        message: 'Failed to add event'

                    });
                }

            }
        });
}

async function del_school(req, res) {
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
}

async function school(req, res) {
    var id = req.params.id;

    var query = "select * from [events] \
    LEFT OUTER JOIN employees ON employees.UserId = events.AddedBy \
    where EventId =@id";

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
                    data: JSON.parse(JSON.stringify({ event: recordset.recordset }))
                });
            }
        });
}

async function update_school(req, res) {
    var rolename = req.params.rolename;
    var schoolid = req.params.id;

    let query = "UPDATE [roles] \
    SET RoleName=@name \
    WHERE RoleId = @id";

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
}

////////////////////////////subscription
async function subscriptions(req, res) {
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
}

async function add_subscription(req, res) {
    var subscriptionname = req.body.subscriptionname;
    var subscriptiondesc = req.body.subscriptiondesc;
    var mingrade = req.body.mingrade;
    var maxgrade = req.body.maxgrade;
    var price = req.body.price;

    var query = "INSERT INTO [subscriptions] \
    (SubscriptionName,SubscriptionDesc,MinGrade,MaxGrade,Price) \
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
}

async function del_subscription(req, res) {
    var id = req.params.id;
    var query = "DELETE from [subscriptions] where SubscriptionId=@id";

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
}

async function subscription(req, res) {
    var id = req.params.id;

    var query = "select * from [subscriptions] \
    where SubscriptionId =@id";

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
}

async function update_subscription(req, res) {
    var subscriptionid = req.params.subscriptionid;
    var subscriptionname = req.body.subscriptionname;
    var subscriptiondesc = req.body.subscriptiondesc;
    var mingrade = req.body.mingrade;
    var maxgrade = req.body.maxgrade;
    var price = req.body.price;

    let query = "UPDATE [subscriptions] \
      SET Price=@price \
      SET SubscriptionName=@name \
      SET SubscriptionDesc=@desc \
      SET MinGrade=@min \
      SET MaxGrade=@max \
    WHERE SubscriptionId = @id";

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
}

//come back to get id
async function subscribe(req, res) {
    var schoolid = req.body.schoolid;
    var subscriptionid = req.body.subscriptionid;
    var subscriptionenddate = req.body.subscriptionenddate;


    var query1 = "select * from [school_subscriptions] \
    where SchoolId=@school and SubscriptionId=@subscription ";

    var query2 = "INSERT INTO [school_subscriptions] \
    (SubscriptionId,SchoolId,SubscriptionEndDate) \
    VALUES(@subid,@scid,@enddate)";

    let query3 = "UPDATE [school_subscriptions] \
    SET SubscriptionEndDate=@enddate \
    WHERE SchoolSubscriptionId = @id";


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
}

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
    schools: schools
};