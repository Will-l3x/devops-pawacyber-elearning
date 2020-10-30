let sql = require("mssql");
const {pipeline} = require("stream");
const fs = require("fs");
const path = require("path");
const {BlobServiceClient, AbortController} = require("@azure/storage-blob");

var containerNames = [
    "materials",
    "student-assignments",
    "assignments",
    "shared-materials",
    "syllabi",
];
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
        activeContainers.push(containerItem.value.name);
        containerItem = await iter.next();
    }
    if (containerItem.done) {
        containerNames.forEach(async (name) => {
            if (!activeContainers.includes(name)) {
                containerClient = blobServiceClient.getContainerClient(name);
                const createContainerResponse = await containerClient.create();
                console.log(
                    `Create container ${containerName} successfully`,
                    createContainerResponse.requestId
                );
            }
        });
    }
};
const getBlobName = (originalName, uploadId) => {
    return `${uploadId}-${originalName}`;
};

let upload = async (req, res) => {
    let obj;
    if (!req.body.exForm) {
        obj = req.body;
        console.log(obj);
    } else {
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
                containerClient = blobServiceClient.getContainerClient(containerName);
            } else if (obj.uploadType == "assignments") {
                tableIdString = "assignments.assignmentID";
                containerName = "assignments";
                containerClient = blobServiceClient.getContainerClient(containerName);
            } else if (obj.uploadType == "student_assignments") {
                tableIdString = "student_assignments.assignmentID";
                containerName = "student-assignments";
                containerClient = blobServiceClient.getContainerClient(containerName);
            } else if (obj.uploadType == "shared_materials") {
                tableIdString = "shared_materials.sharedMaterialID";
                containerName = "shared-materials";
                containerClient = blobServiceClient.getContainerClient(containerName);
            } else if (obj.uploadType == "syllabi") {
                tableIdString = "syllabi.syllabusID";
                containerName = "syllabi";
                containerClient = blobServiceClient.getContainerClient(containerName);
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
                        if (!req.files.fileUpload) {
                            tempFile = req.files[""];
                        } else {
                            tempFile = req.files.fileUpload;
                        }

                        let blobName = getBlobName(tempFile.name, obj.uploadId);
                        let blobData = tempFile.data;
                        let blobEncoding = tempFile.encoding;
                        let blobMimeType = tempFile.mimetype;

                        // Get a block blob client
                        let blockBlobClient = containerClient.getBlockBlobClient(blobName);
                        const uploadBlob = async () => {
                            try {
                                const uploadBlobResponse = await blockBlobClient.upload(
                                    blobData,
                                    blobData.length
                                );
                                console.log(
                                    "Blob was uploaded successfully. RequestId : ",
                                    uploadBlobResponse.requestId
                                );
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
                            } catch (err) {
                                return res.status(500).send({
                                    success: false,
                                    message: "File upload error...",
                                    error: err.message,
                                });
                            }

                            console.log(blobName);
                            console.log(blobData);
                        };

                        uploadBlob();
                    }
                }
            });
        }
    }
};

let multiUpload = async (req, res) => {
    let obj;
    if (!req.body.exForm) {
        obj = req.body;
        console.log(obj);
    } else {
        obj = JSON.parse(req.body.exForm);
    }

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
                containerClient = blobServiceClient.getContainerClient(containerName);
            } else if (obj.uploadType == "assignments") {
                tableIdString = "assignments.assignmentID";
                containerName = "assignments";
                containerClient = blobServiceClient.getContainerClient(containerName);
            } else if (obj.uploadType == "student_assignments") {
                tableIdString = "student_assignments.assignmentID";
                containerName = "student-assignments";
                containerClient = blobServiceClient.getContainerClient(containerName);
            } else if (obj.uploadType == "shared_materials") {
                tableIdString = "shared_materials.sharedMaterialID";
                containerName = "shared-materials";
                containerClient = blobServiceClient.getContainerClient(containerName);
            } else if (obj.uploadType == "syllabi") {
                tableIdString = "syllabi.syllabusID";
                containerName = "syllabi";
                containerClient = blobServiceClient.getContainerClient(containerName);
            } else {
                return res.status(400).send({
                    success: false,
                    message: "Unknown uploadType...",
                });
            }
            let fileCount = 0;
            let tempFiles;
            if (!req.files.fileUpload) {
                tempFiles = req.files[""];
            } else {
                tempFiles = req.files.fileUpload;
            }
            tempFiles.forEach(async (f) => {
                let tempFile = f;
                let blobName = getBlobName(
                    tempFile.name,
                    Math.floor(Math.random() * Math.floor(1000))
                );
                let blobData = tempFile.data;
                let blobEncoding = tempFile.encoding;
                let blobMimeType = tempFile.mimetype;
                // Get a block blob client
                let blockBlobClient = containerClient.getBlockBlobClient(blobName);
                const uploadBlob = async () => {
                    try {
                        const uploadBlobResponse = await blockBlobClient.upload(
                            blobData,
                            blobData.length
                        );
                        console.log(
                            "Blob was uploaded successfully. RequestId : ",
                            uploadBlobResponse.requestId
                        );
                        // update download endpoint on record
                        let q = `insert into ${obj.uploadType} \
              (materialname, [file]) \
              values('Uncategorized', '${containerName}, ${blobName}, ${blobEncoding}, ${blobMimeType}' ) \
              select * FROM ${obj.uploadType} where ${tableIdString} = SCOPE_IDENTITY();`;
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
                                    fileCount++;
                                    console.log(fileCount);
                                    if (fileCount >= tempFiles.length) {
                                        return res.json({
                                            status: 200,
                                            success: true,
                                            message:
                                                "Files uploaded successfully, and file-paths have been updated",
                                        });
                                    }
                                } else {
                                    return res.json({
                                        status: 400,
                                        success: false,
                                        message: "Failed to create upload record...",
                                    });
                                }
                            }
                        });
                    } catch (err) {
                        return res.status(500).send({
                            success: false,
                            message: "File upload error...",
                            error: err.message,
                        });
                    }

                    console.log(blobName);
                    console.log(blobData);
                };

                uploadBlob();
            });
        }
    }
};

