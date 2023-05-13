import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";
import { router as authRoutes } from './src/routes/authRoutes.js';
import { router as userRoutes } from './src/routes/userRoutes.js';
import { router as productRoutes } from './src/routes/productRoutes.js';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(authRoutes);
app.use(userRoutes);
app.use(productRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
