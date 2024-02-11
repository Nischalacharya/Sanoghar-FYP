import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./HostelMap.scss";
import { LocationOn, Star } from "@mui/icons-material";
import { getVerifiedHostel } from "../../function/Hostel";
import { GetAllHostelReview } from "../../function/HostelReview";
import StarIcon from "@mui/icons-material/Star";

function HostelMap() {
  const [average, setAverage] = useState(0);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [reviews, setReviews] = useState({});
  const [viewport, setViewport] = useState({
    longitude: 85.31295,
    latitude: 27.712017,
    zoom: 10,
  });

  const getPins = async () => {
    try {
      setPins(await getVerifiedHostel());
    } catch (error) {
      console.log(error);
    }
  };

  const getReview = async () => {
    const res = await GetAllHostelReview();
    setReviews(res);
  };

  const getAvg = (title) => {
    setAverage(0);
    let count = 0;
    reviews &&
      reviews.map((item) => {
        if (item.hostel === title) {
          setAverage((prev) => (prev += item.rating));
          count++;
        }
      });
    setAverage((prev) => prev / count);
    setAverage(Math.round(average));
  };

  useEffect(() => {
    getPins();
    getReview();
  }, []);

  return (
    <div className="Map">
      <Map
        mapLib={maplibregl}
        initialViewState={viewport}
        mapboxAccessToken="sk.eyJ1Ijoic2hyZWVqYW4zNSIsImEiOiJjbGV0Z2owYzcxZzIwM3VydmFmaGczOHZ4In0.7GkO0WW9li6EjPoAwHVxLw"
        style={{ width: "100vw", height: "100vh", zIndex: "0" }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=mzxBoE1FbFirkKahjGeW"
      >
        {pins &&
          pins.map((pin) => (
            <div key={pin._id}>
              <Marker
                longitude={pin.latlng.lng}
                latitude={pin.latlng.lat}
                anchor="bottom"
                offsetLeft={0}
                offsetTop={0}
              >
                <LocationOn
                  style={{
                    fontSize: viewport.zoom * 3,
                    color: "red",
                    zIndex: "10",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setCurrentPlaceId(pin._id);
                    getAvg(pin.title);
                  }}
                />
              </Marker>

              {currentPlaceId == pin._id ? (
                <Popup
                  longitude={pin.latlng.lng}
                  latitude={pin.latlng.lat}
                  anchor="left"
                  closeOnClick={false}
                  onClose={() => setCurrentPlaceId(null)}
                  closeOnMove={() => setCurrentPlaceId(null)}
                >
                  <div className="card">
                    <div>Title: {pin.title}</div>
                    <div>Room: {pin.room}</div>
                    <div>Sex: {pin.sex}</div>
                    <div>Price: {pin.price}</div>
                    <div>Location: {pin.location}</div>
                    <div>Description: {pin.description}</div>
                    <div>
                      Average Rating:{" "}
                      {[...Array(Math.round(average))].map((a) => (
                        <StarIcon className="rating" />
                      ))}{" "}
                    </div>
                  </div>
                </Popup>
              ) : (
                ""
              )}
            </div>
          ))}
      </Map>
    </div>
  );
}

export default HostelMap;
