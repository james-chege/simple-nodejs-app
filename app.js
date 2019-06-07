import mongoose from "mongoose";

import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import Promise from "bluebird";
import users from "./routes/users";
import photos from "./routes/pictures";
import errorHandler from "./middlewares/errorHandler";
import responseModifier from "./middlewares/responseModifier";

const app = express();
app.use(responseModifier);

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/user", users);

app.use("/api/v1/photo", photos);

app.use(errorHandler);
app.listen(3000, () => console.log("running on localhost:3000"));

export default app;