let download = async (req, res) => {
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

        containerClient = blobServiceClient.getContainerClient(container);
        let blockBlobClient = containerClient.getBlockBlobClient(name);
        for await (const blob of containerClient.listBlobsFlat()) {
            console.log(blob.name);
        }
        try {
            const downloadBlockBlobResponse = await blockBlobClient.download(0);
            console.log(downloadBlockBlobResponse);
            console.log("\nDownloaded blob content...");

            let fileContents = downloadBlockBlobResponse.readableStreamBody;
            //fileContents.setEncoding(encoding);

            res.set("Content-disposition", "attachment; filename=" + name);
            res.set("Content-Type", mimetype);

            fileContents.on("data", (data) => {
                res.write(data);
            });
            fileContents.on("end", (data) => {
                res.status(200).send();
            });
        } catch (err) {
            if (err) console.log(err);
            return res.status(400).send({
                success: false,
                message: "File not found...",
                err: err,
            });
        }
    }
};

let deleteBlob = async (req, res) => {
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
        let blobId = name.split("-")[0].trim();
        console.log(blobId);
        let containerName;
        let containerClient;
        let tableIdString;
        if (container == "materials") {
            tableIdString = "materials.mID";
            containerName = "materials";
            containerClient = blobServiceClient.getContainerClient(containerName);
        } else if (container == "assignments") {
            tableIdString = "assignments.assignmentID";
            containerName = "assignments";
            containerClient = blobServiceClient.getContainerClient(containerName);
        } else if (container == "student_assignments") {
            tableIdString = "student_assignments.assignmentID";
            containerName = "student-assignments";
            containerClient = blobServiceClient.getContainerClient(containerName);
        } else if (container == "shared_materials") {
            tableIdString = "shared_materials.sharedMaterialID";
            containerName = "shared-materials";
            containerClient = blobServiceClient.getContainerClient(containerName);
        } else if (container == "syllabi") {
            tableIdString = "syllabi.syllabusID";
            containerName = "syllabi";
            containerClient = blobServiceClient.getContainerClient(containerName);
        } else {
            return res.status(400).send({
                success: false,
                message: "Unknown uploadType...",
            });
        }

        let q = `delete from ${container} \
    where ${tableIdString} = ${blobId};`;
        console.log(q);

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
                let blockBlobClient = containerClient.getBlockBlobClient(name);
                if (blockBlobClient.exists()) {
                    blockBlobClient.delete();
                }

                return res.status(200).send({
                    success: true,
                    message: "Resource deleted successfully...",
                });
            }
        });
    }
};
let streamDownload = async (req, res) => {
    console.log("The request headers : ");
    console.log(req.headers);
    let range = req.headers.range;
    console.log(req.params)
    if (!req.params.container) {
        return res.status(400).send({
            success: false,
            message: "File field missing in url...",
        });
    } else {
        let container = req.params.container;
        let name = req.params.blobName;
        let encoding = req.params.encoding;
        let mimetype = req.params.mime + '/' + req.params.type;
        console.log(mimetype)
        containerClient = blobServiceClient.getContainerClient(container);
        let blockBlobClient = containerClient.getBlockBlobClient(name);
        let props = await blockBlobClient.getProperties();
        let size = props.contentLength;
        let start, end;
        let fullRange;
        if (range) {
            console.log("Range Active : ")
            let a = range.replace(/bytes=/, "").split("-");
            start = a[0];
            end = a[1];
            console.log("Start : " + start + "\n End : " + end)
            start = parseInt(start, 10);
            end = end ? parseInt(end, 10) : size - 1;

            if (!isNaN(start) && isNaN(end)) {
                start = start;
                end = size - 1;
            }
            if (isNaN(start) && !isNaN(end)) {
                start = size - end;
                end = size - 1
            }

            res.status(206)
            res.set({
                "Content-Type": mimetype,
                "Accept-Ranges": props.acceptRanges,
                "Content-Range": `bytes ${start}-${end}/${size}`,
                "Content-Length": end - start + 1,
            })
            res.set('Connection', 'keep-alive');
            let downloadBlockBlobResponse = await blockBlobClient.downloadToFile(path.join(__dirname, `../tmp/${name}`));
            // let blockStream = downloadBlockBlobResponse.readableStreamBody;
            // blockStream.on('open', () => {
            //   console.log("Readable stream opened...")
            // })
            // blockStream.on("data", (data) => {
            //   res.write(data);
            // });
            let blockStream = fs.createReadStream(path.join(__dirname, `../tmp/${name}`), {start: start, end: end});
            pipeline(blockStream, res, (err) => {
                console.log(err)
            })
            console.log(res.getHeaders());
        }
        else {
            res.set("Content-Type", mimetype);
            res.set("Content-Length", props.contentLength);
            try {
                let downloadBlockBlobResponse = await blockBlobClient.download(0);
                let blockStream = downloadBlockBlobResponse.readableStreamBody;
                pipeline(blockStream, res, (err) => {
                    console.log(err)
                })
                // blockStream.on('open', () => {
                //   console.log("Readable stream opened...")
                // })
                // blockStream.on("data", (data) => {
                //   res.write(data);
                // });
                // blockStream.on("end", () => {
                //   res.status(200).send();
                // })
            } catch (err) {
                if (err) console.log(err);
                return res.status(400).send({
                    success: false,
                    message: "File not found...",
                    err: err,
                });

            }
        }
    }

}
let streamDownload2 = async (req, res) => {
    console.log("The request : ");
    console.log(req.headers.range)
    let range = req.headers.range;
    console.log(req.params)
    if (!req.params.container) {
        return res.status(400).send({
            success: false,
            message: "File field missing in url...",
        });
    } else {

        let container = req.params.container;
        let name = req.params.blobName;
        let encoding = req.params.encoding;
        let mimetype = req.params.mime + '/' + req.params.type;
        console.log(mimetype)

        containerClient = blobServiceClient.getContainerClient(container);
        let blockBlobClient = containerClient.getBlockBlobClient(name);
        // for await (const blob of containerClient.listBlobsFlat()) {
        //   console.log(blob.name);
        // }
        let props = await blockBlobClient.getProperties();
        // console.log("Block Properties : ")
        // console.log(props);
        let size = props.contentLength;
        let start, end;
        if (range) {
            console.log("Range Active : ")
            [start, end] = range.replace(/bytes=/, "").split("-");
            start = parseInt(start, 10);
            end = end ? parseInt(end, 10) : size - 1;

            if (!isNaN(start) && isNaN(end)) {
                start = start;
                end = size - 1;
            }
            if (isNaN(start) && !isNaN(end)) {
                start = size - end;
                end = size - 1
            }


        }

        try {
            const downloadBlockBlobResponse = await blockBlobClient.download(0);
            // console.log(downloadBlockBlobResponse);
            console.log("\nDownloaded blob content...");

            let fileContents = downloadBlockBlobResponse.readableStreamBody;
            //fileContents.setEncoding(encoding);

            //res.set("Content-disposition", "attachment; filename=" + name);

            // res.set("Content-Type", mimetype);
            // res.set("Content-Length", props.contentLength);
            // res.set("Accept-Ranges", props.acceptRanges);
            // res.set("Cache-Control", 'max-age=600');
            res.set("ETag", props.etag)
            res.status(206)
            res.set({
                "Content-Type": mimetype,
                "Accept-Ranges": props.acceptRanges,
                "Cache-Control": 'max-age=600',
                "Content-Range": `bytes ${start}-${end}/${size}`,
                "Content-Length": end - start + 1,
            })
            res.write(fileContents.read())

            fileContents.on("data", (data) => {
                console.log("Data chunk: " + data);
                console.log(data.length);
                res.write(data);
            });
            fileContents.on("end", (data) => {
                res.status(200).send();
                console.log(res)
            });
        } catch (err) {
            if (err) console.log(err);
            return res.status(400).send({
                success: false,
                message: "File not found...",
                err: err,
            });
        }
    }
};

module.exports = {
    upload: upload,
    download: download,
    streamDownload: streamDownload,
    multiUpload: multiUpload,
    storageInit: storageInit,
    deleteBlog: deleteBlob
};
