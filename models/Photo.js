import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true
    },
    title: {
      type: String,
      required: true,
      lowercase: true,
      index: true
    },
    uploader: {
      type: String,
      required: true,
      lowercase: true,
      index: true
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    url: this.url,
    uploader: this.uploader,
    title: this.title
  };
};

schema.plugin(uniqueValidator, { message: "This photo exists" });

export default mongoose.model("Photo", schema);
