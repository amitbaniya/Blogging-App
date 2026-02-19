import { hash, compare } from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

export async function register(req, res) {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(400).json({ message: "User already exists" })
  }

  const hashedPassword = await hash(password, 10)

  await User.create({
    name,
    email,
    password: hashedPassword
  })

  res.status(201).json({ message: "User registered successfully" })
}

export async function login(req, res) {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const isMatch = await compare(password, user.password)
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    })
    .json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
}
