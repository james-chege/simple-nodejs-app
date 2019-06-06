import mongoose from "mongoose";

import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import Promise from "bluebird";
import users from "./routes/users";

const app = express();

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/users", users);

module.exports = app;
