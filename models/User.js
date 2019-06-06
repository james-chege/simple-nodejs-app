import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true
    },
    full_name: {
      type: String,
      required: true,
      index: true,
      unique: false
    },
    pictures: [{ url: String, title: String, date: Date }]
  },
  { timestamps: true }
);

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    username: this.username,
    full_name: this.full_name,
    pictures: this.pictures
  };
};

schema.plugin(uniqueValidator, { message: "This user already exists" });

export default mongoose.model("User", schema);
