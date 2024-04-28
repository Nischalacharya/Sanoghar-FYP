import React, { useEffect, useState } from "react";
import "./Hosteldetail.scss";
import img1 from "../../assets/carousel/one.jpg";
import img2 from "../../assets/carousel/two.jpg";
import img3 from "../../assets/carousel/three.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AddHostelReview, GetHostelReview } from "../../function/HostelReview";
import {
    CreatePayment,
    GetPaymentByHostel,
    VerifyPayment,
} from "../../function/Payment";
import { format } from "timeago.js";
import StarIcon from "@mui/icons-material/Star";
import { selectBooking, selectHostel } from "../../redux/Index";
import HostelDetailMap from "./HostelDetailMap";
import { toast } from "react-toastify";

export const HostelDetail = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    const state = useSelector((state) => state);
    const hostel = state.selectedHostel;

    const { username, email } = state.user;
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeSection, setActiveSection] = useState("description");
    const [review, setReview] = useState({
        username,
        hostel: hostel.title,
        rating: 1,
    });
    const [reviews, setReviews] = useState([]);
    const [hoverStar, setHoverStar] = useState(1);
    const [isBook, setIsBook] = useState(false);
    const [booking, setBooking] = useState({ hostel: hostel.title, email, ownerEmail: hostel.email });
    const [tPrice, setTPrice] = useState(0);

    const openImage = (image) => {
        setSelectedImage(image);
    };

    const closeImage = () => {
        setSelectedImage(null);
    };

    const addReviewHandler = async (e) => {
        e.preventDefault();
        console.log(review.review.length)
        if (review.review.length < 10) {
            toast.info("Review must be at least 10 characters long");
            return;
        }
        if (!username) toast.info("Please login first to add review");
        const res = await AddHostelReview(review);
        if (!res.success) return;
        toast.success("Review Added");
        setReview({ username, hostel: hostel.title, rating: 1, review: "" });
        setHoverStar(1);
        getReviews();
    };

    const getReviews = async () => {
        const res = await GetHostelReview({ hostel: hostel.title });
        setReviews(res);
    };

    const createPayment = async () => {
        if (params.isPayment === "success") {
            const res = await CreatePayment(state.booking);
            if (!res.success) return;
            toast.success("Payment Successful");
            dispatch(selectHostel({ hostel: res.hostel }));
            navigate("/hosteldetail");
        }
    };

    const verifyPayment = async () => {
        !username && navigate("/login");
        dispatch(selectBooking({ booking }));
        if (!booking.duration) return toast.error("Please select a duration");
        if (!booking.startingDate) return toast.error("Please select a date");
        const res = await VerifyPayment({
            ...booking,
        });

        window.location.replace(res.url);
    };

    const bookNowHandler = () => {
        if (username) {
            setTPrice(booking.totalPrice);
            setIsBook(true);
        } else {
            toast.info("Please login first to book a room");
        }
    };

    const floorBookingHandler = (floorIndex, roomName) => {
        console.log(booking.room)
        if (!booking.room?.[floorIndex]?.[roomName]?.isTrue) {
            setBooking({
                ...booking,
                totalPrice:
                    booking.totalPrice == null || undefined
                        ? 0 + +hostel.floor[floorIndex][roomName].price
                        : booking.totalPrice +
                        +hostel.floor[floorIndex][roomName].price,
                room: {
                    ...booking.room,
                    [floorIndex]: {
                        ...booking.room?.[floorIndex],
                        [roomName]: {
                            price: hostel.floor[floorIndex][roomName].price,
                            isTrue: true,
                        },
                    },
                },
            });
        } else {
            const updatedBooking = booking.room;
            delete updatedBooking?.[floorIndex]?.[roomName];
            if (Object.keys(updatedBooking[floorIndex]).length === 0) {
                delete updatedBooking[floorIndex];
            }
            setBooking({
                ...booking,
                room: updatedBooking,
                totalPrice:
                    booking.totalPrice -
                    +hostel.floor[floorIndex][roomName].price,
            });
        }
    };

    useEffect(() => {
        getReviews();
        createPayment();
    }, []);

    return (
        <>
            <div className="boys-hostel">
                <div className="hostel-top">
                    <div className="image-section">
                        <div>
                            <img
                                src={`http://localhost:5000/assets/${hostel.imagepath1}`}
                                className="hostel-img full"
                                onClick={() =>
                                    openImage(
                                        `http://localhost:5000/assets/${hostel.imagepath1}`
                                    )
                                }
                            />
                        </div>
                        <div className="two-img">
                            <img
                                src={`http://localhost:5000/assets/${hostel.imagepath2}`}
                                className="hostel-img"
                                onClick={() => openImage(`http://localhost:5000/assets/${hostel.imagepath2}`)}
                            />
                            <img
                                src={`http://localhost:5000/assets/${hostel.imagepath3}`}
                                className="hostel-img"
                                onClick={() => openImage(`http://localhost:5000/assets/${hostel.imagepath3}`)}
                            />
                        </div>
                    </div>
                    <div className="map-section">
                        <HostelDetailMap />
                    </div>
                    {selectedImage && (
                        <div
                            className="full-image-overlay"
                            onClick={closeImage}
                        >
                            <div className="full-image-container">
                                <span
                                    className="close-button"
                                    onClick={closeImage}
                                >
                                    &times;
                                </span>
                                <img
                                    src={selectedImage}
                                    className="full-image"
                                    alt="Hostel"
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="hostel-detail">
                    <h1>{hostel?.title}</h1>
                    <hr />
                    {/* <div className="description-review">
                        <div
                            className={`description ${
                                activeSection === "description" ? "active" : ""
                            }`}
                            onClick={() => switchSection("description")}
                        >
                            Description
                        </div>
                        <div
                            className={`reviews ${
                                activeSection === "reviews" ? "active" : ""
                            }`}
                            onClick={() => switchSection("reviews")}
                        >
                            Reviews
                        </div>
                    </div> */}
                    <div className="wrapper-aa">
                        {/* {activeSection === "description" && ( */}
                        <div className="description-onclick">
                            <h3>Hostel information</h3>
                            <p>{hostel?.description}</p>
                            {hostel.floor &&
                                Object.keys(hostel.floor).map((floorIndex) => (
                                    <>
                                        <div>Floor {+floorIndex}</div>
                                        {hostel.floor[floorIndex] &&
                                            Object.keys(
                                                hostel.floor[floorIndex]
                                            ).map((roomName) => (
                                                <>
                                                    <button
                                                        key={roomName}
                                                        className={`btn shadow-sm me-3 w-25 my-2 ${booking?.room?.[
                                                            floorIndex
                                                        ]?.[roomName]
                                                            ?.isTrue
                                                            ? "btn-success"
                                                            : "btn-light"
                                                            } `}
                                                        onClick={() =>
                                                            floorBookingHandler(
                                                                floorIndex,
                                                                roomName
                                                            )
                                                        }
                                                    >
                                                        <div>
                                                            <span className="text-capitalize">
                                                                {roomName}
                                                            </span>{" "}
                                                            Seater
                                                        </div>
                                                        <div>
                                                            Rs.{" "}
                                                            {
                                                                hostel.floor[
                                                                    floorIndex
                                                                ][roomName]
                                                                    .price
                                                            }
                                                        </div>
                                                    </button>
                                                </>
                                            ))}
                                    </>
                                ))}
                            <button
                                className=" btn btn-booking btn-secondary px-4 mt-4 "
                                onClick={() => {
                                    bookNowHandler();
                                }}
                                disabled={
                                    booking.room
                                        ? Object.keys(booking.room).length === 0
                                            ? true
                                            : false
                                        : true
                                }
                            >
                                {hostel.floor ? "Book now!" : "No rooms available"}
                            </button>
                        </div>
                        {/* )} */}
                        {/* {activeSection === "reviews" && ( */}
                        <div className="reviews-onclick">
                            <h3>Reviews</h3>
                            <div className="user-review">
                                {reviews &&
                                    reviews.map((review, i) => (
                                        <div key={i}>
                                            <p>
                                                <div>
                                                    <span className="user-name">
                                                        {review.username}
                                                    </span>
                                                    <span className="date">
                                                        {format(
                                                            review.createdAt
                                                        )}
                                                    </span>
                                                </div>
                                                <div>{review.review}</div>
                                            </p>
                                            <div>
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon
                                                        key={i}
                                                        className={
                                                            i < review.rating
                                                                ? "active"
                                                                : ""
                                                        }
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="comment-review">
                                <h4>Write a Review</h4>
                                <div className="star-rating">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className={
                                                i < hoverStar ? "star" : ""
                                            }
                                            onClick={() =>
                                                setReview(prev => ({
                                                    ...prev,
                                                    rating: i + 1,
                                                }))
                                            }
                                            onMouseEnter={() =>
                                                setHoverStar(i + 1)
                                            }
                                            onMouseLeave={() =>
                                                setHoverStar(review.rating)
                                            }
                                        />
                                    ))}
                                </div>
                                <div className="comment-section">
                                    <div>
                                        <textarea
                                            value={review.review}
                                            onChange={(e) =>
                                                setReview((prev) => ({
                                                    ...prev,
                                                    review: e.target.value,
                                                }))
                                            }
                                            placeholder="Share your experience"
                                        />
                                    </div>
                                    <div className="btn-submit">
                                        <button
                                            onClick={(e) => addReviewHandler(e)}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isBook && (
                        <div className="booking-section">
                            <div className="container">
                                <div
                                    className="close-button"
                                    onClick={() => setIsBook(false)}
                                >
                                    X
                                </div>
                                <h2>Book Hostel</h2>
                                <h1>{booking.hostel}</h1>
                                <div>
                                    <label>Stay Duration (in months)</label>
                                    <input
                                        type="number"
                                        value={booking.duration}
                                        min={1}
                                        onChange={(e) =>
                                            setBooking({
                                                ...booking,
                                                duration: e.target.value,
                                                totalPrice:
                                                    tPrice * e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <label>Starting Date</label>
                                    <input
                                        type="date"
                                        value={booking.startingDate}
                                        min={
                                            new Date()
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                        onChange={(e) =>
                                            setBooking({
                                                ...booking,
                                                startingDate: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex-column">
                                    <label>Details</label>
                                </div>
                                <div className="d-flex flex-column">
                                    <label>Room Description</label>
                                    {booking.room &&
                                        Object.keys(booking.room).map(
                                            (floorIndex) => (
                                                <>
                                                    <div>
                                                        Floor {+floorIndex}
                                                    </div>
                                                    {Object.keys(
                                                        booking.room[floorIndex]
                                                    ).map((roomName) => (
                                                        <>
                                                            <div className="d-flex justify-content-between">
                                                                <label className="text-capitalize ">
                                                                    {roomName}{" "}
                                                                    Seater :{" "}
                                                                </label>
                                                                <div className="text-end">
                                                                    Rs.
                                                                    {
                                                                        booking
                                                                            .room[
                                                                            floorIndex
                                                                        ][
                                                                            roomName
                                                                        ].price
                                                                    }
                                                                </div>
                                                            </div>
                                                        </>
                                                    ))}
                                                </>
                                            )
                                        )}
                                </div>
                                <div className="flex-row justify-content-between pt-3 border-top border-dark">
                                    <label className="d-block" >Total Amount :</label>
                                    <span className="d-block">
                                        Rs.{booking.totalPrice}
                                    </span>
                                </div>
                                <button
                                    className="btn btn-primary w-100 mt-3"
                                    onClick={() => verifyPayment()}
                                >
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}

                    {/* )} */}
                </div>
            </div>
        </>
    );
};
