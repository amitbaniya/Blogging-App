import express, { json } from "express"
import dotenv from 'dotenv';
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
import ratingRoutes from "./routes/ratingRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"

dotenv.config();
connectDB()

const app = express()

app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
app.use(json())

app.get("/", (req, res) => {
  res.json({ message: "API is running" })
})

app.use("/api/auth", authRoutes)
app.use("/api/blog", blogRoutes)
app.use("/api/comment", commentRoutes)
app.use("/api/rating", ratingRoutes)
app.use("/api/ai", aiRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})

export default app; 