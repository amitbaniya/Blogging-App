import { Router } from "express"
import { getAIReply } from "../controllers/aiController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = Router()

router.post("/get", protect, getAIReply)


export default router
