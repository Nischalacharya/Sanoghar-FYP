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
                style={{ width: "100vw", height: "100vh", zIndex: "0" }}
                mapStyle="https://api.maptiler.com/maps/streets/style.json?key=mzxBoE1FbFirkKahjGeW"
                onMove={(e) => setViewport(e.viewState)}
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
                                        <div>
                                            <span>Title:</span> {pin.title}
                                        </div>
                                        <div>
                                            <span>Gender:</span> {pin.sex}
                                        </div>
                                        <div>
                                            <span>Location:</span>{" "}
                                            {pin.location}
                                        </div>
                                        <div>
                                            <span>Description:</span>{" "}
                                            {pin.description}
                                        </div>
                                        <div>
                                            <span>Average Rating: </span>
                                            {average > 0
                                                ? [
                                                    ...Array(
                                                        Math.round(
                                                            average / 2
                                                        )
                                                    ),
                                                ].map((e, i) => (
                                                    <StarIcon
                                                        key={i}
                                                        className="rating"
                                                    />
                                                ))
                                                : "No Rating Yet"}
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
