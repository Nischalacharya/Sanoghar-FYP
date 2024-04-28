import React, { useEffect, useState } from "react";
import "./Admin.scss";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { getAllHostel, getHostel } from "../../function/Hostel";
import { GetUser } from "../../function/User";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "No of user per year",
    },
  },
};

const labels = ["2020", "2021", "2022", "2023", "2024"];

export const bardata = {
  labels,
  datasets: [
    {
      label: "User",
      data: [10, 20, 50, 60, 70],
      backgroundColor: "rgba(75, 192, 192, 0.8 )",
    },
  ],
};

export const Dashboard = () => {

  const [counts, setCounts] = useState({ approved: 0, rejected: 0, pending: 0 });

  const fetchHostelCounts = async () => {
    const hostels = await getAllHostel();
    console.log(hostels)
    setCounts(prev => ({ ...prev, approved: 0, rejected: 0, pending: 0 }))
    hostels.forEach(hostel => {
      if (hostel.isApprove == "Approved")
        setCounts(prev => ({ ...prev, approved: +prev.approved + 1 }))
      else if (hostel.isApprove == "Rejected")
        setCounts(prev => ({ ...prev, rejected: +prev.rejected + 1 }))
      else
        setCounts(prev => ({ ...prev, pending: +prev.pending + 1 }))
    })
  }

  const fetchUserCount = async () => {
    const users = await GetUser();
    setCounts(prev => ({ ...prev, user: users.length }))
  }

  const data = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        label: "Total Hostel",
        data: [counts.approved, counts.pending, counts.rejected],
        backgroundColor: [
          "rgba(75, 192, 192, 0.5 )",
          "rgba(255, 206, 86, 0.5)",
          "rgba(255, 99, 132, 0.5)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(255, 99, 132, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    fetchHostelCounts();
    fetchUserCount()
  }, [])

  return (
    <div className="adminDashboard">
      <div className="adminWrapper">
        <div className="adminBox">
          <h3>Approved Hostel</h3>
          <h1>{counts.approved}</h1>
        </div>
        <div className="adminBox">
          <h3>Rejected Hostel</h3>
          <h1>{counts.rejected}</h1>
        </div>
        <div className="adminBox">
          <h3>Pending Hostel</h3>
          <h1>{counts.pending}</h1>
        </div>
        <div className="adminBox">
          <h3>Total User</h3>
          <h1>{counts.user}</h1>
        </div>
      </div>
      <div className="chartWrapper">
        <div className="pieChart">
          <Pie data={data} />
        </div>
        <div className="pieChart">
          <Bar options={options} data={bardata} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
