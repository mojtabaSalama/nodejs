const db = require("../models/index");
const tutorial = db.tutorial;
const op = db.sequelize.op;
//const uploadfile = require("../middleware/upload");
const path = require("path");
const fs = require("fs");
//const tutorial = require("../models/tutorial");
// const tutorial = require("../models/tutorial");

const Tutorial = {
  create: async (req, res) => {
    if (!req.body) {
      return res.status(400).send({ message: "content cant be empty" });
    }

    const data = {
      title: req.body.title,
      description: req.body.description,
      isPublished: req.body.isPublished,
    };
    if (title && isPublished == null) {
      res.status(400).send({ message: err + "some error occurd" });
    }

    //  const { title, discription, isPublished } = req.body;

    tutorial
      .create(data)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(400).send({ message: err + "some error occurd" });
      });
  },

  find: (req, res) => {
    const id = req.params.id;
    tutorial
      .findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({ message: "error" });
        }
      })
      .catch((err) => res.status(500).send({ message: "cant retrieve" }));
  },

  update: (req, res) => {
    const id = req.params.id;
    tutorial
      .update(req.body, { where: { id: id } })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "updated successfully" });
        } else {
          res.send("cant update");
        }
      })
      .catch((err) => {
        res.status(404).send({ message: "error" });
      });
  },
  delete: (req, res) => {
    const id = req.params.id;
    tutorial
      .destroy({ where: { id: id } })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "deleted successfully" });
        } else {
          res.send("cant delete");
        }
      })
      .catch((err) => {
        res.status(404).send({ message: "error" });
      });
  },

  uploadimage: async (req, res) => {
    const id = req.params.id;
    try {
      let { filename } = req.file;

      // check if file is an image
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

      if (!allowedTypes.includes(req.file.mimetype)) {
        fs.unlink(
          path.join(__dirname, `../../public/images/${filename}`),
          (err) => {
            if (err) throw err;
            console.log("deleted type is not image");
          }
        );
        return res.status(400).json("File is not an image");
      }

      //check user
      const Tutorial = await tutorial.findOne({ where: { id: id } });

      //check if user already has an image
      let filePath = path.join(
        __dirname,
        `../../public/images/${Tutorial.Image}`
      );

      if (fs.existsSync(filePath)) {
        //delete from fs system
        fs.unlink(filePath, (err) => {
          if (err) console.log(err);
          console.log("deleted from fs successfully");
        });
        //save the new link
        Tutorial.Image = filename;
        await Tutorial.save();
        res.json({ Tutorial });
      } else {
        Tutorial.Image = filename;
        await Tutorial.save();
        console.log();
        res.json({ Tutorial });
      }
    } catch (error) {
      if (error) throw error;
    }
  },
};
module.exports = Tutorial;
