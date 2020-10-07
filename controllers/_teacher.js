let sql = require("mssql");
let fs = require("fs");
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
      (select students.userid from students where students.studentId = ${obj.studentid});`;
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
  //Expects teacherid, classid, materialname, schoolid and a json object containing material/file name
  let obj = req.body;

  if (!obj.materialname || !obj.classid || !obj.teacherid || !obj.schoolid) {
    res.send({
      err:
        "Missing a parameter, expects classid, materialtype, teacherid on request object",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let uploadPath;
    let q;
    if (!obj.file) {
      let o;
      if (!obj.obj) {
        o = "No Tag";
      } else {
        o = obj.obj;
      }
      q = `insert into materials \
        (classid, teacherid, materialname, obj) \
         values (${obj.classid}, ${obj.studentid}, '${obj.materialname}', '${o}')`;
    } else {
      let o;
      if (!obj.obj) {
        o = "No Tag";
      } else {
        o = obj.obj;
      }

      uploadPath = `${__dirname}/../uploads/${obj.schoolid}/${obj.classid}/`;
      obj.file = `/uploads/${obj.schoolid}/${obj.classid}/`;
      console.log("Checking upload path..."); //dev
      if (!fs.existsSync(uploadPath)) {
        console.log("Creating upload path..."); //dev
        console.log(uploadPath); //dev
        fs.mkdirSync(uploadPath, {recursive: true});
      }
      q = `insert into materials \
        (classid, teacherid, materialname, [file], obj) \
         values (${obj.classid}, ${obj.teacherid}, '${obj.materialname}', '${obj.file}', '${o}'); \
         select * FROM materials where materials.mID = SCOPE_IDENTITY();`;
    }
    //console.log(q); //dev
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
          let mId = data.recordset[0].mId;
          return res.json({
            status: 200,
            success: true,
            message: "Added material...",
            uploadId: mId,
            uploadType: "materials",
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
let newCourseMaterialv2 = (req, res) => {
  console.log("Teacher : creating new course material...");
  //Expects teacherid, classid, materialname, schoolid and a json object containing material/file name
  let obj = req.body;

  if (!obj.materialname || !obj.classid || !obj.teacherid || !obj.schoolid) {
    res.send({
      err:
        "Missing a parameter, expects classid, materialtype, teacherid on request object",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let uploadPath;
    let q;
    if (!obj.file) {
      let o;
      if (!obj.obj) {
        o = "No Tag";
      } else {
        o = obj.obj;
      }
      q = `insert into materials \
        (classid, teacherid, materialname, obj) \
         values (${obj.classid}, ${obj.studentid}, '${obj.materialname}', '${o}')`;
    } else {
      let o;
      if (!obj.obj) {
        o = "No Tag";
      } else {
        o = obj.obj;
      }
      obj.file = `${obj.materialname}`;

      q = `insert into materials \
        (classid, teacherid, materialname, [file], obj) \
         values (${obj.classid}, ${obj.teacherid}, '${obj.materialname}', '${obj.file}', '${o}'); \
         select * FROM materials where materials.mID = SCOPE_IDENTITY();`;
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
          let mId = data.recordset[0].mId;
          return res.json({
            status: 200,
            success: true,
            message: "Added material...",
            uploadId: mId,
            uploadType: "materials",
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
      where materials.mID = ${p}`;
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
// Get course material by tag
let getCourseMaterialByTag = (req, res) => {
  console.log("Teacher : Getting course materials by tag...");
  //Expects tag string
  if (!req.body.tag) {
    res.send({
      err: "Missing a parameter, expects tag",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let p = req.body.tag;
    let q = `select * \
      from materials \
      where materials.obj = '${p}'`;
    console.log(p);
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

// Update course material tag
let updateCourseMaterialTag = (req, res) => {
  console.log("Teacher : Getting course materials by tag...");
  //Expects tag string
  if (!req.body.materialId || !req.body.tag) {
    res.send({
      err: "Missing a parameter, expects tag and materialId",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let tag = req.body.tag;
    let mId = req.body.materialId;
    let q = `update materials \
      set materials.obj = '${tag}' \
      where materials.mId = ${mId}`;
    console.log(p);
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
            message: "Added mark to student submission...",
          });
        } else {
          return res.json({
            status: 400,
            success: false,
            message: "Failed to add mark...",
          });
        }
      }
    });
  }
};
//-- Create new assignment for a class
let newAssignment = (req, res) => {
  console.log("Teacher : creating new assignment..."); //dev
  //Expects teacherid, classid, assignmentname, schoolid , and a json object containing material/file name
  let obj = req.body;
  if (!obj.assignmentname || !obj.classid || !obj.teacherid || !obj.schoolid) {
    res.send({
      err:
        "Missing a parameter, expects classid, schoolid, assignmentname, teacherid on request object",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let uploadPath;
    let q;
    if (!obj.file) {
      let o = JSON.stringify(obj.obj);
      q = `insert into assignments \
        (classid, teacherid, assignmentname, obj) \
         values (${obj.classid}, ${obj.teacherid}, '${obj.assignmentname}', ${o})`;
    } else {
      obj.file = `${obj.assignmentname}`;

      q = `insert into assignments \
        (classid, teacherid, assignmentname, [file]) \
         values (${obj.classid}, ${obj.teacherid}, '${obj.assignmentname}', '${obj.file}'); \
        select * FROM assignments where assignments.assignmentID = SCOPE_IDENTITY(); `;
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
          let assId = data.recordset[0].assignmentId;
          return res.json({
            status: 200,
            success: true,
            message: "Added assignment...",
            uploadId: assId,
            uploadType: "assignments",
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
//-- Mark an assignment, update mark
//--Updates a student_assignment, single row
let markAssignment = (req, res) => {
  console.log("Teacher : Marking student assignment...");
  //Expects student_assignmentid and mark
  let obj = req.body;
  if (!obj.student_assignmentid || !obj.mark) {
    res.send({
      err: "Missing a parameter, expects student assignment id and mark",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let q = `update student_assignments \
      set student_assignments.mark = ${obj.mark} \
      where student_assignments.assignmentId = ${obj.student_assignmentid}`;
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
            message: "Added mark to student submission...",
          });
        } else {
          return res.json({
            status: 400,
            success: false,
            message: "Failed to add mark...",
          });
        }
      }
    });
  }
};

//-- comment on an assignment, update comment field
//--Updates a student_assignment, single row
let commentAssignment = (req, res) => {
  console.log("Teacher : Commenting on student assignment...");
  //Expects student_assignmentid and comment
  let obj = req.body;
  if (!obj.student_assignmentid || !obj.comment) {
    res.send({
      err: "Missing a parameter, expects student assignment id and comment",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let q = `update student_assignments \
      set student_assignments.comment = ${obj.comment} \
      where student_assignments.assignmentId = ${obj.student_assignmentid}`;
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
            message: "Added comment to student submission...",
          });
        } else {
          return res.json({
            status: 400,
            success: false,
            message: "Failed to add comment...",
          });
        }
      }
    });
  }
};
//-- Create new reminder for classes in a list
let newReminder = async (req, res) => {
  console.log("Teacher : creating new reminder..."); //dev
  //Expects teacherid, enddate(**/**/****), classes(json->array of broadcast classes)
  // , title and messege
  let obj = req.body;
  if (!obj.enddate || !obj.classid || !obj.teacherid) {
    res.send({
      err:
        "Missing a parameter, expects classid, title, teacherid on request object",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let q = `insert into reminders \
        (classid, teacherid, title, message, enddate) \
         values (${obj.classid}, ${obj.teacherid}, '${obj.title}', '${obj.message}', '${obj.enddate}')`;
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
            message: "Added reminder...",
          });
        } else {
          return res.json({
            status: 400,
            success: false,
            message: "Failed to add reminder...",
          });
        }
      }
    });
  }
};

