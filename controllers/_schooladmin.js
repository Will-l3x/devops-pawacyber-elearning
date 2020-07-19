let sql = require("mssql");
let fs = require("fs");
let nodemailer = require("nodemailer");
let moment = require("moment");
let packages = require("../providers/packages.js");
let syllabi = require("../providers/syllabi.js")();

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

  request.query(query_teacher, (err, recordset) => {
    if (err) {
      console.log(err);
      return res.json({
        status: 500,
        success: false,
        message: "An error occured",
        error: err.message,
      });
    } else {
      teacher = recordset.recordset;

      request.query(query_classes, function (err, recordset) {
        if (err) {
          console.log(err);
          return res.json({
            status: 500,
            success: false,
            message: "An error occured",
            error: err.message,
          });
        } else {
          classes = recordset.recordset;

          return res.json({
            status: 200,
            success: true,
            data: JSON.parse(JSON.stringify({ teacher, classes })),
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
        error: err.message,
      });
    } else {
      return res.json({
        status: 200,
        success: true,
        data: JSON.parse(JSON.stringify({ teachers })),
      });
    }
  });
};

let add_teacher = (req, res) => {
  let schoolid = req.body.schoolid;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let userid = req.body.userid;
  let datejoined = moment().format("YYYY-MM-DD");

  var query = `insert into [teachers] \
    (schoolid, firstname, lastname, userid,datejoined) \
    values(${schoolid}, ${firstname}, ${lastname}, ${userid}, ${datejoined}); \
    select * from teachers where teachers.teacherId = SCOPE_IDENTITY(); `;

  request.query(query, function (err, recordset) {
    let teacher = recordset.recordset;
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
        data: JSON.parse(JSON.stringify({ teacher })),
      });
    }
  });
};

let del_teacher = (req, res) => {
  var id = req.params.id;
  var query = `delete from [teachers] where teacherId= ${id}`;

  request.query(query, function (err, recordset) {
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
        message: "Deleted",
      });
    }
  });
};

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

  request.query(query, function (err, recordset) {
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
      if (recordset.rowsAffected[0] > 0) {
        return res.json({
          status: 202,
          success: true,
          message: "Updated",
        });
      } else {
        return res.json({
          status: 400,
          success: false,
          message: "Failed to update",
        });
      }
    }
  });
};

/*-------------------------------------------------------------------------------------*/
/*classes------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------*/
let get_class = (req, res) => {
  let classid = req.params.id;

  let query = `select * from [classes] \
    where classId = ${classid}`;

  let request = new sql.Request();

  request.query(query, (err, recordset) => {
    let _class = recordset.recordset;
    if (err) {
      console.log(err);
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
        data: JSON.parse(JSON.stringify({ _class })),
      });
    }
  });
};

let get_classes = (req, res) => {
  let schoolid = req.params.id;
  let query = `select * from [classes]\
    where classes.teacherid\
    in (select teachers.teacherid from [teachers] where teachers.schoolid = ${schoolid});`;
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

let add_class = (req, res) => {
  let teacherid = req.body.teacherid;
  let classname = req.body.classname;
  let createdby = req.body.createdby;
  let status = req.body.status;
  let grade = req.body.grade;
  let schoolid = req.body.schoolid;
  let createdon = moment().format("YYYY-MM-DD");
  let enrolmentkey;

  var query = `insert into [classes] \
    (teacherid, classname, createdby, createdon, status, grade) \
    values(${teacherid}, '${classname}', ${createdby}, ${createdon}, '${status}', ${grade}); \
    select * from classes where classes.classId = SCOPE_IDENTITY(); `;

  let request = new sql.Request();

  request.query(query, function (err, recordset) {
    console.log(recordset.recordset);

    let _class;
    if (recordset.recordset == null || recordset.recordset == undefined) {
      _class = {};
    } else {
      _class = recordset.recordset;
    }
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
        data: JSON.parse(JSON.stringify({ _class })),
      });
    }
  });
};

let del_class = (req, res) => {
  var id = req.params.id;
  var query = `delete from [classes] where classId= ${id}`;

  request.query(query, function (err, recordset) {
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
        message: "Deleted",
      });
    }
  });
};

let update_class = (req, res) => {
  let teacherid = req.body.teacherId;
  let classid = req.body.classid;
  let classname = req.body.classname;
  let status = req.body.status;
  let enrolmentkey = req.body.enrolmentkey;

  let query = `UPDATE [classes] \
    SET teacherid=${teacherid} \
    SET classname='${classname}' \
    SET status='${status}' \
    SET enrolmentkey='${enrolmentkey}' \
    WHERE classId = ${classid}`;

  var request = new sql.Request();

  request.query(query, function (err, recordset) {
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
      if (recordset.rowsAffected[0] > 0) {
        return res.json({
          status: 202,
          success: true,
          message: "Updated",
        });
      } else {
        return res.json({
          status: 400,
          success: false,
          message: "Failed to update",
        });
      }
    }
  });
};

