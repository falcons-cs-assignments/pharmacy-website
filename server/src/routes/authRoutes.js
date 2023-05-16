import { Router } from "express";
import { login_user, signup_user, logout_user } from "../controllers/authControllers.js";

const router = Router();

router.post("/api/users/signup", signup_user);
router.post("/api/users/login", login_user);
router.post("/api/users/logout", logout_user);

export { router };
