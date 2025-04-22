import { Router } from "express";
import { getCurrentUser, login, logout, signup } from "../controllers/auth.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup",signup);
router.post('/login',login);
router.get('/logout',logout);
router.get('/:token',authenticate,getCurrentUser);

export default router;