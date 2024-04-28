import jwt from "jsonwebtoken";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import { jwtDecode } from "jwt-decode";
import nodemailer from "nodemailer";

export const GetUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch {
    res.status(404).json({ messsage: error.messsage });
  }
};

export const SignupUser = async (req, res) => {
  let user = req.body;
  let logWithToken = false;
  try {
    if (user.ctoken) {
      user = jwtDecode(user.ctoken);
      logWithToken = true;
    }

    let userdb = await User.findOne({ email: user.email });

    if (userdb)
      return res.status(200).json({ message: "User already registered" });

    const salt = await bcrypt.genSalt(5);
    let newUser = "";

    if (logWithToken) {
      const hashedPassword = await bcrypt.hash(user.sub, salt);
      newUser = new User({
        email: user.email,
        username: user.name,
        password: hashedPassword,
        gender: "Male",
      });
    } else {
      const hashedPassword = await bcrypt.hash(user.password, salt);
      newUser = new User({
        email: user.email,
        username: user.username,
        mobilenumber: user.mobilenumber,
        password: hashedPassword,
        gender: user.gender,
      });
    }

    const token = createToken(newUser);
    res.cookie("access_token", token, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      sameSite: "strict",
      secure: false,
    });

    await newUser.save();
    delete newUser.password;

    res
      .status(201)
      .json({ user: newUser, message: "User Registered sucessfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const ResetPassword = async (req, res) => {
  try {
    const { _id, token, password } = req.body;

    try {
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return next(errorHandler(403, "Token is not valid!"));

        req.user = user;
      });

      if (!(await User.findOne({ _id }))) {
        return res.status(400).json({ message: "User is missing" });
      }
      const salt = await bcrypt.genSalt(5);
      const hashedPassword = await bcrypt.hash(password, salt);
      const updatedPassword = await User.findByIdAndUpdate(
        { _id },
        { password: hashedPassword }
      );

      delete updatedPassword.password;
      res.status(200).json({
        message: "User password updated sucessfully",
        user: updatedPassword,
      });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  } catch (error) {
    console.error("error updating user", error);
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

export const LoginUser = async (req, res) => {
  let user = req.body;
  let logWithToken = false;
  try {
    if (user.ctoken) {
      user = jwtDecode(user.ctoken);
      logWithToken = true;
    }

    const userDB = await User.findOne({ email: user.email });
    if (!userDB)
      return res.status(404).json({ message: "User does not exist" });

    if (!logWithToken) {
      const validPassword = await bcrypt.compare(
        user.password,
        userDB.password
      );
      if (!validPassword)
        return res.status(404).json({ message: "Invalid credentials" });
    }

    let accessToken = createToken(userDB, "access");

    delete userDB.password;

    res.cookie("access_token", accessToken, {
      sameSite: "none",
      secure: true,

      maxAge: 60 * 60 * 24 * 30 * 1000,
    });

    res.status(201).json({ user: userDB, message: "Log in Successful" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createToken = (user) => {
  return jwt.sign({ id: user.email }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};

export const ForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = createToken(user);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.mailer_gmail,
        pass: process.env.app_code,
      },
    });

    let mailOptions = {
      from: {
        name: "Sanoghar",
        address: "Sanoghar@gmail.com",
      },
      to: email,
      subject: "Reset Password",
      text: `Click this link to reset your password : http://localhost:5173/resetpassword/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(200).json(true);
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const EditUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const { email, username, mobilenumber, isAdmin, isHostelOwner } = req.body;
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(_id, {
      email,
      username,
      mobilenumber,
      isAdmin,
      isHostelOwner,
    });
    res.status(200).json({
      message: "user updated sucessfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("error updating user", error);
    res.status(500).json({ message: "Error updating user", success: false });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findOneAndDelete({ _id: id });

    res
      .status(200)
      .json({ message: "User deleted sucessfully", success: true });
  } catch (error) {
    console.error("error deleting user", error);
    res.status(500).json({ message: "error deleting user", success: false });
  }
};

export const LogoutUser = async (req, res) => {
  res.clearCookie("access_token").status(200).json({ success: true });
};
