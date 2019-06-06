import express from "express";
import dotenv from "dotenv";
import validate from "express-validation";
import sprintf from "sprintf";
import constants from "../constants/responseMessages";

import validator from "../middlewares/validator";
import User from "../models/User";
import parseErrors from "../utils/parseErrors";

dotenv.config();
const router = express.Router();

// GET users
router.get("/", (req, res) => {
  User.find({}, (error, users) => {
    if (users) {
      return res.json({ users });
    }
    return res.json({ error });
  });
});

// CREATE user
router.post("/", [validate(validator.register)], (req, res) => {
  const { email, username, full_name } = req.body.user; //eslint-disable-line
  const user = new User({ email, username, full_name });
  user
    .save()
    .then(userRecord => {
      res.status(201).json({ user: userRecord.toAuthJSON() });
    })
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

// Edit user
router.put("/:id", [validate(validator.update)], (req, res) => {
  const { id } = req.params; //eslint-disable-line
  User.findByIdAndUpdate(
    { _id: id },
    req.body.user,
    { new: true },
    (error, users) => {
      if (users) {
        const message = sprintf(constants.SUCCESSFUL_UPDATE, "user");
        return res.json({ message, users });
      }
      return res.status(404).json({ error: "that user does not exist" });
    }
  );
});

// Delete user
router.delete("/:id", (req, res) => {
  const { id } = req.params; //eslint-disable-line
  User.findByIdAndRemove({ _id: id }, (error, users) => {
    if (users) {
      const message = sprintf(constants.SUCCESSFUL_DELETE, "user");
      return res.json({ message, users });
    }
    return res.status(404).json({ error: "that user does not exist" });
  });
});

module.exports = router;
