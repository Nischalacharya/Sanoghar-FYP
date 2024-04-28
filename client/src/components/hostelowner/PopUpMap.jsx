import React, { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Owner.scss';

function PopUpMap({ mapToggler, setHostel }) {

    const fetchLocation = async (e) => {
        const { lng, lat } = e.lngLat;

        try {
            const apiKey = 'e02365b9405c4c429980725da59c1ab5';
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`);
            const data = await response.json();

            if (data.results.length > 0) {
                const placeName = data.results[0].formatted;
                setHostel(hostel => ({ ...hostel, location: placeName, latlng: { lat, lng } }));
                mapToggler();
            }
        } catch (error) {
            console.error('Error fetching place name:', error);
        }
    }

    return (
        <div className='popupmap'>
            <div className='map'>
                <button className='close' onClick={() => mapToggler()} > X </button>
                <Map mapLib={maplibregl}
                    initialViewState={{
                        longitude: 85.31295,
                        latitude: 27.712017,
                        zoom: 10
                    }}
                    mapboxAccessToken="sk.eyJ1Ijoic2hyZWVqYW4zNSIsImEiOiJjbGV0Z2owYzcxZzIwM3VydmFmaGczOHZ4In0.7GkO0WW9li6EjPoAwHVxLw"
                    style={{ width: "60vw", height: "70vh", zIndex: "0" }}
                    mapStyle="https://api.maptiler.com/maps/streets/style.json?key=mzxBoE1FbFirkKahjGeW"
                    onDblClick={(e) => fetchLocation(e)}
                >
                </Map>
            </div>
        </div>
    )
}

export default PopUpMap;