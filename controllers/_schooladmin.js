let sql = require("mssql");
let fs = require("fs");
let nodemailer = require("nodemailer");

/*-------------------------------------------------------------------------------------*/
/*teacher------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------*/
let teacher = (req, res) => {
    let teacherid = req.params.id;
    let teacher , classes;

    let query_teacher = `select * from [teachers] \
    where teacherId = ${teacherid}`;

    var query_classes = `select * from [classes] \
    where classes.teacherid = ${teacherid}`;

    var request = new sql.Request();

    request
        .query(query_teacher, (err, recordset) => {

            if (err) {
                console.log(err);
                return res.json({
                    status: 500,
                    success: false,
                    message: "An error occured",
                    error: err.message
                });
            } else {
                teacher = recordset.recordset;

                request
                    .query(query_classes, function (err, recordset) {

                        if (err) {
                            console.log(err);
                            return res.json({
                                status: 500,
                                success: false,
                                message: "An error occured",
                                error: err.message
                            });
                        } else {

                            classes = recordset.recordset;

                            return res.json({
                                            status: 200,
                                            success: true,
                                            data: JSON.parse(JSON.stringify({ teacher, classes }))
                                        });

                           
                        }
                    });
            }
        });
}

let teachers = (req, res) => {
	let schoolid = req.params.id;
    let query = `select * from [teachers]\
    where teachers.schoolid = ${schoolid}`;
    let request = new sql.Request();

    request.query(query, function (err, recordset) {
    	let teachers = recordset.recordset;
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
                data: JSON.parse(JSON.stringify({ teachers }))
            });
        }
    });
}

let add_teacher = (req, res) => {
    var schoolid = 0;
    var schoolname = req.body.schoolname;
    var contacts = req.body.contacts;
    var address = req.body.address;
    var email = req.body.email;
    var datejoined , activefrom = moment().format('YYYY-MM-DD');
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
}

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
}



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
}

module.exports = {
	teacher,
	teachers
};