const util = require("util");
const multer = require("multer");
const maxsize = 2 * 1024 * 1024;
const path = require("path");
const { Module } = require("module");

let storage = multer.diskStorage({
  destination: (req, file, res) => {
    res(null, "./images");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);

    cb(null, Date.now() + path.extname(file.originalname));
  },
});

let uploadfile = multer({
  storage: storage,
  limits: maxsize,
}).single("file");
let uploadfilemiddleware = util.promisify(uploadfile);

module.exports = uploadfilemiddleware;
