const express = require("express");
const router = express.Router();
const multer = require("multer");
const Image = require("./model");
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jfif" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}).single("file");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await Image.find({ photographer: id }).sort({ createdAt: -1 });
  res.send(result);
});

router.post("/upload/", (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(409).send("Only .png, .jpg and .jpeg format allowed!");
    } else {
      try {
        const { token } = req.body;
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedData) res.send("You don't have permission!");
        const id = decodedData.id;
        if (!req.file) return res.status(409).send("No file selected!");
        const result = await Image.create({
          url: req.file.path,
          tags: req.body.tags,
          photographer: id,
        });
        if (result) return res.status(200).send("Image uploaded succesfully!");
      } catch (err) {
        res.status(409).send(err.message);
      }
    }
  });
});

router.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.send(images);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
