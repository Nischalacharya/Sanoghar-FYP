import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupUser } from "../../../function/User";
import "./User.scss";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../redux/Index";
import img1 from "../../../assets/img/signup.jpg";
import { toast } from "react-toastify";

export const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
        mobilenumber: "",
        gender: "none",
    });
    const [response, setResponse] = useState(null);

    // Define validation regex patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernamePattern = /^[a-zA-Z0-9_]{3,}$/;
    const passwordPattern = /^(?=.*[!@#$%^&])[a-zA-Z0-9!@#$%^&*]{6,}$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const SignupHandler = async (e) => {
        e.preventDefault();
        console.log(user);

        if (!emailPattern.test(user.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        if (!usernamePattern.test(user.username)) {
            toast.error(
                "Username must be at least 3 characters long and can only contain letters, numbers, and underscores."
            );
            return;
        }

        if (!passwordPattern.test(user.password)) {
            toast.error(
                "Password must be at least 6 characters long and contain at least one special character."
            );
            return;
        }

        if (!user.gender) {
            toast.error("Please select your gender");
            return;
        }

        const res = await SignupUser(user);

        if (res.message === "User Registered sucessfully") {
            dispatch(setLogin({ user: res.user }));
            toast.success("Signup Successful");
            navigate("/");
        } else {
            console.log(res.message);
        }
    };

    const googleSignUpHandler = async (credential) => {
        const user = { ctoken: credential };
        const res = await SignupUser(user);
        if (res.message === "User Registered sucessfully") {
            dispatch(setLogin({ user: res.user }));
            toast.success("Signup Successful");
            navigate("/");
        } else {
            console.log(res.message);
        }
    };

    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    };

    return (
        <>
            <div className="signup">
                <div className="left-container">
                    <div className="content">
                        <h1>
                            <span className="material-symbols-outlined">
                                home
                            </span>
                            Sanoghar
                        </h1>
                    </div>
                    <img src={img1} alt="Sanoghar" />
                </div>
                <form>
                    <div className="signup-box">
                        <div
                            style={{
                                marginTop: "25px",
                            }}
                        >
                            <h1>Signup</h1>
                        </div>
                        <div className="inputBox">
                            <label>Email</label>{" "}
                            {response && !emailPattern.test(user.email) && (
                                <span className="error-message">
                                    Please enter a valid email address.
                                </span>
                            )}
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                required="required"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputBox">
                            <label>Username</label>
                            {response &&
                                !usernamePattern.test(user.username) && (
                                    <span className="error-message">
                                        Username must be at least 3 characters
                                        long and can only contain letters,
                                        numbers, and underscores.
                                    </span>
                                )}
                            <input
                                type="text"
                                name="username"
                                value={user.username}
                                required="required"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputBox">
                            <label>Mobile number</label>
                            {response &&
                                !mobileNumberPattern.test(
                                    user.mobilenumber
                                ) && (
                                    <span className="error-message">
                                        Please enter a valid 10-digit mobile
                                        number.
                                    </span>
                                )}
                            <input
                                type="text"
                                name="mobilenumber"
                                value={user.mobilenumber}
                                required="required"
                                onChange={handleChange}
                                placeholder="Optional"
                            />
                        </div>
                        <div className="inputBox">
                            <label>Password</label>{" "}
                            {response &&
                                !passwordPattern.test(user.password) && (
                                    <span className="error-message">
                                        Password must be at least 6 characters
                                        long and contain at least one special
                                        character.
                                    </span>
                                )}
                            <input
                                type={show ? "text" : "password"}
                                name="password"
                                id="password"
                                value={user.password}
                                required="required"
                                onChange={handleChange}
                            />
                            <div id="eyeball" onClick={handleShow}>
                                {show ? (
                                    <i className="fa-regular fa-eye cursor-pointer"></i>
                                ) : (
                                    <i className="fa-regular fa-eye-slash cursor-pointer"></i>
                                )}
                            </div>
                        </div>
                        <select
                            name="gender"
                            value={user.gender}
                            onChange={handleChange}
                            className="loginGender"
                        >
                            <option value="" selected>
                                Gender
                            </option>
                            <option value="male">Male</option>  
                            <option value="female">Female</option>
                        </select>
                        <div className="signup-btn">
                            <button onClick={(e) => SignupHandler(e)}>
                                Signup
                            </button>
                        </div>
                        <div className="orTextSignup">
                            <div className="leftLine" />
                            <h5>OR</h5>
                            <div className="rightLine" />
                        </div>
                        <div className="googleBtnSignUp">
                            <GoogleLogin
                                onSuccess={(res) => {
                                    googleSignUpHandler(res.credential);
                                }}
                                size="large"
                                text="signup_with"
                                width={"380px"}
                                logo_alignment="center"
                            />
                        </div>
                        <div
                            style={{
                                marginBottom: "15px",
                            }}
                        >
                            <p>
                                Already have an account?{" "}
                                <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
