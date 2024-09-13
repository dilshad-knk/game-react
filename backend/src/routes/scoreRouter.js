import { Router } from "express";
import verifyToken from "../middleware/auth.js";
import { highScore, scoreUpdate } from "../controllers/scoreController.js";



const router = Router();

router.use(verifyToken)

router.get('/highscore', highScore)
router.post('/update', scoreUpdate)




export default router;