import { Router } from "express";
import { 
    get_all_users,
    get_one_user,
    update_one_user,
    delete_one_user
} from "../controllers/userControllers.js";
import { authToken, isAdmin, isAuthorized } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/api/users', authToken, isAdmin, get_all_users);
router.get('/api/users/:id', authToken, isAuthorized, get_one_user);
router.put('/api/users/:id', authToken, isAuthorized, update_one_user);
router.delete('/api/users/:id', authToken, isAuthorized, delete_one_user);

export { router };
