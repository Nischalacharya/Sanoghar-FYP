import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./User.scss";
import { forgotPassword, LoginUser } from "../../../function/User";
import { toast } from "react-toastify";
import forgotPW from "../../../assets/img/forgetPW.jpg";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const ForgotPasswordHandler = async (e) => {
        e.preventDefault();
        const res = await forgotPassword({ email });
        if (!res) return;
        toast.info("Password Reset Link sent to your email address");
        navigate("/");
    };

    return (
        <>
            <div className="forgot-password">
                <div className="left-container">
                    <img src={forgotPW} alt="Sanoghar" />
                </div>
                <form>
                    <div>
                        <p className="forgetText">Forgot password?</p>
                    </div>
                    <div className="inputBox">
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ height: "2.5rem" }}
                        />
                    </div>
                    <div className="reset-btn">
                        <button
                            onClick={(e) => ForgotPasswordHandler(e)}
                            className="resetClick"
                        >
                            Reset Password
                        </button>
                    </div>
                    <div>
                        <Link to="/login" className="link">
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};
