import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  favorites: Array,
  role: { type: String, required: true, enum: ["Admin", "User"], default: "User" },
});

userSchema.plugin(uniqueValidator);

// do something before creating the user
userSchema.pre("save", async function (next) {
  console.log("User is about to be saved");
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User = mongoose.model("users", userSchema);
