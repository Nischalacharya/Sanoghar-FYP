import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { ProfileDropdown } from "./ProfileDropdown";
import moon from "../../assets/moon.png";
import sun from "../../assets/sun.png";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/Index";
import LightModeIcon from "@mui/icons-material/LightMode";

const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);
  const dispatch = useDispatch();
  const storage = useSelector((state) => state);

  const toggleTheme = () => {
    dispatch(setTheme());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav>
        <Link to="/" className="link">
          <span>
            <span className="material-symbols-outlined">home</span>
            <p>Sanoghar</p>
          </span>
        </Link>
        <ul>
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li>About</li>
          <li>
            <Link to={"/map"} className="link">
              Map
            </Link>
          </li>
          <li>
            <Link className="link" to="/hostel">
              Hostel
            </Link>
          </li>
          <li
            className="profile"
            ref={profileRef}
            onClick={() => setOpenProfile((prev) => !prev)}
          >
            {storage.user ? (
              <>
                {storage.user.username}
                {openProfile && <ProfileDropdown />}
              </>
            ) : (
              <Link
                to="/login"
                className="link"
                onClick={() => setOpenProfile(false)}
              >
                Login
              </Link>
            )}
          </li>
          <li className="toggle">
            <div onClick={() => toggleTheme()}>
              {storage.theme === "light-theme" ? (
                <img src={moon} alt="Moon Icon" />
              ) : (
                <LightModeIcon />
              )}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
