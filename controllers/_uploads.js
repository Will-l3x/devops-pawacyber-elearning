let sql = require("mssql");
let upload = async (req, res) => {
  //For swaggerui
  let obj = JSON.parse(req.body.exForm);
  //Name the object in the formData body exForm
  if (!obj.uploadId || !obj.uploadType) {
    return res.status(400).send({
      success: false,
      message: "Missing uploadId or uploadType",
    });
  } else {
    //Check if file object on req is not null
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({
        success: false,
        message: "No file on request object...",
      });
    } else {
      //basepath
      let base = `${__dirname}/..`;
      let tableIdString;
      if (obj.uploadType == "materials") {
        tableIdString = "materials.mID";
      } else if (obj.uploadType == "assignments") {
        tableIdString = "assignments.assignmentID";
      } else if (obj.uploadType == "student_assignments") {
        tableIdString = "student_assignments.assignmentID";
      } else if (obj.uploadType == "shared_materials") {
        tableIdString = "shared_materials.sharedMaterialID";
      } else if (obj.uploadType == "syllabi") {
        tableIdString = "syllabi.syllabusID";
      } else {
        return res.status(400).send({
          success: false,
          message: "Unknown uploadType...",
        });
      }
      //get upload path
      let q = `select * from ${obj.uploadType} \
        where ${tableIdString} = ${obj.uploadId}`;
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
              message: "Item not found",
            });
          } else {
            //get the file path
            let fpath = data.recordset[0].file;
            //for postman, it doesn't name the <input/> element...
            //let tempFile = req.files[""];
            //Name of frontend <input/> element should be 'name="fileUpload"'
            let tempFile = req.files.fileUpload;
            console.log(tempFile); //dev
            let finalPath = base + fpath + tempFile.name;
            let downloadEndpoint = fpath + tempFile.name;
            console.log(finalPath); //dev
            tempFile.mv(finalPath, function (err) {
              if (err) {
                return res.status(500).send({
                  success: false,
                  message: "File upload error...",
                  error: err.message,
                });
              } else {
                // update download endpoint on record
                let q = `update ${obj.uploadType} \
                set ${obj.uploadType}.[file] = '${downloadEndpoint}' \
                where ${tableIdString} = ${obj.uploadId}`;
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
                      return res.json({
                        status: 200,
                        success: true,
                        message:
                          "File upload successful, and file path has been updated",
                      });
                    } else {
                      return res.json({
                        status: 400,
                        success: false,
                        message:
                          "Failed to update file path, but document has been saved...",
                      });
                    }
                  }
                });
              }
            });
          }
        }
      });
    }
  }
};




let multiUpload = async (req, res) => {
  //For swaggerui
  //let obj = JSON.parse(req.body.exForm);
  //Name the object in the formData body exForm
  //if (!obj) {
    //return res.status(400).send({
      //success: false,
      //message: "Missing formData Body...",
    //});
  //} else {
    //Check if file object on req is not null
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({
        success: false,
        message: "No files on request object...",
      });
    }else{//basepath
      let base = `${__dirname}/..`;
      let tableIdString;
      tableIdString = "shared_materials.sharedMaterialID";
      let ms_req = new sql.Request();
      //get upload path
            //get the file path
            let fpath = '/uploads/shared/'
            //Name of frontend <input/> element should be 'name="fileUpload"'
            console.log(req.files);
            let tempFile = req.files.file;
            console.log(tempFile); //dev
            let finalPath = base + fpath + tempFile.name;
            let downloadEndpoint = fpath + tempFile.name;
            console.log(finalPath); //dev
            tempFile.mv(finalPath, function (err) {
              if (err) {
                return res.status(500).send({
                  success: false,
                  message: "File upload error...",
                  error: err.message,
                });
              } else {
                // update download endpoint on record       
        let q = `insert into [shared_materials] \
        ([name], materialtype, [file]) \
         values ('uncategorized', 'shared_material', '${downloadEndpoint}'); \
         select * FROM [shared_materials] where shared_materials.sharedMaterialID = SCOPE_IDENTITY();`;
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
                      return res.json({
                        status: 200,
                        success: true,
                        message:
                          "File upload successful, and file path has been updated",
                      });
                    } else {
                      return res.json({
                        status: 400,
                        success: false,
                        message:
                          "Failed to update file path, but document has been saved...",
                      });
                    }
              }
            });
          }
      });
    }
  //}
};

module.exports = {
  upload: upload,
  multiUpload: multiUpload,
};