/*-------------------------------------------------------------------------------------*/
/*students------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------*/
let student = (req, res) => {
  let studentid = req.params.id;

  let query = `select * from [students] \
    where studentId = ${studentid}`;

  var request = new sql.Request();

  request.query(query, (err, recordset) => {
    if (err) {
      console.log(err);
      return res.json({
        status: 500,
        success: false,
        message: "An error occured",
        error: err.message,
      });
    } else {
      student = recordset.recordset;

      return res.json({
        status: 200,
        success: true,
        data: JSON.parse(JSON.stringify({ student })),
      });
    }
  });
};

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
        error: err.message,
      });
    } else {
      return res.json({
        status: 200,
        success: true,
        data: JSON.parse(JSON.stringify({ students })),
      });
    }
  });
};

let add_student = (req, res) => {
  let schoolid = req.body.schoolid;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let userid = req.body.userid;
  let dob = req.body.dob;
  let enrolmentkey = req.body.enrolmentkey;
  let datejoined = moment().format("YYYY-MM-DD");

  var query = `insert into [students] \
    (schoolid, firstname, lastname, userid, dob, enrolmentkey, datejoined) \
    values(${schoolid}, '${firstname}', '${lastname}', ${userid}, ${dob}, '${enrolmentkey}', ${datejoined}); \
    select * from students where students.studentId = SCOPE_IDENTITY(); `;

  request.query(query, function (err, recordset) {
    let student = recordset.recordset;
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
        data: JSON.parse(JSON.stringify({ student })),
      });
    }
  });
};

