import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../../redux/Index";
export const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  return (
    <div className="profile-dropdown">
      <ul>
        <Link className="link">
          <li>Profile</li>
        </Link>
        {user.isHostelOwner == "true" ? (
          <Link to="/hostelowner" className="link">
            <li>Register Hostel</li>
          </Link>
        ) : (
          ""
        )}
        <Link className="link" to="/" onClick={() => dispatch(setLogout())}>
          <li>Logout</li>
        </Link>
      </ul>
    </div>
  );
};
