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
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000
    })
    .json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        linkedin: user.linkedin,
        imageUrl: user.imageUrl,
      }
    })
}

export async function me(req, res) {
  const { _id, name, email, linkedin, bio, imageUrl } = req.user

  return res.status(200).json({ user: { _id, name, email, linkedin, bio, imageUrl }, message: "User retrieved succesfully" })
}

export async function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });


  return res.status(200).json({ message: "Logged out successfully" })
}


export async function update(req, res) {

  try {
    const { name, email, bio, linkedin } = req.body
    const user = req.user;

    user.name = name
    user.email = email
    user.bio = bio
    user.linkedin = linkedin

    await user.save();
    return res.status(200).json({ message: "User saved successfully" })
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Server Error." })
  }
}

export const uploadUserPicture = async (req, res) => {
  try {
    const user = req.user;

    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const imageUrl = req.file.path;
    const secretUrl = req.file.filename;

    if (user.imageSecret) {
      const previousImage = await cloudinary.uploader.destroy(user.imageSecret);
      console.log("Delete result Previous Image:", previousImage);
    }
    user.imageUrl = imageUrl;
    user.imageSecret = secretUrl;
    await user.save();


    return res.status(200).json({ message: 'User picture saved successfully' })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
}

