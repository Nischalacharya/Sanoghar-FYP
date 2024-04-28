import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Hosteldetail.scss";
import { getVerifiedHostel } from "../../function/Hostel";
import { useDispatch } from "react-redux";
import { selectHostel } from "../../redux/Index";
import StarIcon from "@mui/icons-material/Star";
import HostelImg from "../../assets/img/HostelImg.jpg";
import MultiRangeSlider from "multi-range-slider-react";
import { GetAllHostelReview } from "../../function/HostelReview";
import { toast } from 'react-toastify'

export const Hostel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [hostels, setHostels] = useState([]);
    const [filteredHostels, setFilteredHostels] = useState([]);
    const [filter, setFilter] = useState({});
    const [isFilter, setIsFilter] = useState(false);
    const [hoverStar, setHoverStar] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [hostelReviews, setHostelReviews] = useState([]);

    const getHostels = async () => {
        const res = await getVerifiedHostel();
        setHostels(res);
    };

    const getAllHostelReview = async () => {
        const res = await GetAllHostelReview();
        setHostelReviews(res);
    }

    const seeMoreHandler = (e, hostel) => {
        e.preventDefault();
        dispatch(selectHostel({ hostel }));
        navigate("/hosteldetail");
    };

    const filterHandler = () => {
        console.log(filter)
        const filteredHostels = hostels.filter(hostel => {
            if (filter.minPrice && filter.maxPrice) {
                const floorPrices = Object.values(hostel.floor).flatMap(room => Object.values(room).map(r => parseInt(r.price)));
                const minPrice = Math.min(...floorPrices);
                const maxPrice = Math.max(...floorPrices);

                if (filter.minPrice > maxPrice || filter.maxPrice < minPrice) {
                    return false;
                }

            }
            if (filter.sex && filter.sex.length > 0 && !filter.sex.includes(hostel.sex)) {
                return false;
            }
            if (filter.floor && filter.floor.length > 0) {
                const hostelFloors = Object.keys(hostel.floor);
                if (!filter.floor.some(floor => hostelFloors.includes(floor))) {
                    return false;
                }
            }
            if (filter.room && filter.room.length > 0) {
                const hostelRooms = Object.values(hostel.floor).flatMap(room => Object.keys(room));
                if (!filter.room.some(room => hostelRooms.includes(room))) {
                    return false;
                }
            }
            const reviews = hostelReviews.filter(review => review.hostel === hostel.title)

            let avg = 0;
            reviews.map(hostel => avg += hostel.rating);
            const avgRating = Math.floor(avg / reviews.length);


            if (filter.rating && avgRating != filter.rating) {
                return false;
            }
            return true;
        });

        setFilteredHostels(filteredHostels);
        setIsFilter(true);
        setCurrentPage(1);
    };
    const genderChangeHandler = (e) => {
        const { value, checked } = e.target;
        setFilter(prevFilter => ({
            ...prevFilter,
            sex: checked ? [...(prevFilter.sex || []), value] : prevFilter.sex.filter(item => item !== value)
        }));
        if (Object.keys(filter.sex).length === 0)
            delete filter.sex
    };

    const bedChangeHandler = (e) => {
        const { value, checked } = e.target;
        setFilter(prevFilter => ({
            ...prevFilter,
            room: checked ? [...(prevFilter.room || []), value] : prevFilter.room.filter(item => item !== value)
        }));
    };

    const floorChangeHandler = (e) => {
        const { value, checked } = e.target;
        setFilter(prevFilter => ({
            ...prevFilter,
            floor: checked ? [...(prevFilter.floor || []), value] : prevFilter.floor.filter(item => item !== value)
        }));
    };

    useEffect(() => {
        getHostels();
        getAllHostelReview();
    }, []);

    const hostelsPerPage = 5;
    const indexOfLastHostel = currentPage * hostelsPerPage;
    const indexOfFirstHostel = indexOfLastHostel - hostelsPerPage;
    const currentHostels = isFilter ? filteredHostels.slice(indexOfFirstHostel, indexOfLastHostel) : hostels.slice(indexOfFirstHostel, indexOfLastHostel);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <div className="hostel-boys">
                <div className="hostel-filter">
                    <h3>Filter</h3>
                    <div className="filterGroup">
                        <label htmlFor="slider">Price: </label>
                        <MultiRangeSlider
                            style={{ border: "none", boxShadow: "none" }}
                            ruler={false}
                            min={0}
                            max={15000}
                            maxValue={15000}
                            onInput={(e) => {
                                setFilter(prev => ({ ...prev, minPrice: e.minValue, maxPrice: e.maxValue }));
                            }}
                        />
                        <div className="d-flex justify-content-between" >
                            <div>min :  {filter.minPrice}</div>
                            <div>max :  {filter.maxPrice}</div>
                        </div>
                    </div>
                    <div className="filterGroupGender">
                        <label>Gender: </label>
                        <div className="genderGroup">
                            <div className="genderButtons">
                                <input
                                    type="checkbox"
                                    value="Boys"
                                    checked={filter.sex?.includes("Boys")}
                                    onChange={(e) => genderChangeHandler(e)}
                                />
                                <label>Boys</label>
                            </div>
                            <div className="genderButtons">
                                <input
                                    type="checkbox"
                                    value="Girls"
                                    checked={filter.sex?.includes("Girls")}
                                    onChange={(e) => genderChangeHandler(e)}
                                />
                                <label>Girls</label>
                            </div>
                        </div>
                    </div>
                    <div className="filterGroup">
                        <label>Floor: </label>
                        <div className="genderGroup">
                            <div className="genderButtons">
                                <input
                                    type="checkbox"
                                    value="1"
                                    checked={filter.floor?.includes("1")}
                                    onChange={(e) => floorChangeHandler(e)}
                                />
                                <label>One</label>
                            </div>
                            <div className="genderButtons">
                                <input
                                    type="checkbox"
                                    value="2"
                                    checked={filter.floor?.includes("2")}
                                    onChange={(e) => floorChangeHandler(e)}
                                />
                                <label>Two</label>
                            </div>
                            <div className="genderButtons">
                                <input
                                    type="checkbox"
                                    value="3"
                                    checked={filter.floor?.includes("3")}
                                    onChange={(e) => floorChangeHandler(e)}
                                />
                                <label>Three</label>
                            </div>
                            <div className="genderButtons">
                                <input
                                    type="checkbox"
                                    value="4"
                                    checked={filter.floor?.includes("4")}
                                    onChange={(e) => floorChangeHandler(e)}
                                />
                                <label>Four</label>
                            </div>
                            <div className="genderButtons">
                                <input
                                    type="checkbox"
                                    value="5"
                                    checked={filter.floor?.includes("5")}
                                    onChange={(e) => floorChangeHandler(e)}
                                />
                                <label>Five</label>
                            </div>
                        </div>
                    </div>
                    <div className="filterGroup">
                        <label>Seaters: </label>
                        <div className="genderGroup">
                            <div className="genderButtons">
                                <input
                                    type="checkbox"
                                    value="one"
                                    checked={filter.room?.includes("one")}
                                    onChange={(e) => bedChangeHandler(e)}
                                />
                                <label>One</label>
                            </div>
                            <div className="genderButtons">
                                <input
                                    type="checkbox"
                                    value="two"
                                    checked={filter.room?.includes("two")}
                                    onChange={(e) => bedChangeHandler(e)}
                                />
                                <label>Two</label>
                            </div>
                            <div className="genderButtons">
                                <input
                                    type="checkbox"
                                    value="three"
                                    checked={filter.room?.includes("three")}
                                    onChange={(e) => bedChangeHandler(e)}
                                />
                                <label>Three</label>
                            </div>
                            <div className="genderButtons">
                                <input
                                    type="checkbox"
                                    value="four"
                                    checked={filter.room?.includes("four")}
                                    onChange={(e) => bedChangeHandler(e)}
                                />
                                <label>Four</label>
                            </div>
                            <div className="genderButtons">
                                <input
                                    type="checkbox"
                                    value="five"
                                    checked={filter.room?.includes("five")}
                                    onChange={(e) => bedChangeHandler(e)}
                                />
                                <label>Five</label>
                            </div>
                        </div>
                    </div>
                    <div className="star-rating">
                        <label>Rating: </label>
                        <div className="starGroupp">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon
                                    key={i}
                                    className={
                                        i < hoverStar ? "star" : "inlinestar"
                                    }
                                    onClick={() => { filter.rating === i + 1 ? delete filter.rating : setFilter(prev => ({ ...prev, rating: i + 1 })) }
                                    }
                                    onMouseEnter={() => setHoverStar(i + 1)}
                                    onMouseLeave={() =>
                                        setHoverStar(filter.rating)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={(e) => filterHandler(e)}
                        className="searchBTN"
                    >
                        Search
                    </button>
                </div>
                <div className="hostelWrapper">
                    {currentHostels.map((hostel) => (
                        <div className="hostel-boys-item" key={hostel._id}>
                            <div>
                                <img
                                    src={
                                        hostel.imagepath1 &&
                                            hostel.imagepath1 !== "undefined"
                                            ? `http://localhost:5000/assets/${hostel.imagepath1}`
                                            : HostelImg
                                    }
                                />
                            </div>
                            <div className="hostel-highlight">
                                <div className="highlight-one">
                                    <h2>{hostel.title}</h2>
                                    <p className="address-hostel">
                                        {hostel.location}
                                    </p>
                                    <p className="hostel-offer">
                                        Wifi&middot;24hrElectricity&middot; CCTV
                                        &middot;Hotwater
                                    </p>
                                    <p className="sex">{hostel.sex}</p>
                                </div>
                                <div className="highlight-two">
                                    <div className="btn-see-more">
                                        <button
                                            onClick={(e) =>
                                                seeMoreHandler(e, hostel)
                                            }
                                        >
                                            {`See More >>`}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    {hostels.length > hostelsPerPage && (
                        <ul className="pagination-list">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            {[
                                ...Array(
                                    Math.ceil(hostels.length / hostelsPerPage)
                                ),
                            ].map((_, index) => (
                                <li key={index} className="pagination-item">
                                    <button
                                        onClick={() => paginate(index + 1)}
                                        className={
                                            currentPage === index + 1
                                                ? "pagination-link active"
                                                : "pagination-link"
                                        }
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={
                                    currentPage ===
                                    Math.ceil(hostels.length / hostelsPerPage)
                                }
                            >
                                Next
                            </button>
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};
