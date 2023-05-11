import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import { router as userRoutes } from './src/routes/userRoutes.js';
import { router as authRoutes } from './src/routes/authRoutes.js';
import { authToken } from './src/middlewares/authMiddleware.js';


dotenv.config();

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(authRoutes);
// app.use(cookieParser());
// app.use(authToken, userRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
