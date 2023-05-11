import { Router } from "express";
import { get_all_users, get_one_user, update_one_user, delete_one_user } from "../controllers/userControllers.js";

const router = Router();

router.get('/api/users', get_all_users);
router.get('/api/users/:id', get_one_user);
router.put('/api/users/:id', update_one_user);
router.delete('/api/users/:id', delete_one_user);

export { router };
