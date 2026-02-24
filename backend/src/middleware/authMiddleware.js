import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

export async function protect(req, res, next) {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ message: "Not authorized" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const userId = decoded.id;

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found." })
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: "Invalid token" })
  }
}
