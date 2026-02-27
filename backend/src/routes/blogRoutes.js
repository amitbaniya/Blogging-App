import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { create, getAll, getAllPublisher, getBlog, publish, save, uploadBlogPicture } from "../controllers/blogControllers.js"
import { blogProtect } from "../middleware/blogMiddleware.js"
import { imageUploadMiddleware } from "../middleware/imageUploadMiddleware.js"

const router = express.Router()

router.post("/create", protect, create)
router.patch("/save/:blogId", protect, save)
router.get("/get/publisher/:blogId", protect, blogProtect, getBlog)
router.patch("/publish/:blogId", protect, publish)
router.get("/get", getAll)
router.get("/publisher/get", protect, getAllPublisher)
router.get("/get/:blogId", getBlog)
router.patch("/picture-upload/:blogId", protect, blogProtect, imageUploadMiddleware.single('blog'), uploadBlogPicture)

export default router
