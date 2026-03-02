import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { create, remove } from "../controllers/commentController.js"


const router = express.Router()

router.post("/create/:blogId", protect, create)
router.delete("/remove/:commentId", protect, remove)

export default router
