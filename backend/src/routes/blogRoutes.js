import { Router } from "express"
import { protect } from "../middleware/authMiddleware.js"
import { create, getAll, getBlog, publish, save } from "../controllers/blogControllers.js"
import { blogProtect } from "../middleware/blogMiddleware.js"

const router = Router()

router.post("/create", protect, create)
router.patch("/save/:blogId", protect, save)
router.get("/get/:blogId", protect, blogProtect, getBlog)
router.patch("/publish/:blogId", protect, publish)
router.get("/get", getAll)

export default router