//-- Create new message
let newMsg = async (req, res) => {
  console.log("Teacher : creating new reminder..."); //dev
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
            message: "Added reminder...",
          });
        } else {
          return res.json({
            status: 400,
            success: false,
            message: "Failed to add reminder...",
          });
        }
      }
    });
  }
};
//--Gets all messages for a teacher
let getMsgs = (req, res) => {
  console.log("Teacher : Getting all messages...");
  //Expects teacherid
  if (!req.params.id) {
    res.send({
      err: "Missing a parameter, expects teacherid",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let p = req.params.id;
    let q = `select * \
      from messages \
      where messages.teacherid = ${p}`;
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
            message: "Teacher messages not found",
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
// get all classes for a teacher
let getClasses = (req, res) => {
  console.log("Teacher : Getting all classes...");
  //Expects teacherid
  if (!req.params.id) {
    res.send({
      err: "Missing a parameter, expects teacherid",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let p = req.params.id;
    let q = `select * \
      from classes \
      where classes.teacherid = ${p}`;
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
            message: "Teacher classes not found",
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
//Get all students in a class
let getStudents = (req, res) => {
  console.log("Teacher : Getting all students in a class...");
  //Expects classid
  if (!req.params.id) {
    res.send({
      err: "Missing a parameter, expects classid",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let p = req.params.id;
    let q = `select * from students where students.studentId in \
      (select class_students.studentid from class_students \
      where class_students.classid = ${p});`;
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
            message: "Class students not found",
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
// Get all submissions for an assignment
let getSubmissions = (req, res) => {
  console.log("Teacher : Getting all assignment submissions in a class...");
  //Expects assignmentid
  if (!req.params.id) {
    res.send({
      err: "Missing a parameter, expects assignmentid",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let p = req.params.id;
    let q = `select * from student_assignments \
    where student_assignments.assignmentId = ${p}`;
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
            message: "Assignment submissions not found",
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
  newCourseMaterial: newCourseMaterialv2,
  getCourseMaterial: getCourseMaterial,
  getCourseMaterials: getCourseMaterials,
  newAssignment: newAssignment,
  getAssignment: getAssignment,
  getAssignments: getAssignments,
  newReminder: newReminder,
  markAssignment: markAssignment,
  commentAssignment: commentAssignment,
  newMsg: newMsg,
  getMsgs: getMsgs,
  getClasses: getClasses,
  getStudents: getStudents,
  getSubmissions: getSubmissions,
  getCourseMaterialByTag: getCourseMaterialByTag,
  updateCourseMaterialTag: updateCourseMaterialTag,
};
