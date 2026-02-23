import { Router } from "express"
import { protect } from "../middleware/authMiddleware.js"
import { create, getBlog, publish, save } from "../controllers/blogControllers.js"

const router = Router()

router.post("/create", protect, create)
router.patch("/save/:blogId", protect, save)
router.get("/get/:blogId", getBlog)
router.patch("/publish/:blogId", protect, publish)
router.get("/get-all", save)

export default router
