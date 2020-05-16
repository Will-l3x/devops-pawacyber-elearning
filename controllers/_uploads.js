let sql = require("mssql");
let upload = async (req, res) => {
  let obj = req.body;
  console.log(obj); //dev
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
            console.log(data.recordset);
            //get the file path
            let fpath = data.recordset[0].file;
            console.log(req.files);
            //for postman, it doesn't name the <input/> element...
            let tempFile = req.files[""];
            //Name of frontend <input/> element should be 'name="fileUpload"'
            // let tempFile = req.files.fileUpload;
            console.log(tempFile); //dev
            let finalPath = base + fpath + tempFile.name;
            console.log(finalPath); //dev
            tempFile.mv(finalPath, function (err) {
              if (err) {
                return res.status(500).send({
                  success: false,
                  message: "File upload error...",
                  error: err.message,
                });
              } else {
                return res.status(200).send({
                  success: true,
                  message: "File upload successful...",
                });
              }
            });
          }
        }
      });
    }
  }
};
module.exports = {
  upload: upload,
};