let del_student = (req, res) => {
  var id = req.params.id;
  var query = `delete from [students] where studentId= ${id}`;

  request.query(query, function (err, recordset) {
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
        message: "Deleted",
      });
    }
  });
};

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
    SET firstname='${firstname}' \
    SET lastname='${lastname}' \
    SET userid=${userid} \
    SET enrolmentkey='${enrolmentkey}' \
    SET dob=${dob} \
    WHERE studentId = ${studentid}`;

  var request = new sql.Request();

  request.query(query, function (err, recordset) {
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
      if (recordset.rowsAffected[0] > 0) {
        return res.json({
          status: 202,
          success: true,
          message: "Updated",
        });
      } else {
        return res.json({
          status: 400,
          success: false,
          message: "Failed to update",
        });
      }
    }
  });
};
//This is supposed to run as a cron job or whatever
//or if custom packages become a feature
let add_packages = (req, res) => {
  console.log("School Admin : Init Packages");
  packages.forEach((package) => {
    console.log(package);
    let query = `insert into [school_packages] \
    (educationlevel, mingrade, maxgrade, numberofsubjects) \
    values('${package.educationlevel}', ${package.mingrade}, ${package.maxgrade}, ${package.numberofsubjects});`;
    let request = new sql.Request();

    request.query(query, function (err, recordset) {
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
        console.log("Package added...");
      }
    });
  });

  return res.json({
    status: 200,
    success: true,
    message: "Added default packages...",
  });
};

let get_packages = (req, res) => {
  let query = `select * from [school_packages]`;
  let request = new sql.Request();

  request.query(query, function (err, recordset) {
    let packages = recordset.recordset;
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
        data: JSON.parse(JSON.stringify({ packages })),
      });
    }
  });
};

let activate_package = (req, res) => {
  let schoolid = req.body.schoolid;
  let packageid = req.body.packageid;

  var query = `insert into [school_active_packages] \
    (schoolid, packageid) \
    values(${schoolid}, ${packageid}); \
    select * from school_active_packages \
    where school_active_packages.sapId = SCOPE_IDENTITY(); `;

  request.query(query, function (err, recordset) {
    let activatedPackage = recordset.recordset;
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
        data: JSON.parse(JSON.stringify({ activatedPackage })),
      });
    }
  });
};

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
/*-------------------------------------------------------------------------------------*/
/*Global Materials---------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------*/
//Get shared materials by shared class
let shared_materials_class = (req, res) => {
  let classid = req.params.id;

  let query = `select * from [shared_materials] \
    where classid = ${classid}`;

  var request = new sql.Request();

  request.query(query, (err, recordset) => {
    if (err) {
      console.log(err);
      return res.json({
        status: 500,
        success: false,
        message: "An error occured",
        error: err.message,
      });
    } else {
      let materials = recordset.recordset;

      return res.json({
        status: 200,
        success: true,
        data: JSON.parse(JSON.stringify({ materials })),
      });
    }
  });
};
//Get all shared materials by topic
let shared_materials_topic = (req, res) => {
  let topicid = req.params.id;

  let query = `select * from [shared_materials] \
    where topicid = ${topicid}`;

  var request = new sql.Request();

  request.query(query, (err, recordset) => {
    if (err) {
      console.log(err);
      return res.json({
        status: 500,
        success: false,
        message: "An error occured",
        error: err.message,
      });
    } else {
      let materials = recordset.recordset;

      return res.json({
        status: 200,
        success: true,
        data: JSON.parse(JSON.stringify({ materials })),
      });
    }
  });
};
//Get all shared materials by topic and class
let shared_materials = (req, res) => {
  let topicid = req.body.topicid;
  let classid = req.body.classid;

  let query = `select * from [shared_materials] \
    where topicid = ${topicid} and classid = ${classid}`;

  var request = new sql.Request();

  request.query(query, (err, recordset) => {
    if (err) {
      console.log(err);
      return res.json({
        status: 500,
        success: false,
        message: "An error occured",
        error: err.message,
      });
    } else {
      let materials = recordset.recordset;

      return res.json({
        status: 200,
        success: true,
        data: JSON.parse(JSON.stringify({ materials })),
      });
    }
  });
};
//Get all shared materials topics by classid
let shared_topics = (req, res) => {
  let classid = req.params.id;

  let query = `select * from [shared_topics] \
    where classid = ${classid}`;

  var request = new sql.Request();

  request.query(query, (err, recordset) => {
    if (err) {
      console.log(err);
      return res.json({
        status: 500,
        success: false,
        message: "An error occured",
        error: err.message,
      });
    } else {
      let topics = recordset.recordset;

      return res.json({
        status: 200,
        success: true,
        data: JSON.parse(JSON.stringify({ topics })),
      });
    }
  });
};
//Get all shared classes by grade
let shared_classes = (req, res) => {
  let grade = req.body.grade;

  let query = `select * from [shared_classes] \
    where grade = ${grade}`;

  let request = new sql.Request();

  request.query(query, (err, recordset) => {
    if (err) {
      console.log(err);
      return res.json({
        status: 500,
        success: false,
        message: "An error occured",
        error: err.message,
      });
    } else {
      let classes = recordset.recordset;

      return res.json({
        status: 200,
        success: true,
        data: JSON.parse(JSON.stringify({ classes })),
      });
    }
  });
};
//Get all shared classes with cover
let get_shared_classes_with_cover = (req, res) => {
  let query = `select * from [shared_classes] \
    where grade = ${grade}`;

  let request = new sql.Request();

  request.query(query, (err, recordset) => {
    if (err) {
      console.log(err);
      return res.json({
        status: 500,
        success: false,
        message: "An error occured",
        error: err.message,
      });
    } else {
      let classes = recordset.recordset;
      let classesWithCover = [];
      let classesLen = classes.length;
      let count = 0;
      classes.forEach((classObj) => {
        count++;
        let q = `select * from [shared_materials]\
        where shared_materials.classid = ${classObj.classid}\
        and shared_materials.name = 'Cover'`;
        request.query(q, (err, recordset) => {
          if (err) {
            console.log(err);

            return res.json({
              status: 500,
              success: false,
              message: "An error occured",
              error: err.message,
            });
          } else {
            let cover = recordset.recordset;
            classObj.cover = cover;
            classesWithCover.push(classObj);
            if (count == classesLen) {
              return res.json({
                status: 200,
                success: true,
                data: JSON.parse(JSON.stringify({ classesWithCover })),
              });
            }
          }
        });
      });
    }
  });
};
//Get all shared classes
let all_shared_classes = (req, res) => {
  let query = `select * from [shared_classes]`;

  let request = new sql.Request();

  request.query(query, (err, recordset) => {
    if (err) {
      console.log(err);
      return res.json({
        status: 500,
        success: false,
        message: "An error occured",
        error: err.message,
      });
    } else {
      let classes = recordset.recordset;

      return res.json({
        status: 200,
        success: true,
        data: JSON.parse(JSON.stringify({ classes })),
      });
    }
  });
};
//Create new shared class
let add_shared_class = (req, res) => {
  let name = req.body.name;
  let description = req.body.description;
  let grade = req.body.grade;

  var query = `insert into [shared_classes] \
    (name, description, grade) \
    values('${name}', '${description}', ${grade}); \
    select * from [shared_classes] where shared_classes.classId = SCOPE_IDENTITY(); `;

  let request = new sql.Request();

  request.query(query, function (err, recordset) {
    let shared_class = recordset.recordset;
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
        data: JSON.parse(JSON.stringify({ shared_class })),
      });
    }
  });
};
//Create new shared class cover pic
let add_shared_class_cover = (req, res) => {
  console.log("Admin : creating new shared class cover...");
  //Expects teacherid, classid, materialname, schoolid and a json object containing material/file name
  let obj = req.body;

  if (!obj.classid) {
    res.send({
      err: "Missing a parameter, expects classid or topicid on request object",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let uploadPath;
    let q;
    let o = JSON.stringify(obj.obj);
    obj.materialtype = "shared_materials";

    uploadPath = `${__dirname}/../uploads/shared/${obj.classid}/`;
    obj.file = `/uploads/shared/${obj.classid}/`;
    obj.name = "Cover";
    console.log("Checking upload path..."); //dev
    if (!fs.existsSync(uploadPath)) {
      console.log("Creating upload path..."); //dev
      console.log(uploadPath); //dev
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    q = `insert into [shared_materials] \
        (classid, topicid, name, materialtype, [file], obj, description) \
         values (${obj.classid},'${obj.name}', '${obj.materialtype}', '${obj.file}'); \
         select * FROM [shared_materials] where shared_materials.sharedMaterialID = SCOPE_IDENTITY();`;

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
          let sharedMaterialId = data.recordset[0].sharedMaterialId;
          return res.json({
            status: 200,
            success: true,
            message: "Added shared material...",
            uploadId: sharedMaterialId,
            uploadType: "shared_materials",
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
//Create new topic for class
let add_shared_topic = (req, res) => {
  let name = req.body.name;
  let description = req.body.description;
  let classid = req.body.classid;

  var query = `insert into [shared_topics] \
    (name, description, classid) \
    values('${name}', '${description}', ${classid}); \
    select * from [shared_topics] where shared_topics.topicId = SCOPE_IDENTITY(); `;

  let request = new sql.Request();

  request.query(query, function (err, recordset) {
    let shared_topic = recordset.recordset;
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
        data: JSON.parse(JSON.stringify({ shared_topic })),
      });
    }
  });
};
//Create new material for class/topic
let add_shared_material = (req, res) => {
  console.log("Admin : creating new shared material...");
  //Expects teacherid, classid, materialname, schoolid and a json object containing material/file name
  let obj = req.body;

  if (!obj.topicid && !obj.classid) {
    res.send({
      err: "Missing a parameter, expects classid or topicid on request object",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let uploadPath;
    let q;
    let o = JSON.stringify(obj.obj);
    obj.materialtype = "shared_materials";

    uploadPath = `${__dirname}/../uploads/shared/${obj.classid}/${obj.topicid}/`;
    obj.file = `/uploads/shared/${obj.classid}/${obj.topicid}/`;
    console.log("Checking upload path..."); //dev
    if (!fs.existsSync(uploadPath)) {
      console.log("Creating upload path..."); //dev
      console.log(uploadPath); //dev
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    if (!obj.topicid) {
      q = `insert into [shared_materials] \
        (classid, name, materialtype, [file], obj, description) \
         values (${obj.classid}, '${obj.name}', '${obj.materialtype}', '${obj.file}', '${o}', '${obj.description}'); \
         select * FROM [shared_materials] where shared_materials.sharedMaterialID = SCOPE_IDENTITY();`;
    } else if (!obj.classid) {
      q = `insert into [shared_materials] \
        (topicid, name, materialtype, [file], obj, description) \
         values (${obj.topicid}, '${obj.name}', '${obj.materialtype}', '${obj.file}', '${o}', '${obj.description}'); \
         select * FROM [shared_materials] where shared_materials.sharedMaterialID = SCOPE_IDENTITY();`;
    } else {
      q = `insert into [shared_materials] \
        (classid, topicid, name, materialtype, [file], obj, description) \
         values (${obj.classid}, ${obj.topicid}, '${obj.name}', '${obj.materialtype}', '${obj.file}', '${o}', '${obj.description}'); \
         select * FROM [shared_materials] where shared_materials.sharedMaterialID = SCOPE_IDENTITY();`;
    }

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
          let sharedMaterialId = data.recordset[0].sharedMaterialId;
          return res.json({
            status: 200,
            success: true,
            message: "Added shared material...",
            uploadId: sharedMaterialId,
            uploadType: "shared_materials",
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
/*-------------------------------------------------------------------------------------*/
/*Syllabi---------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------*/
//This is supposed to run as a cron job or whatever
let add_syllabi = (req, res) => {
  console.log("School Admin : Init Syllabi");

  syllabi.jp.forEach((syllabus) => {
    syllabus = "/syllabi/jp/" + syllabus;
    console.log(syllabus);
    let query = `insert into [syllabi] \
    ([file]) \
    values('${syllabus}');`;
    let request = new sql.Request();

    request.query(query, function (err, recordset) {
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
        console.log("syllabus added...");
      }
    });
  });

  syllabi.js.forEach((syllabus) => {
    syllabus = "/syllabi/js/" + syllabus;
    console.log(syllabus);
    let query = `insert into [syllabi] \
    ([file]) \
    values('${syllabus}');`;
    let request = new sql.Request();

    request.query(query, function (err, recordset) {
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
        console.log("Package added...");
      }
    });
  });

  syllabi.ss.forEach((syllabus) => {
    syllabus = "/syllabi/ss/" + syllabus;
    console.log(syllabus);
    let query = `insert into [syllabi] \
    ([file]) \
    values('${syllabus}');`;
    let request = new sql.Request();

    request.query(query, function (err, recordset) {
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
        console.log("Package added...");
      }
    });
  });

  return res.json({
    status: 200,
    success: true,
    message: "Added default syllabi...",
  });
};
//Get all syllabi
let get_syllabi = (req, res) => {
  let query = `select * from [syllabi]`;

  var request = new sql.Request();

  request.query(query, (err, recordset) => {
    if (err) {
      console.log(err);
      return res.json({
        status: 500,
        success: false,
        message: "An error occured",
        error: err.message,
      });
    } else {
      let syllabi = recordset.recordset;

      return res.json({
        status: 200,
        success: true,
        data: JSON.parse(JSON.stringify({ syllabi })),
      });
    }
  });
};
//Get syllabus by id
let syllabus = (req, res) => {
  let syllabusid = req.params.id;

  let query = `select * from [syllabi] \
    where syllabusId = ${syllabusid}`;

  var request = new sql.Request();

  request.query(query, (err, recordset) => {
    if (err) {
      console.log(err);
      return res.json({
        status: 500,
        success: false,
        message: "An error occured",
        error: err.message,
      });
    } else {
      let syllabus = recordset.recordset;

      return res.json({
        status: 200,
        success: true,
        data: JSON.parse(JSON.stringify({ syllabus })),
      });
    }
  });
};
//Create new syllabus
let add_syllabus = (req, res) => {
  console.log("Admin : creating new syllabus...");
  let obj = req.body;

  if (!obj.grade || !obj.subject) {
    res.send({
      err: "Missing a parameter, expects grade and subject on request object",
    });
    console.log("Missing parameter..."); //dev
  } else {
    let q;
    obj.file = `/syllabi/`;
    q = `insert into [syllabi] \
        ([file], grade, subject) \
         values ('${obj.file}', '${obj.grade}', '${obj.subject}'); \
         select * FROM [syllabi] where syllabi.syllabusID = SCOPE_IDENTITY();`;

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
        if (data.rowsAffected[0] > 0) {
          let syllabusId = data.recordset[0].syllabusId;
          return res.json({
            status: 200,
            success: true,
            message: "Added syllabus...",
            uploadId: syllabusId,
            uploadType: "syllabi",
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
let del_syllabus = (req, res) => {
  var id = req.params.id;
  var query = `delete from [syllabi] where syllabusId= ${id}`;

  request.query(query, function (err, recordset) {
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
        message: "Deleted",
      });
    }
  });
};

let update_syllabus = (req, res) => {
  let syllabusid = req.body.syllabusId;
  let grade = req.body.grade;
  let subject = req.body.subject;

  let query = `UPDATE [syllabi] \
    SET grade=${grade} \
    SET subject='${subject}' \
    WHERE syllabusId = ${syllabusid}`;

  var request = new sql.Request();

  request.query(query, function (err, recordset) {
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
      if (recordset.rowsAffected[0] > 0) {
        return res.json({
          status: 202,
          success: true,
          message: "Updated",
        });
      } else {
        return res.json({
          status: 400,
          success: false,
          message: "Failed to update",
        });
      }
    }
  });
};
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
  add_packages,
  get_packages,
  activate_package,
  active_packages,
  add_shared_material,
  add_shared_topic,
  add_shared_class,
  add_shared_class_cover,
  get_shared_classes_with_cover,
  shared_classes,
  all_shared_classes,
  shared_topics,
  shared_materials,
  shared_materials_topic,
  shared_materials_class,
  add_syllabi,
  get_syllabi,
  syllabus,
  add_syllabus,
  del_syllabus,
  update_syllabus,
};
