import express, { json } from "express"
import { config } from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"

config()
connectDB()

const app = express()

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
