import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { create, get } from "../controllers/ratingControllers.js"

const router = express.Router()

router.post("/save/:blogId", protect, create)
router.get("/get/:blogId", protect, get)

export default router
