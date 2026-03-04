import { Router } from "express"
import { register, login, me, logout, update, uploadUserPicture, resetEmail, resetPassword } from "../controllers/authControllers.js"
import { protect } from "../middleware/authMiddleware.js"
import { imageUploadMiddleware } from "../middleware/imageUploadMiddleware.js"

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.get("/me", protect, me)
router.get("/logout", protect, logout)
router.patch("/update", protect, update)
router.patch("/picture-upload", protect, imageUploadMiddleware.single('image'), uploadUserPicture)
router.post('/reset-password-email', resetEmail)
router.patch('/reset-password/:token', resetPassword)

export default router
