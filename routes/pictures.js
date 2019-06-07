import express from "express";
import dotenv from "dotenv";
import validate from "express-validation";
import sprintf from "sprintf";
import constants from "../constants/responseMessages";

import validator from "../middlewares/validator";
import Photo from "../models/Photo";
import User from "../models/User";
import parseErrors from "../utils/parseErrors";

dotenv.config();
const router = express.Router();

// GET photos
router.get("/", (req, res) => {
  Photo.find({}, (error, photos) => {
    if (photos) {
      return res.json({ photos });
    }
    return res.json({ error });
  });
});

// CREATE photo
router.post("/", [validate(validator.addPhoto)], (req, res) => {
  const { url, title, uploader } = req.body.photo; //eslint-disable-line
  User.findOne({ username: uploader }, (error, user) => {
    const userId = user._id;
    const photo = new Photo({ url, title, uploader, userId });
    photo
      .save()
      .then(photoRecord => {
        const message = sprintf(constants.SUCCESSFUL_ADDITION, "photo");
        res.status(201).json({ message, photo: photoRecord.toAuthJSON() });
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json({ errors: parseErrors(err.errors) });
      });
  });
});

// Edit photo
router.put("/:id", (req, res) => {
  const { id } = req.params; //eslint-disable-line
  Photo.findByIdAndUpdate(
    { _id: id },
    req.body.photo,
    { new: true },
    (error, photo) => {
      if (photo) {
        const message = sprintf(constants.SUCCESSFUL_UPDATE, "photo");
        return res.json({ message, photo });
      }
      return res.status(404).json({ error: "that photo does not exist" });
    }
  );
});

// Delete photo
router.delete("/:id", (req, res) => {
  const { id } = req.params; //eslint-disable-line
  Photo.findByIdAndRemove({ _id: id }, (error, photo) => {
    if (photo) {
      const message = sprintf(constants.SUCCESSFUL_DELETE, "photo");
      return res.json({ message, photo });
    }
    return res.status(404).json({ error: "that photo does not exist" });
  });
});

export default router;
