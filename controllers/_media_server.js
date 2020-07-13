'use strict';
const fs = require('fs');
const sql = require('mssql');
var generator = require('generate-password');

let playvideo = (req, res) => {
    const path = '..material/video/sample.mp4';
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1;

        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(path, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4'
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
};

let create_meeting = (req, res) => {
    var createdby = req.decoded.userid;
    var date = req.body.date;
    var classid = req.body.classid;
    var notes = req.body.notes;
    var status = "Waiting for ";

    var query = "INSERT INTO [meetings] \
    (createdby,date , classid,notes,status) \
    VALUES(@cb,@date,@cid,@notes,@status)";
    var request = new sql.Request();

    request
        .input("cb", createdby)
        .input("date", date)
        .input("cid", classid)
        .input("notes", notes)
        .input("status", status)
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
                        message: "Meeting Created"
                    });

                } else {

                    return res.json({
                        status: 400,
                        success: false,
                        message: 'Failed create meeting'

                    });
                }
            }
        });
};

let start_meeting = (req, res) => {
    var meeting_id = req.params.id;
    var password = req.body.password;
    var status = "Meeting Started";
    
    var room = generator.generate({
        length: 53,
        numbers: true,
        lowercase: true,
        uppercase: true
    });

    /////////////////////save to db
    var query = "UPDATE [meetings] \
    SET link=@room ,password=@password ,status=@status \
    WHERE meetingId = @id";

    var request = new sql.Request();

    request
        .input("id", meeting_id)
        .input("room", room)
        .input("password", password)
        .input("status", status)
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
                        message: "Meeting Started",
                        room: "https://meet.jit.si/" + room
                    });

                } else {

                    return res.json({
                        status: 400,
                        success: false,
                        message: 'Failed to start Meeting'

                    });
                }
            }
        });

};

let stop_meeting = (req, res) => {
    var meeting_id = req.params.id;
    var status = "Meeting Ended";

    var query = "UPDATE [meetings] \
    SET link=@link, password=@pass ,status=@status \
    WHERE meetingId = @id";

    var request = new sql.Request();

    request
        .input("id", meeting_id)
        .input("status", status)
        .input("pass", "")
        .input("link", "")
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
                        message: "Meeting Stopped"
                    });

                } else {

                    return res.json({
                        status: 400,
                        success: false,
                        message: 'Failed to stop Meeting'

                    });
                }
            }
        });

};

let get_meetings = (req, res) => {

    var id = req.decoded.userid;
    var role = req.decoded.roleid;
    var request = new sql.Request();

    if (role === 3) {
        var query = "select * from [meetings] \
         LEFT OUTER JOIN class_students ON class_students.classid = meetings.classid \
         LEFT OUTER JOIN students ON students.studentId = class_students.studentid \
         Where students.studentId = @id \
         ";

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
                        data: JSON.parse(JSON.stringify({ meetings: recordset.recordset }))

                    });

                }
            });

    } else if (role === 1) {
        var query1 = "select * from [meetings] \
         Where createdby = @id \
         ";

        request
            .input("id", id)
            .query(query1, function (err, recordset) {

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
                        data: JSON.parse(JSON.stringify({ meetings: recordset.recordset }))

                    });

                }
            });
    } else {
        return res.json({
            status: 401,
            success: false,
            message: "Not Authorized"

        });
    }
};

let get_meeting = (req, res) => {

    var id = req.decoded.userid;
    var role = req.decoded.roleid;
    var mid = req.params.id;
    var request = new sql.Request();

    if (role === 3) {
        var query = "select * from [meetings] \
         LEFT OUTER JOIN class_students ON class_students.classid = meetings.classid \
         LEFT OUTER JOIN students ON students.studentId = class_students.studentid \
         Where students.studentId = @id \
         and meetingId = @mid \
         ";

        request
            .input("id", id)
            .input("mid", mid)
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
                        data: JSON.parse(JSON.stringify({ meeting: recordset.recordset }))

                    });

                }
            });

    } else if (role === 1) {
        var query1 = "select * from [meetings] \
         Where createdby = @id \
        and meetingId = @mid \
         ";

        request
            .input("id", id)
            .input("mid", mid)
            .query(query1, function (err, recordset) {

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
                        data: JSON.parse(JSON.stringify({ meeting: recordset.recordset }))

                    });

                }
            });
    }
};

module.exports = {
    playvideo: playvideo,
    create_meeting: create_meeting,
    get_meetings: get_meetings,
    get_meeting: get_meeting,
    stop_meeting: stop_meeting,
    start_meeting:start_meeting
};