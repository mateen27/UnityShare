const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("../models/file");
const { v4: uuid4 } = require("uuid");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    // creating a unique fileName for the uploaded files
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({ storage, limit: { fileSize: 1000000 * 100 } }).single(
  "myfile"
);

router.post("/", (req, res) => {
  //   Store the file
  upload(req, res, async (err) => {
    // Validate the request
    if (!res.file) {
      return res.json({ error: "All fields are required." });
    }
    if (err) {
      res.status(500).send({ error: err.message });
    }

    // Store into the database
    const file = new File({
      fileName: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size,
    });

    // saving the file
    const response = await file.save();
    return res.json({
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    });
  });
  //   Response
});

module.exports = router;
