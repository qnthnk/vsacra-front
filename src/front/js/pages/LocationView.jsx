import React, { useEffect, useState } from "react";

const LocationView = () => {
    const [map, setMap] = useState(null);
    const [service, setService] = useState(null);
    const [infowindow, setInfowindow] = useState(null);

    useEffect(() => {
        const loadMap = () => {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBG_tnzTipDhubQSgV4mrWm3AYqh2odCdg&libraries=places`;
            script.async = true;
            script.onload = () => {
                const defaultLocation = { lat: 9.9281, lng: -84.0907 }; // Example: San José, Costa Rica
                const googleMap = new window.google.maps.Map(document.getElementById("map"), {
                    center: defaultLocation,
                    zoom: 13,
                });

                setMap(googleMap);
                setService(new window.google.maps.places.PlacesService(googleMap));
                setInfowindow(new window.google.maps.InfoWindow());
            };
            document.body.appendChild(script);
        };

        loadMap();
    }, []);

    const searchPlaces = (type) => {
        if (!map || !service) return;

        const request = {
            location: map.getCenter(),
            radius: "5000",
            type: [type],
        };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                results.forEach((place) => {
                    if (place.geometry && place.geometry.location) {
                        const marker = new window.google.maps.Marker({
                            map,
                            position: place.geometry.location,
                            title: place.name,
                        });

                        marker.addListener("click", () => {
                            infowindow.setContent(place.name || "");
                            infowindow.open(map, marker);
                        });
                    }
                });
                map.setCenter(results[0]?.geometry.location || map.getCenter());
            } else {
                alert("No places found.");
            }
        });
    };

    return (
        <div>
            <div className="button-container">
                <button onClick={() => searchPlaces("hospital")}>Hospitals</button>
                <button onClick={() => searchPlaces("police")}>Police Stations</button>
                <button onClick={() => searchPlaces("embassy")}>Embassies</button>
            </div>
            <div id="map" style={{ height: "500px", width: "100%" }}></div>
        </div>
    );
};

export default LocationView;
