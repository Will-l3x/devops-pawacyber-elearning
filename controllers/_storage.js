let sql = require("mssql");
const stream = require('stream');
const { BlobServiceClient, AbortController } = require("@azure/storage-blob");


var containerNames = ["materials", "student-assignments", "assignments", "shared-materials", "syllabi"];
var activeContainers = [];
var doneContainerSearch = false;
var containerName;
var containerClient;
var blobServiceClient;

let storageInit = async () => {
  const STORAGE_CONNECTION_STRING =
    process.env.STORAGE_CONNECTION_STRING ||
    "DefaultEndpointsProtocol=https;AccountName=cyberschool;AccountKey=+kr0Nc7mnIuBd9lm1pWO+HxN5QRewoskrGPnExkgunq8xqi52Ay8qQZ963IFVqxr5+bQpDNVPUcpaD2AlxwjrA==;EndpointSuffix=core.windows.net";
  blobServiceClient = BlobServiceClient.fromConnectionString(
    STORAGE_CONNECTION_STRING
  );
  let i = 1;
  let iter = blobServiceClient.listContainers();
  let containerItem = await iter.next();
  while (!containerItem.done) {
    console.log(`Container ${i++}: ${containerItem.value.name}`);
    activeContainers.push(containerItem.value.name)
    containerItem = await iter.next();
  }
  if(containerItem.done){
    containerNames.forEach(async name => {
      if(!activeContainers.includes(name)){
        containerClient = blobServiceClient.getContainerClient(name);
        const createContainerResponse = await containerClient.create();
        console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);
      }
    })
  }
};
const getBlobName = (originalName, uploadId) => {
  return `${uploadId}-${originalName}`;
};





let upload = async (req, res) => {
  console.log(req)
  let obj;
  if(!req.body.exForm){
    obj = req.body;
    console.log(obj)
  }else{
    obj = JSON.parse(req.body.exForm);
  }

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
      let tableIdString;
      if (obj.uploadType == "materials") {
        tableIdString = "materials.mID";
        containerName = "materials";
        containerClient = blobServiceClient.getContainerClient(
          containerName
        );
        
      } else if (obj.uploadType == "assignments") {
        tableIdString = "assignments.assignmentID";
        containerName = "assignments";
        containerClient = blobServiceClient.getContainerClient(
          containerName
        );
      } else if (obj.uploadType == "student_assignments") {
        tableIdString = "student_assignments.assignmentID";
        containerName = "student-assignments";
        containerClient = blobServiceClient.getContainerClient(
          containerName
        );
      } else if (obj.uploadType == "shared_materials") {
        tableIdString = "shared_materials.sharedMaterialID";
        containerName = "shared-materials";
        containerClient = blobServiceClient.getContainerClient(
          containerName
        );
      } else if (obj.uploadType == "syllabi") {
        tableIdString = "syllabi.syllabusID";
        containerName = "syllabi";
        containerClient = blobServiceClient.getContainerClient(
          containerName
        );
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
            let tempFile;
            if(!req.files.fileUpload){
              tempFile = req.files[""];
            }else{
              tempFile = req.files.fileUpload;
            }
            
            var blobName = getBlobName(tempFile.name, obj.uploadId);
            var blobData = tempFile.data;
            var blobEncoding = tempFile.encoding;
            var blobMimeType = tempFile.mimetype;

            // Get a block blob client
            let blockBlobClient = containerClient.getBlockBlobClient(blobName);
            const uploadBlob = async () => {
              try{

              const uploadBlobResponse = await blockBlobClient.upload(blobData, blobData.length);
              console.log("Blob was uploaded successfully. RequestId : ", uploadBlobResponse.requestId);
              // update download endpoint on record
              let q = `update ${obj.uploadType} \
              set ${obj.uploadType}.[file] = '${containerName}, ${blobName}, ${blobEncoding}, ${blobMimeType}' \
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

            }catch(err){

              return res.status(500).send({
                    success: false,
                    message: "File upload error...",
                    error: err.message,
                  });

            }
            
            
            //console.log(tempFile); //dev
            console.log(blobName);
            console.log(blobData);

            }

            uploadBlob();
            


          }
        }
      });
    }
  }
};

let multiUpload = async (req, res) => {

if (!obj.uploadType) {
    return res.status(400).send({
      success: false,
      message: "Missing uploadType...",
    });
  } else {

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({
      success: false,
      message: "No files on request object...",
    });
  } else {
      let tableIdString;
      if (obj.uploadType == "materials") {
        tableIdString = "materials.mID";
        containerName = "materials";
        containerClient = blobServiceClient.getContainerClient(
          containerName
        );
        
      } else if (obj.uploadType == "assignments") {
        tableIdString = "assignments.assignmentID";
        containerName = "assignments";
        containerClient = blobServiceClient.getContainerClient(
          containerName
        );
      } else if (obj.uploadType == "student_assignments") {
        tableIdString = "student_assignments.assignmentID";
        containerName = "student-assignments";
        containerClient = blobServiceClient.getContainerClient(
          containerName
        );
      } else if (obj.uploadType == "shared_materials") {
        tableIdString = "shared_materials.sharedMaterialID";
        containerName = "shared-materials";
        containerClient = blobServiceClient.getContainerClient(
          containerName
        );
      } else if (obj.uploadType == "syllabi") {
        tableIdString = "syllabi.syllabusID";
        containerName = "syllabi";
        containerClient = blobServiceClient.getContainerClient(
          containerName
        );
      } else {
        return res.status(400).send({
          success: false,
          message: "Unknown uploadType...",
        });
      }
  }
}
};


let download = async (req, res) => {
  //const aborter = Aborter.timeout(30 * 60000);
  //console.log(Aborter)
  if (!req.body.file) {
    return res.status(400).send({
      success: false,
      message: "File field missing in body...",
    });
  } else {
    let blobString = req.body.file;
    let r = blobString.split(",");
    let container = r[0].trim();
    let name = r[1].trim();
    let encoding = r[2].trim();
    let mimetype = r[3].trim();
    console.log(name);

    containerClient = blobServiceClient.getContainerClient(
          container
        );
    let blockBlobClient = containerClient.getBlockBlobClient(name);
    for await (const blob of containerClient.listBlobsFlat()) {
      console.log(blob.name);
    }
    try{
      const downloadBlockBlobResponse = await blockBlobClient.download(0);
      console.log(downloadBlockBlobResponse)
      console.log('\nDownloaded blob content...');
      
      let fileContents = downloadBlockBlobResponse.readableStreamBody;
      //fileContents.setEncoding(encoding);
    
      //var readStream = new stream.PassThrough();
      //readStream.end(fileContents);

      res.set('Content-disposition', 'attachment; filename=' + name);
      res.set('Content-Type', mimetype);

      fileContents.on('data', (data) => {
        res.write(data);
       });
      fileContents.on('end', (data) => {
          res.status(200).send();
      });

      //fileContents.pipe(res);


    } catch(err) {
      if(err) console.log(err);
       return res.status(400).send({
          success: false,
          message: "File not found...",
          err: err
        });
    }
    
  }
};

module.exports = {
  upload: upload,
  download: download,
  multiUpload: multiUpload,
  storageInit: storageInit,
};
