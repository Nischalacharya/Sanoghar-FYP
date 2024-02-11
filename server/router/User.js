import express from "express";
import {
  GetUser,
  LoginUser,
  SignupUser,
  ForgotPassword,
  ResetPassword,
  EditUser,
  DeleteUser,
} from "../controller/User.js";

const router = express.Router();

router.get("/", GetUser);
router.post("/signup", SignupUser);
router.post("/login", LoginUser);
router.post("/forgotPassword", ForgotPassword);
router.post("/resetpassword", ResetPassword);
router.patch("/:_id", EditUser);
router.delete("/:id", DeleteUser);

export default router;
