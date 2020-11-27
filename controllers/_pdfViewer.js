let sql = require("mssql");
const {pipeline} = require("stream");
const fs = require("fs");
const path = require("path");
const lineReplace = require('line-replace');
const replace = require('replace-in-file');
const {BlobServiceClient, AbortController} = require("@azure/storage-blob");

let indexHtml = `
<!DOCTYPE html>
<!--
Copyright 2016 Mozilla Foundation
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->
<html dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <title>PDF.js viewer</title>

    <link rel="stylesheet" href="https://cybers.azurewebsites.net/mobileViewer/pdfjs-dist/web/pdf_viewer.css">
    <link rel="stylesheet" type="text/css" href="https://cybers.azurewebsites.net/mobileViewer/viewer.css">

    <script src="https://cybers.azurewebsites.net/mobileViewer/pdfjs-dist/build/pdf.js"></script>
    <script src="https://cybers.azurewebsites.net/mobileViewer/pdfjs-dist/web/pdf_viewer.js"></script>
  </head>

  <body>
    <header>
      <h1 id="title"></h1>
    </header>

    <div id="viewerContainer">
      <div id="viewer" class="pdfViewer"></div>
    </div>

    <div id="loadingBar">
      <div class="progress"></div>
      <div class="glimmer"></div>
    </div>

    <div id="errorWrapper" hidden="true">
      <div id="errorMessageLeft">
        <span id="errorMessage"></span>
        <button id="errorShowMore">
          More Information
        </button>
        <button id="errorShowLess">
          Less Information
        </button>
      </div>
      <div id="errorMessageRight">
        <button id="errorClose">
          Close
        </button>
      </div>
      <div class="clearBoth"></div>
      <textarea id="errorMoreInfo" hidden="true" readonly="readonly"></textarea>
    </div>

    <footer>
      <button class="toolbarButton pageUp" title="Previous Page" id="previous"></button>
      <button class="toolbarButton pageDown" title="Next Page" id="next"></button>

      <input type="number" id="pageNumber" class="toolbarField pageNumber" value="1" size="4" min="1">

      <button class="toolbarButton zoomOut" title="Zoom Out" id="zoomOut"></button>
      <button class="toolbarButton zoomIn" title="Zoom In" id="zoomIn"></button>
    </footer>

     <script src="https://cybers.azurewebsites.net/mobileViewer/viewer.js"></script>
  </body>
</html>
`;

var blobServiceClient;
const mobilePdf = async (req, res) => {
  const STORAGE_CONNECTION_STRING =
    process.env.STORAGE_CONNECTION_STRING ||
    "DefaultEndpointsProtocol=https;AccountName=cyberschool;AccountKey=+kr0Nc7mnIuBd9lm1pWO+HxN5QRewoskrGPnExkgunq8xqi52Ay8qQZ963IFVqxr5+bQpDNVPUcpaD2AlxwjrA==;EndpointSuffix=core.windows.net";
  blobServiceClient = await BlobServiceClient.fromConnectionString(
    STORAGE_CONNECTION_STRING
  );
  console.log("The request headers : ");
  console.log(req.headers);
  let range = req.headers.range;
  console.log(req.params);
  if (!req.params.container) {
    return res.status(400).send({
      success: false,
      message: "File field missing in url...",
    });
  } else {
    let container = req.params.container;
    let name = req.params.blobName;
    let encoding = req.params.encoding;
    let mimetype = req.params.mime + "/" + req.params.type;
    console.log(mimetype);
    containerClient = blobServiceClient.getContainerClient(container);
    let blockBlobClient = containerClient.getBlockBlobClient(name);

    try {
      let downloadBlockBlobResponse =
        await blockBlobClient.downloadToFile(
          path.join(__dirname, `./mobilePdfViewer/tmp/${name}`)
        );
      const options = {
        files: path.join(__dirname, 'mobilePdfViewer/viewer.js'),
        from: '{{pdfName}}',
        to: `${name}`,
      };
      try {
        const results = await replace(options)
        console.log('Replacement results:', results);
        res.send(indexHtml);
      }
      catch (error) {
        console.error('Error occurred:', error);
      }
      // res.send(indexHtml);

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


module.exports = {
  mobilePdf,
}
