import { useEffect, useState } from "react";
import { getVerifiedHostel } from "../../function/Hostel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectHostel } from "../../redux/Index";
export const FeaturedHostel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hostels, setHostels] = useState([]);

  let randomArr = [];

  const getRandomNum = (len) => {
    let randomNum = Math.floor(Math.random() * len);
    if (randomArr.includes(randomNum)) return getRandomNum(len);
    randomArr = [...randomArr, randomNum];
    return randomNum;
  };

  const getHostels = async () => {
    const res = await getVerifiedHostel();
    let hostelArr = [...Array(res.length)].map((_, i) => {
      return res[getRandomNum(res.length)];
    });
    setHostels(hostelArr);
  };

  const hostelHandler = (hostel) => {
    dispatch(selectHostel({ hostel }));
    navigate("/hosteldetail");
  };

  useEffect(() => {
    getHostels();
  }, []);

  return (
    <>
      <div className="featured-hostel-item">
        <h1>Featured Hostel</h1>
        <div className="featured-hostel">
          {hostels &&
            hostels.slice(0, 4).map((hostel, i) => (
              <div className="hostel" key={i} onClick={() => hostelHandler(hostel)}>
                <img
                  src={`http://localhost:5000/assets/${hostel.imagepath1}`}
                  className="featured-img"
                />
                <div className="featured-text">
                  <p className="hostel-name">{hostel.title}</p>
                  <p className="hostel-address">
                    {hostel.location.split(",").slice(-3, -1).join(",")}
                  </p>
                  <p className="hostel-rating">
                    <i className="fa-regular fa-star"></i>3.5
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
