let sql = require("mssql");
//-- Create new message
let newMsg = async (req, res) => {
  console.log("Student : creating new msg..."); //dev
  //Expects teacherid, studentid, to, from, title, message
  // should add time here
  let obj = req.body;
  if (!obj.teacherid || !obj.studentid || !obj.message) {
    res.send({
      err:
        "Missing a parameter, expects classid, title, teacherid on request object",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let q = `insert into messages\
        (studentid, teacherid, title, message, to, from) \
         values (${obj.studentid}, ${obj.teacherid}, '${obj.title}', '${obj.message}', '${obj.to}', '${obj.from}')`;
    console.log(q); //dev
    let ms_req = new sql.Request();
    ms_req.query(q, (err, data) => {
      if (err) {
        console.log(err); //dev
        return res.status(500).send({
          success: false,
          message: "An error occured",
          error: err.message,
        });
      } else {
        console.log("Insert : "); //dev
        console.log(data); //dev
        if (data.rowsAffected[0] > 0) {
          return res.json({
            status: 200,
            success: true,
            message: "Added msg...",
          });
        } else {
          return res.json({
            status: 400,
            success: false,
            message: "Failed to add msg...",
          });
        }
      }
    });
  }
};
//--Gets all messages for a student
let getMsgs = (req, res) => {
  console.log("Student : Getting all messages...");
  //Expects studentid
  if (!req.params.id) {
    res.send({
      err: "Missing a parameter, expects studentid",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let p = req.params.id;
    let q = `select * \
      from messages \
      where messages.studentid = ${p}`;
    let ms_req = new sql.Request();
    ms_req.query(q, (err, data) => {
      if (err) {
        console.log(err); //dev
        return res.status(500).send({
          success: false,
          message: "An error occured",
          error: err.message,
        });
      } else {
        if (data.recordset.len === 0) {
          return res.status(400).send({
            success: false,
            message: "Student messages not found",
          });
        } else {
          return res.status(200).send({
            success: true,
            data: data.recordset,
          });
        }
      }
    });
  }
};
// Gets all classes student is enrolled in
let getClasses = (req, res) => {
  console.log("Student : Getting all Classes enrolled in...");
  //Expects studentid
  if (!req.params.id) {
    res.send({
      err: "Missing a parameter, expects studentid",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let p = req.params.id;
    let q = `select * from classes \
    where classes.classId in \
      (select class_students.classid from class_students \
  where class_students.studentid = ${p});`;
    let ms_req = new sql.Request();
    ms_req.query(q, (err, data) => {
      if (err) {
        console.log(err); //dev
        return res.status(500).send({
          success: false,
          message: "An error occured",
          error: err.message,
        });
      } else {
        if (data.recordset.len === 0) {
          return res.status(400).send({
            success: false,
            message: "Classes not found",
          });
        } else {
          return res.status(200).send({
            success: true,
            data: data.recordset,
          });
        }
      }
    });
  }
};
//Get all course materials for one class
let getCourseMaterials = (req, res) => {
  console.log("Student : Getting all class material...");
  //Expects classid
  if (!req.params.id) {
    res.send({
      err: "Missing a parameter, expects classid",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let p = req.params.id;
    let q = `select * from materials \
    where materials.classId = ${p};`;
    let ms_req = new sql.Request();
    ms_req.query(q, (err, data) => {
      if (err) {
        console.log(err); //dev
        return res.status(500).send({
          success: false,
          message: "An error occured",
          error: err.message,
        });
      } else {
        if (data.recordset.len === 0) {
          return res.status(400).send({
            success: false,
            message: "Materials not found",
          });
        } else {
          return res.status(200).send({
            success: true,
            data: data.recordset,
          });
        }
      }
    });
  }
};
module.exports = {
  newMsg: newMsg,
  getMsgs: getMsgs,
  getClasses: getClasses,
  getCourseMaterials: getCourseMaterials,
};
