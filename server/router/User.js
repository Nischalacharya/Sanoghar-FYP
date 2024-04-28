import express from "express";
import {
  GetUser,
  LoginUser,
  SignupUser,
  ForgotPassword,
  ResetPassword,
  EditUser,
  DeleteUser,
  LogoutUser
} from "../controller/User.js";
import { verifyToken } from "../Middleware/auth.js";

const router = express.Router();

router.get("/", GetUser);
router.post("/signup", SignupUser);
router.post("/login", LoginUser);
router.post("/forgotPassword", ForgotPassword);
router.post("/resetpassword", ResetPassword);
router.patch("/:_id", verifyToken, EditUser);
router.delete("/:id", verifyToken, DeleteUser);
router.get("/logout", LogoutUser);

export default router;
