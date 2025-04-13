const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const createToken = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser)
    return res.status(400).json({ message: "email already exist" });
  const user = await User.create({ username, email, password });

  createToken(user._id, res);

  res
    .status(201)
    .json({ message: "User registered", user: { id: user._id, username } });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid email" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  createToken(user._id, res);
  res.json({
    message: "sign in successful",
    user: { id: user._id, username: user.username },
  });
};

const logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" });
  res.json({ message: "Logged out successfully" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");

  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

  console.log("User with reset token:", user); // Debug log to check the user before saving

  try {
    await user.save();
    const resetLink = `${process.env.CLIENT_URL}/resetPassword/${token}`;
    const message = `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 1 hour.</p>`;

    await sendEmail(user.email, "Password Reset", message);

    res.json({ message: "A reset link has been sent to your email" });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }, // Check if the token is still valid
  });

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  user.password = newPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  console.log("User before saving:", user); // Debug log before saving the user

  try {
    await user.save();
    res.json({ message: "Password successfully reset!" });
  } catch (err) {
    console.error("Error saving user:", err);
    res
      .status(500)
      .json({ message: "Something went wrong while resetting password" });
  }
};

module.exports = {
  signIn,
  signUp,
  logout,
  forgotPassword,
  resetPassword,
};
