import React, { useState } from "react";
import "./Admin.scss";
import ApproveHostel from "./ApproveHostel";
import { ManageUser } from "./ManageUser";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/Index";
import { useNavigate } from "react-router-dom";
import PaymentReport from "./PaymentReport";
import { LogoutUser } from "../../function/User";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Dashboard } from "./Dashboard";
import CustomModal from "../Modals/CustomModal";
export const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [isEditSectionVisible, setEditSectionVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard-calendar");

  const switchSection = (section) => {
    setActiveSection(section);
  };

  const logout = async () => {
    const res = await LogoutUser();
    if (!res.success) return;
    dispatch(setLogout());
    await LogoutUser();
    navigate("/");
  };

  return (
    <>
      <div className="admin">
        <div className="admin-dashboard">
          <span>
            <span className="icon material-symbols-outlined">home</span>
            <p>Sanoghar</p>
          </span>
          <div className="dashboard-link">
            <div
              className={`dashboard-calendar ${
                activeSection === "dashboard-calendar" ? "active" : ""
              }`}
              onClick={() => switchSection("dashboard-calendar")}
            >
              <i class="fa-solid fa-table-columns"></i>
              <p>Dashboard</p>
            </div>
            <div
              className={`approve-hostel ${
                activeSection === "approve-hostel" ? "active" : ""
              }`}
              onClick={() => switchSection("approve-hostel")}
            >
              <i class="fa-solid fa-bed"></i>
              <p>Approve Hostel</p>
            </div>
            <div
              className={`manage-user ${
                activeSection === "manage-user" ? "active" : ""
              }`}
              onClick={() => switchSection("manage-user")}
            >
              <i class="fa-solid fa-user"></i>
              <p>Manage User</p>
            </div>
            <div
              className={`payment-report ${
                activeSection === "payment-report" ? "active" : ""
              }`}
              onClick={() => switchSection("payment-report")}
            >
              <i class="fa-solid fa-credit-card"></i>
              <p>Payment Report</p>
            </div>
          </div>
        </div>
        <div className="dashboard-section">
          <div className="admin-navbar">
            <div className="dashboard-title">
              <i class="fa-solid fa-user-tie"></i>Admin Dashboard
            </div>
            <button onClick={() => logout()} className="logout">
              Log out
            </button>
          </div>
          {activeSection === "dashboard-calendar" && <Dashboard />}
          {activeSection === "manage-user" && <ManageUser />}
          {activeSection === "approve-hostel" && <ApproveHostel />}
          {activeSection === "payment-report" && <PaymentReport />}
        </div>
      </div>
    </>
  );
};

export default Admin;
