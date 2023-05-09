import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

export const Category = mongoose.model("categories", categorySchema);
