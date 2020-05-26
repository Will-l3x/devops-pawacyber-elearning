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


}

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

module.exports = {
	teacher,
	teachers,
	add_teacher,
	del_teacher,
	update_teacher
};