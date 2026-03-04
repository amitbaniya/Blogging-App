import { hash, compare } from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from 'crypto';

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


export const resetEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    await sendResetEmail(user.email, resetToken);

    res.status(200).json({ message: "Email Sent in Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const isMatch = await compare(newPassword, user.password);
    if (isMatch) {
      return res.status(400).json({ message: "Cannot use  previous used password" });
    }


    const hashedPassword = await hash(newPassword, 10)
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();


    res.status(200).json({ message: "Password Reset Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


export const sendResetEmail = async (toEmail, resetToken) => {
  try {
    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password/${resetToken}`;
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.MAIL_API_KEY,
      },
      body: JSON.stringify({
        sender: { email: process.env.EMAIL_USER || 'example@brevo.com', name: "Ink & Insights" },
        to: [{ email: toEmail }],
        subject: "Reset Password - Ink & Insights",
        htmlContent: `
          <div style="text-align: center;">
              <h2>Reset Password</h2>
              <p>Use the button below to reset your password:</p>
              <a href="${resetLink}" 
                  style="
                  display: inline-block;
                  padding: 12px 24px;
                  font-size: 18px;
                  font-weight: bold;
                  color: #fff;
                  background-color: #4CAF50;
                  text-decoration: none;
                  border-radius: 5px;
                  margin-top: 10px;
                  ">
                  Reset Password
              </a>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error sending OTP email:", errorData);
      throw new Error(errorData.message || "Failed to send OTP email");
    }

    const data = await response.json();
    console.log("Reset password email sent successfully", data);
  } catch (error) {
    console.error("Error sending OTP email:", error.message);
    throw error;
  }
};

