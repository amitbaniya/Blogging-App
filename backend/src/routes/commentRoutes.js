import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { commentProtect } from "../middleware/commentMiddleware.js"

import { create, getMoreComments, remove } from "../controllers/commentController.js"


const router = express.Router()

router.post("/create/:blogId", protect, create)
router.delete("/remove/:commentId", protect, commentProtect, remove)
router.get("/more/:blogId", getMoreComments)

export default router
