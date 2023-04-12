const express = require("express");
const router = express.Router();
const tutorial = require("../controllers/tutorialController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/create", tutorial.create);
router.get("/:id", tutorial.find);
router.post("/:id/update", tutorial.update);
router.post("/:id/delete", tutorial.delete);
router.post("/:id/upload", upload.single("file"), tutorial.uploadimage);
module.exports = router;
