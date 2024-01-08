const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const PDFParser = require('pdf-parse');
const rootDir = require('../utils/path');

// Set storage for file uploads using multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'upload-form.html'));
});

router.post(
  '/analyze-pdf',
  upload.single('pdfFile'),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded');
      }

      const pdfBuffer = req.file.buffer;

      const data = await PDFParser(pdfBuffer);
      const textContent = data.text;

      // Save text content to a txt file
      const fileName = `parsed_text_${Date.now()}.txt`;
      fs.writeFileSync(fileName, textContent);

      res.send('File Uploaded!');
      res.end();
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error analyzing PDF');
    }
  },
);

module.exports = router;
