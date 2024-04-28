import "./UserProfile.scss";
import GreenYard from "../../assets/img/GreenYard.jpeg";
import { useSelector } from "react-redux";
import { GetPayment } from "../../function/Payment";
import { useEffect, useState } from "react";
import { getHostel, getVerifiedHostel } from "../../function/Hostel";

const UserProfile = () => {

  const [roomBooked, setRoomBooked] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [hostels, setHostels] = useState([]);

  const user = useSelector(state => state.user);

  const fetchPaymentHostel = async () => {
    const paymentsData = await GetPayment();
    const filterData = paymentsData.filter(hostel => hostel.email === user.email);
    countBookedInfo(filterData);
    fetchHostel(filterData)
  }

  const fetchHostel = async (data) => {
    const hostelData = await getVerifiedHostel();
    let hostelNames = data.map(hostel => hostel.hostel)
    console.log(data)
    const filterData = hostelData.filter(hostel => hostelNames.includes(hostel.title));
    setHostels(filterData);
    // console.log(filterData)
  }

  const countBookedInfo = (data) => {
    setRoomBooked(0);
    setTotalPrice(0)
    data.map((payment) => (
      Object.keys(payment.room).map((floorIndex) => (
        Object.keys(payment.room[floorIndex]).map((roomName) => {
          setRoomBooked(prev => prev + 1)
          setTotalPrice(prev => prev + +payment.room[floorIndex][roomName].price)
        })
      ))
    ))
  }

  useEffect(() => {
    fetchPaymentHostel();
  }, [])

  return (
    <div className="userProfile">
      <div className="dashboardWrapper">
        <div className="dashboardBox">
          <h3>Room Booked</h3>
          <h1>{roomBooked}</h1>
        </div>
        <div className="dashboardBox">
          <h3>Total Amount Paid(Rs.)</h3>
          <h1>{totalPrice}</h1>
        </div>
      </div>
      <div>
        {hostels.length === 0 ? <h1 className="text-center" >No Hostel Registered</h1> : hostels.map((hostel, i) => (
          <div className="hostelFooterWrapper" key={i} >
            <div className="basicInfoWrapper" >
              <div className="basicInfo">
                <div className="infogrp">
                  <h5>Hostel Name:</h5>
                  <h4>{hostel.title}</h4>
                </div>
                <div className="infogrp">
                  <h5>Location:</h5>
                  <h4>{hostel.location.split(",").slice(1, -1).join(",")}</h4>
                </div>
                <div className="infogrp">
                  <h5>Seater Info:</h5>
                  <h4></h4>
                </div>
                <div className="infogrp">
                  <h5>Floor Info:</h5>
                  <h4>Second Floor</h4>
                </div>
                <div className="infogrp">
                  <h5>Booked Date:</h5>
                  <h4>2080/01/25</h4>
                </div>
              </div>
            </div>
            <div className="hostelBanner" >
              <img src={`http://localhost:5000/assets/${hostel.imagepath1}`} alt="" />
              <div className="hostelInfo">
                <h1>{hostel.title}</h1>
                <h4>Home Away From Home</h4>
                <p>
                  We serve you with the best food, clean and family
                  environment.
                </p>
                <div className="contactInfo">
                  <p>{hostel.phone}</p>
                  <p>{hostel.email}</p>
                  <p>{hostel.location.split(",").slice(1, -1).join(",")}</p>
                </div>
              </div>
            </div>
          </div >
        ))
        }
      </div>

    </div >
  );
};

export default UserProfile;
