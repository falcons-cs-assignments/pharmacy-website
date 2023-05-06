import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error(err));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
