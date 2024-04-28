import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../../redux/Index";
import { LogoutUser } from "../../function/User";
export const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const logoutHandler = async () => {
    const res = await LogoutUser();
    if (!res.success) return;
    await LogoutUser();
    dispatch(setLogout());
    navigate("/");
  };

  return (
    <div className="profile-dropdown">
      <ul>
        <Link className="link" to="/dashboard">
          <li>Dashboard</li>
        </Link>
        {user.isHostelOwner == "true" ? (
          <Link to="/hostelowner" className="link">
            <li>Register Hostel</li>
          </Link>
        ) : (
          ""
        )}
        <Link
          className="link"
          to="/"
          onClick={() => {
            logoutHandler();
          }}
        >
          <li>Logout</li>
        </Link>
      </ul>
    </div>
  );
};
