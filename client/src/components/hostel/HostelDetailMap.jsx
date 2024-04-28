import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Hosteldetail.scss";
import { LocationOn } from "@mui/icons-material";
import { useSelector } from "react-redux";

function HostelDetailMap() {
    const hostel = useSelector((state) => state.selectedHostel.latlng);
    const [viewport, setViewport] = useState({
        longitude: hostel.lng,
        latitude: hostel.lat,
        zoom: 12,
    });

    useEffect(() => {
        setViewport((prevViewport) => ({
            ...prevViewport,
            longitude: hostel.lng,
            latitude: hostel.lat,
        }));
    }, [hostel]);

    return (
        <div className="map flex-grow-1">
            <Map
                mapLib={maplibregl}
                {...viewport}
                style={{
                    width: "30vw",
                    height: "38vh",
                    zIndex: "0",
                    borderRadius: 8,
                }}
                mapStyle="https://api.maptiler.com/maps/streets/style.json?key=mzxBoE1FbFirkKahjGeW"
                onMove={(e) => setViewport(e.viewState)}
            >
                <Marker
                    longitude={hostel.lng}
                    latitude={hostel.lat}
                    anchor="bottom"
                    offsetLeft={0}
                    offsetTop={0}
                >
                    <LocationOn
                        style={{
                            fontSize: 12 * 2.3,
                            color: "red",
                            zIndex: "10",
                            cursor: "pointer",
                        }}
                    ></LocationOn>
                </Marker>
            </Map>
        </div>
    );
}

export default HostelDetailMap;
