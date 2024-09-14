import { Router } from "express";
import { signup, login, verify, logout } from "../controllers/userController.js";
import verifyToken from "../middleware/auth.js";


const router = Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout',verifyToken, logout)
router.post('/verify',verifyToken, verify)



export default router;