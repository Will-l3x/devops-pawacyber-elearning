let sql = require("mssql");
let fs = require("fs");
const moment = require("moment");

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
//Get all reminders for one student
let getReminders = (req, res) => {
  console.log("Student : Getting all reminders...");
  //Expects studentid
  if (!req.params.id) {
    res.send({
      err: "Missing a parameter, expects studentid",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let p = req.params.id;
    let q = `select * from reminders \
    where reminders.classid in \
      (select class_students.classid from class_students where class_students.studentid = ${p});`;
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
            message: "Reminders not found",
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
//Student assignment submission
let newSubmission = (req, res) => {
  console.log("Student : creating new submission..."); //dev
  let datesubmitted = moment().format("YYYY-MM-DD");
  console.log(datesubmitted);
  //Expects teacherid, classid, schoolid, assid, and a json object containing material/file name
  let obj = req.body;
  if (!obj.assid || !obj.studentid) {
    res.send({
      err:
        "Missing a parameter, expects classid, studentid, assid, on request object",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let uploadPath;
    let q;
    if (!obj.file) {
      let o = JSON.stringify(obj.obj);
      q = `insert into student_assignments \
        (assignmentid, studentid, datesubmitted , obj) \
         values (${obj.assid}, ${studentid}, ${datesubmitted}, ${o})`;
    } else {
      obj.file = `${obj.assid}`;
      q = `insert into student_assignments \
        (assignmentid, studentid, datesubmitted, [file]) \
         values (${obj.assid}, ${obj.studentid}, ${datesubmitted}, '${obj.file}'); \
        select * FROM student_assignments where student_assignments.saId = SCOPE_IDENTITY(); `;
    }
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
        console.log(data); //dev
        if (data.rowsAffected[0] > 0) {
          let assId = data.recordset[0].assignmentId;
          return res.json({
            status: 200,
            success: true,
            message: "Added assignment submission...",
            uploadId: assId,
            uploadType: "student_assignments",
          });
        } else {
          return res.json({
            status: 400,
            success: false,
            message: "Failed to add assignment submission...",
          });
        }
      }
    });
  }
};

//Get all assignments for one class for a student
let getAssignments = (req, res) => {
  console.log("Student : Getting all assignments...");
  //Expects classid
  if (!req.params.id) {
    res.send({
      err: "Missing a parameter, expects classid",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let p = req.params.id;
    let q = `select * from [assignments] \
    where assignments.classid = ${p};`;
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
            message: "Reminders not found",
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
//Get all active packages for a school
let active_packages = (req, res) => {
  let schoolid = req.params.id;
  let query = `select * from [school_active_packages]\
    where school_active_packages.schoolid = ${schoolid} `;
  let request = new sql.Request();

  request.query(query, function (err, recordset) {
    let activePackages = recordset.recordset;
    if (err) {
      console.log(err);
      console.log(err.stack);
      return res.json({
        status: 500,
        success: false,
        message: "An error occured",
        error: err.message,
      });
    } else {
      return res.json({
        status: 200,
        success: true,
        data: JSON.parse(JSON.stringify({ activePackages })),
      });
    }
  });
};
//Get all classes for a grade
let classes_grade = (req, res) => {
  let grade = req.body.grade;
  let schoolid = req.body.schoolid;
  let query = `select * from [classes]\
    where classes.grade = ${grade} and classes.schoolid = ${schoolid}`;
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
        error: err.message,
      });
    } else {
      return res.json({
        status: 200,
        success: true,
        data: JSON.parse(JSON.stringify({ classes })),
      });
    }
  });
};
//Select Package and Classes
let select_package_class = (req, res) => {
  let sapid = req.body.sapId;
  let schoolid = req.body.schoolid;
  let classid = req.body.classid;
  let studentid = req.body.studentid;
  let query = `insert into [student_package_class]\
   (schoolid, sapid, classid, studentid) \
    values(${schoolid}, ${sapid}, ${classid}, ${studentid}); \
    select * from student_package_class \
    where student_package_class.spId = SCOPE_IDENTITY(); `;
  let request = new sql.Request();

  request.query(query, function (err, recordset) {
    let package_class = recordset.recordset;
    if (err) {
      console.log(err);
      console.log(err.stack);
      return res.json({
        status: 500,
        success: false,
        message: "An error occured",
        error: err.message,
      });
    } else {
      return res.json({
        status: 200,
        success: true,
        data: JSON.parse(JSON.stringify({ package_class })),
      });
    }
  });
};

module.exports = {
  newMsg: newMsg,
  getMsgs: getMsgs,
  getClasses: getClasses,
  getCourseMaterials: getCourseMaterials,
  getReminders: getReminders,
  newSubmission: newSubmission,
  getAssignments: getAssignments,
  active_packages,
  classes_grade,
  select_package_class,
};
