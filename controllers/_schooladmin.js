let sql = require("mssql");
let fs = require("fs");
let nodemailer = require("nodemailer");

/*-------------------------------------------------------------------------------------*/
/*teachers------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------*/
let teacher = (req, res) => {
    let teacherid = req.params.id;
    let teacher, classes;

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
};
 
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
};

let add_teacher = (req, res) => {
    let schoolid = req.body.schoolid;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let userid = req.body.userid;
    let datejoined = moment().format('YYYY-MM-DD');


    var query = `insert into [teachers] \
    (schoolid, firstname, lastname, userid,datejoined) \
    values(${schoolid}, ${firstname}, ${lastname}, ${userid}, ${datejoined}); \
    select * from teachers where teachers.teacherId = SCOPE_IDENTITY(); `;

    request
        .query(query, function (err, recordset) {
            let teacher = recordset.recordset;
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
                    data: JSON.parse(JSON.stringify({ teacher }))
                });
            }
        });
};

let del_teacher = (req, res) => {
    var id = req.params.id;
    var query = `delete from [teachers] where teacherId= ${id}`;

    request
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



let update_teacher = (req, res) => {
   let teacherid = req.body.teacherId;
   let schoolid = req.body.schoolid;
   let firstname = req.body.firstname;
   let lastname = req.body.lastname;
   let userid = req.body.userid;
   let datejoined = req.body.datejoined;
   
    let query = `UPDATE [teachers] \
    SET schoolid=${schoolid} \
    SET firstname=${firstname} \
    SET lastname=${lastname} \
    SET userid=${userid} \
    SET datejoined=${datejoined} \
    WHERE teacherId = ${teacherid}`;

    var request = new sql.Request();

    request
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

/*-------------------------------------------------------------------------------------*/
/*classes------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------*/
let get_class = (req, res) => {
    let classid = req.params.id;

    let query = `select * from [classes] \
    where classId = ${classid}`;

    var request = new sql.Request();

    request
        .query(query, (err, recordset) => {
            let _class = recordset.recordset;
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
                                data: JSON.parse(JSON.stringify({ _class }))
                            });

                     
            }
        });
}

let get_classes = (req, res) => {
    let schoolid = req.params.id;
    let query = `select * from [classes]\
    where classes.schoolid = ${schoolid}`;
    let request = new sql.Request();

    request.query(query, function (err, recordset) {
        let classes = recordset.recordset;
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
                data: JSON.parse(JSON.stringify({ classes }))
            });
        }
    });
}

let add_class = (req, res) => {
    let teacherid = req.body.teacherid;
    let classname = req.body.classname;
    let createdby = req.body.createdby;
    let status = req.body.status;
    let createdon = moment().format('YYYY-MM-DD');
    let enrolmentkey;
   

    var query = `insert into [classes] \
    (teacherid, classname, createdby, createdon, status) \
    values(${teacherid}, ${classname}, ${createdby}, ${createdon}, ${status}); \
    select * from classes where classes.classId = SCOPE_IDENTITY(); `;
   
       request
        .query(query, function (err, recordset) {
            let _class = recordset.recordset;
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
                    data: JSON.parse(JSON.stringify({ _class }))
                });
            }
        });


}

let del_class = (req, res) => {
    var id = req.params.id;
    var query = `delete from [classes] where classId= ${id}`;

    request
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



let update_class = (req, res) => {
   let teacherid = req.body.teacherId;
   let classid = req.body.classid;
   let classname = req.body.classname;
   let status = req.body.status;
   let enrolmentkey = req.body.enrolmentkey;
   
    let query = `UPDATE [classes] \
    SET teacherid=${teacherid} \
    SET classname=${classname} \
    SET status=${status} \
    SET enrolmentkey=${enrolmentkey} \
    WHERE classId = ${classid}`;

    var request = new sql.Request();

    request
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

/*-------------------------------------------------------------------------------------*/
/*students------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------*/
let student = (req, res) => {
    let studentid = req.params.id;
    

    let query = `select * from [students] \
    where studentId = ${studentid}`;


    var request = new sql.Request();

    request
        .query(query, (err, recordset) => {

            if (err) {
                console.log(err);
                return res.json({
                    status: 500,
                    success: false,
                    message: "An error occured",
                    error: err.message
                });
            } else {
                student = recordset.recordset;

                return res.json({
                                status: 200,
                                success: true,
                                data: JSON.parse(JSON.stringify({ student }))
                            });

                     
            }
        });
}

let students = (req, res) => {
    let schoolid = req.params.id;
    let query = `select * from [students]\
    where students.schoolid = ${schoolid}`;
    let request = new sql.Request();

    request.query(query, function (err, recordset) {
        let students = recordset.recordset;
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
                data: JSON.parse(JSON.stringify({ students }))
            });
        }
    });
}

let add_student = (req, res) => {
    let schoolid = req.body.schoolid;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let userid = req.body.userid;
    let dob = req.body.dob;
    let enrolmentkey = req.body.enrolmentkey;
    let datejoined = moment().format('YYYY-MM-DD');
   

    var query = `insert into [students] \
    (schoolid, firstname, lastname, userid, dob, enrolmentkey, datejoined) \
    values(${schoolid}, ${firstname}, ${lastname}, ${userid}, ${dob}, ${enrolmentkey}, ${datejoined}); \
    select * from students where students.studentId = SCOPE_IDENTITY(); `;
   
       request
        .query(query, function (err, recordset) {
            let student = recordset.recordset;
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
                    data: JSON.parse(JSON.stringify({ student }))
                });
            }
        });


}

let del_student = (req, res) => {
    var id = req.params.id;
    var query = `delete from [students] where studentId= ${id}`;

    request
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



let update_student = (req, res) => {
    let studentid = req.body.studentid;
    let schoolid = req.body.schoolid;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let userid = req.body.userid;
    let dob = req.body.dob;
    let enrolmentkey = req.body.enrolmentkey;
   
   
    let query = `UPDATE [students] \
    SET schoolid=${schoolid} \
    SET firstname=${firstname} \
    SET lastname=${lastname} \
    SET userid=${userid} \
    SET enrolmentkey=${enrolmentkey} \
    SET dob=${dob} \
    WHERE studentId = ${studentid}`;

    var request = new sql.Request();

    request
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
	teachers,
	add_teacher,
	del_teacher,
	update_teacher,
    get_class,
    get_classes,
    add_class,
    del_class,
    update_class,
    student,
    students,
    add_student,
    del_student,
    update_student,
};