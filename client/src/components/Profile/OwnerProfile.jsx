import React, { useEffect, useState } from "react";
import "./UserProfile.scss";
import { getHostel } from "../../function/Hostel";
import { useSelector } from "react-redux";
import { GetPayment } from "../../function/Payment";


const OwnerProfile = () => {

    const user = useSelector(state => state.user);
    const [hostels, setHostels] = useState([]);
    const [payments, setPayments] = useState([]);
    const [seaterOccupied, setSeaterOccupied] = useState(0);
    const [seaterEmpty, setSeaterEmpty] = useState(0);
    const [hosteler, setHosteler] = useState(0);

    const fetchHostel = async () => {
        const hostelsData = await getHostel({ email: user.email });
        const filterData = hostelsData.filter(hostel => hostel.email === user.email);
        setHostels(filterData);
        countEmptySeater(filterData);
    }
    const fetchPayment = async () => {
        const paymentsData = await GetPayment();
        const filterData = paymentsData.filter(hostel => hostel.ownerEmail === user.email);
        setPayments(filterData);
        countOccupiedSeater(filterData);
        countHostelerNumber(filterData);
    }

    const countHostelerNumber = (data) => {
        setHosteler(data.filter(payment => payment.ownerEmail == user.email).length)
    }

    const countOccupiedSeater = (paymentsData) => {
        setSeaterOccupied(0)
        paymentsData.map((payment) => (
            Object.keys(payment.room).map((floorIndex) => (
                Object.keys(payment.room[floorIndex]).map((roomName) => (
                    setSeaterOccupied(prev => prev + 1)
                ))
            ))
        )
        )
    }

    const countEmptySeater = (hostelsData) => {
        setSeaterEmpty(0)
        hostelsData.map((hostel) => (
            hostel.floor && Object.keys(hostel.floor).map((floorIndex) => (
                Object.keys(hostel.floor?.[floorIndex]).map((roomName) => (
                    setSeaterEmpty(prev => prev + 1)
                ))
            ))
        )
        )
    }

    useEffect(() => {
        fetchPayment();
        fetchHostel();
    }, [])

    return (
        <div className="userProfile">
            <div className="dashboardWrapper">
                <div className="dashboardBox">
                    <h3>No of Seater occupied</h3>
                    <h1>{seaterOccupied}</h1>
                </div>
                <div className="dashboardBox">
                    <h3>No of seater empty</h3>
                    <h1>{seaterEmpty}</h1>
                </div>
                <div className="dashboardBox">
                    <h3>No of Hostelers</h3>
                    <h1>{hosteler}</h1>
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

export default OwnerProfile;
