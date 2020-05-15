let sql = require("mssql");
let nodemailer = require("nodemailer");

let enrolStudent = async (req, res) => {
  let fd = {
    email: "",
    classEnrollmentKey: "",
    enrollmentUrl: "",
  };
  console.log("Teacher : enrolling student..."); //dev
  // Expects classid, studentid, teacherid
  let obj = req.body;
  if (!obj.classid || !obj.studentid || !obj.teacherid) {
    res.send({
      err:
        "Missing a parameter, expects classid, studentid, teacherid on request object",
    });
    console.log("Missing parameter..."); //dev
  } else {
    //Enrolment logic :
    //-- Sends an email with an endpoint that enrols student/ displays the enrollment key.
    //-- Student shouldn't be added until endpoint is hit? or a field in the class_student table
    //-- to track whether the email endpoint has been hit?
    //1.get student email
    let q = `select users.email \
      from users \
      where users.userID in \
      (select students.userid from students where students.userid = ${obj.studentid});`;
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
        console.log("Returns :"); //dev
        console.log(data); //dev
        fd.email = data.recordset[0].email;
        //2.get enrollmentkey
        let q2 = `select classes.enrolmentkey \
        from classes \
        where classes.classID = ${obj.classid}`;
        ms_req.query(q2, (err, data) => {
          if (err) {
            console.log(err); //dev
            return res.status(500).send({
              success: false,
              message: "An error occured",
              error: err.message,
            });
          } else {
            console.log("Nested Returns :"); //dev
            console.log(data); //dev
            fd.classEnrollmentKey = data.recordset[0].enrolmentkey;
            //3.build enrolmenturl
            fd.enrollmentUrl = `http://localhost:3000/api/student/enrol/ \
              ${obj.classid}-${fd.classEnrollmentKey}-${obj.studentid}`;
            //4.enrol student & send email
            let q3 = `insert into class_students \
              (classid, studentid) \
              values (${obj.classid}, ${obj.studentid})`;
            console.log(q3);
            ms_req.query(q3, (err, data) => {
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
                  //5.Nodemailer here
                  return res.json({
                    status: 200,
                    success: true,
                    message: "Student Enrolled into class...",
                  });
                } else {
                  return res.json({
                    status: 400,
                    success: false,
                    message: "Failed to enroll student...",
                  });
                }
              }
            });
          }
        });
        console.log(fd);
      }
    });
  }
};
//-- Create new course material for a class
let newCourseMaterial = (req, res) => {
  console.log("Teacher : creating new course material...");
  //Expects teacherid, classid, materialname, and a json object containing material/file name
  let obj = req.body;

  if (!obj.materialname || !obj.classid || !obj.teacherid) {
    res.send({
      err:
        "Missing a parameter, expects classid, materialtype, teacherid on request object",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let q;
    if (!obj.file) {
      let o = JSON.stringify(obj.obj);
      q = `insert into materials \
        (classid, teacherid, materialname, obj) \
         values (${obj.classid}, ${obj.studentid}, ${obj.materialname}, ${o})`;
    } else {
      q = `insert into materials \
        (classid, teacherid, materialname, file) \
         values (${obj.classid}, ${obj.studentid}, ${obj.materialname}, ${obj.file})`;
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
        console.log("Insert : "); //dev
        console.log(data); //dev
        if (data.rowsAffected[0] > 0) {
          //5.Nodemailer here
          return res.json({
            status: 200,
            success: true,
            message: "Added material...",
          });
        } else {
          return res.json({
            status: 400,
            success: false,
            message: "Failed to add material...",
          });
        }
      }
    });
  }
};
//--Gets course material, single row
let getCourseMaterial = (req, res) => {
  console.log("Teacher : Getting course material...");
  //Expects materialid
  if (!req.params.id) {
    res.send({
      err: "Missing a parameter, expects material id",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let p = req.params.id;
    let q = `select * \
      from materials \
      where materials.materialID = ${p}`;
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
            message: "Material not found",
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
//--Gets course materials for a class, single row
let getCourseMaterials = (req, res) => {
  console.log("Teacher : Getting course materials...");
  //Expects classid
  if (!req.params.id) {
    res.send({
      err: "Missing a parameter, expects material id",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let p = req.params.id;
    let q = `select * \
      from materials \
      where materials.classid = ${p}`;
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

//-- Create new assignment for a class
let newAssignment = (req, res) => {
  console.log("Teacher : creating new assignment..."); //dev
  //Expects teacherid, classid, assignmentname, and a json object containing material/file name
  let obj = req.body;
  if (!obj.assignmentname || !obj.classid || !obj.teacherid) {
    res.send({
      err:
        "Missing a parameter, expects classid, assignmentname, teacherid on request object",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let q;
    if (!obj.file) {
      let o = JSON.stringify(obj.obj);
      q = `insert into assignments \
        (classid, teacherid, assignmentname, obj) \
         values (${obj.classid}, ${obj.studentid}, ${obj.assignmentname}, ${o})`;
    } else {
      q = `insert into assignments \
        (classid, teacherid, assignmentname, file) \
         values (${obj.classid}, ${obj.studentid}, ${obj.assignmentname}, ${obj.file})`;
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
        console.log("Insert : "); //dev
        console.log(data); //dev
        if (data.rowsAffected[0] > 0) {
          //5.Nodemailer here
          return res.json({
            status: 200,
            success: true,
            message: "Added assignment...",
          });
        } else {
          return res.json({
            status: 400,
            success: false,
            message: "Failed to add assignment...",
          });
        }
      }
    });
  }
};
//--Gets assignment, single row
let getAssignment = (req, res) => {
  console.log("Teacher : Getting assignment...");
  //Expects assignmentid
  if (!req.params.id) {
    res.send({
      err: "Missing a parameter, expects material id",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let p = req.params.id;
    let q = `select * \
      from assignments \
      where assignments.assignmentID = ${p}`;
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
            message: "Assignment not found",
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
//--Gets all assignments for a class
let getAssignments = (req, res) => {
  console.log("Teacher : Getting course assignments...");
  //Expects classid
  if (!req.params.id) {
    res.send({
      err: "Missing a parameter, expects classid",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let p = req.params.id;
    let q = `select * \
      from assignments \
      where assignments.classid = ${p}`;
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
            message: "Assignments not found",
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
  enrolStudent: enrolStudent,
  newCourseMaterial: newCourseMaterial,
  getCourseMaterial: getCourseMaterial,
  getCourseMaterials: getCourseMaterials,
  newAssignment: newAssignment,
  getAssignment: getAssignment,
  getAssignments: getAssignments,
};

