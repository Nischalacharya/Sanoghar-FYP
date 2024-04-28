import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../../function/User";
import "./User.scss";
import { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../redux/Index";
import img1 from "../../../assets/img/login.png";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [response, setResponse] = useState(null);
  const [textIndex, setTextIndex] = useState(0);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const LoginHandler = async (e) => {
    if (user.email === "" || user.password === "") {
      toast.error("Please fill all the fields");
      return;
    }
    e.preventDefault();
    const res = await LoginUser(user);
    if (res.user === undefined) {
      toast.error("User does not exists");
      return;
    }
    dispatch(setLogin({ user: res.user }));
    toast.success("Login Successful");
    res.user.isAdmin === "true" ? navigate("/admin") : navigate("/");
  };

  const googleSignInHandler = async (cred) => {
    const user = { ctoken: cred };
    const res = await LoginUser(user);
    if (res.user === undefined) {
      toast.error("User does not exists");
      return;
    }
    dispatch(setLogin({ user: res.user }));
    toast.success("Login Successful");
    console.log(res);
    res.user.isAdmin === "true" ? navigate("/admin") : navigate("/");
  };

  const handleShow = () => {
    setShow(!show);
  };
  const texts = [
    "Discover a home",
    "Where affordability meets comfort",
    "Your best choice for student living!",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="login">
        <form>
          <p>Login</p>
          <div className="inputBox">
            <input
              type="text"
              name="email"
              value={user.email}
              required="required"
              onChange={handleChange}
            />
            <label>Email</label>
          </div>
          <div className="inputBox">
            <input
              type={show ? "text" : "password"}
              name="password"
              id="password"
              value={user.password}
              required="required"
              onChange={handleChange}
            />
            <label>Password</label>
            <div id="eyeball" onClick={handleShow}>
              {show ? (
                <i className="fa-regular fa-eye cursor-pointer"></i>
              ) : (
                <i className="fa-regular fa-eye-slash cursor-pointer"></i>
              )}
            </div>
          </div>
          <div className="btn-login">
            <button
              type="submit"
              className="login-btn"
              onClick={(e) => LoginHandler(e)}
            >
              Login
            </button>
          </div>
          <div className="loginForgerPW">
            <Link
              to="/forgotpassword"
              className="link"
              style={{
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Forgot password ?
            </Link>
          </div>

          <div className="orText">
            <div className="leftLine" />
            <h5>OR</h5>
            <div className="rightLine" />
          </div>
          <div className="googleBtn">
            <GoogleLogin
              text="signin_with"
              size="large"
              onSuccess={(res) => {
                googleSignInHandler(res.credential);
              }}
              auto_select={false}
              width={"350px"}
              logo_alignment="center"
            />
          </div>
          <div className="loginSignUp">
            <span>
              Don't Have An Account?
              <Link to="/signup" className="link" style={{ color: "#673de6" }}>
                Signup
              </Link>
            </span>
          </div>
        </form>
        <div className="right-container">
          <h1>Sanoghar</h1>
          <div className="animation-container">
            <p className="animation-text">{texts[textIndex]}</p>
          </div>
          <img src={img1} className="hostelLogin" />
        </div>
      </div>
    </>
  );
};
