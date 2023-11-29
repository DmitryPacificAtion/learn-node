const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const rootDir = require('../utils/path');
const filePath = path.join(rootDir, 'uploadeded.pdf');
const formidable = require('formidable');

router.get('/', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'upload-form.html'));
});

router.post('/analyze-pdf', async (req, res, next) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    console.log('filepath', file.fileupload.filepath);
    console.log('err', err);
    res.write('File uploaded');
    res.end();
  });
  return;

  // fs.readFile(filePath, (error, file) => {
  //   console.log('readFile', file);
  //   if (!error) {
  //     try {
  //       pdfParser.loadPDF(file).then((data) => {
  //         console.log('loadPDF', data);
  //       }).catch((err) => console.log('Promise error', err));
  //       // pdfParser.on('pdfParser_dataError', (errData) =>
  //       //   console.error('pdfParser_dataError', errData)
  //       // );
  //       // pdfParser.on('pdfParser_dataReady', (pdfData) => {
  //       //   console.log('pdfParser_dataReady', pdfData);
  //       //   // fs.writeFile('./test.json', JSON.stringify(pdfData));
  //       // });
  //       // pdfParser.on('readable', (pdfData) => {
  //       //   console.log('readable', pdfData);
  //       //   // fs.writeFile('./test.json', JSON.stringify(pdfData));
  //       // });
  //       // pdfParser.on('data', (pdfData) => {
  //       //   console.log('data', pdfData);
  //       //   // fs.writeFile('./test.json', JSON.stringify(pdfData));
  //       // });
  //     } catch {
  //       throw Error("Checkout existing uploaded.pdf. Delete it if it's empty");
  //     }
  //   }

  // fs.writeFile(filePath, req.body.pdf, (error) => {
  //   console.error('writeFile error', error);
  // });

  //   fs.writeFile(filePath, req.body, (error) => {
  //     console.error('writeFile error', error);
  //   });
  // });

  // pdfParser.on('pdfParser_dataError', (errData) =>
  //   console.error('pdfParser_dataError', errData)
  // );
  // pdfParser.on('pdfParser_dataReady', (pdfData) => {
  //   console.log('pdfParser_dataReady', pdfData);
  //   // fs.writeFile('./test.json', JSON.stringify(pdfData));
  // });
  // pdfParser.on('readable', (pdfData) => {
  //   console.log('readable', pdfData);
  //   // fs.writeFile('./test.json', JSON.stringify(pdfData));
  // });
  // pdfParser.on('data', (pdfData) => {
  //   console.log('data', pdfData);
  //   // fs.writeFile('./test.json', JSON.stringify(pdfData));
  // });
});

module.exports = router;
//Read the content of the pdf from the downloaded path
//   var pdfParser = new PDFParser(this, 1);
//   pdfParser.on("pdfParser_dataError", function (errData) {
//      console.error(errData.parserError)
//   });
//   pdfParser.on("pdfParser_dataReady", function (pdfData) {
//   //console.log('here is the content: '+pdfParser.getRawTextContent());
//   this.assert.ok(pdfParser.getRawTextContent().indexOf(textToVerify) > -1);
//   });

//   pdfParser.loadPDF(filePath);
// } else {
//     console.log('OOPs file not present in the downloaded folder');
//     //Throw an error if the file is not found in the path mentioned
//     this.assert.ok(fs.existsSync(filePath));
// }

// fs.readFile(filePath, (error, file) => {
//   if (error) {
//     return callback([]);
//   }
//   callback(JSON.parse(file));
// });
