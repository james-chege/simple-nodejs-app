import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.json({ users: [{ name: "Timmy" }] });
});

module.exports = router;
