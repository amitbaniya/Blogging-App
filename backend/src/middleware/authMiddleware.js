import { verify } from "jsonwebtoken"

export function protect(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: "Not authorized" })
  }

  try {
    verify(token, process.env.JWT_SECRET)
    next()
  } catch (error) {
    res.status(401).json({ message: "Invalid token" })
  }
}
