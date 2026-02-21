import { Router } from "express"
import { register, login, me, logout } from "../controllers/authControllers.js"
import { protect } from "../middleware/authMiddleware.js"

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.get("/me", protect, me)
router.get("/logout", protect, logout)

export default router
