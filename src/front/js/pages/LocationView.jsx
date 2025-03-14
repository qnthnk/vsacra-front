import React, { useEffect, useState, useContext } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Context } from "../store/appContext";

const libraries = ["places"];   
const mapContainerStyle = { width: "100%", height: "500px" };

const LocationView = () => {
    const { store, actions } = useContext(Context);
    const [selectedType, setSelectedType] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAPS_API,  
        libraries,
    });

    useEffect(() => {
        if (store.userLocation) {
            console.log("Ubicación detectada:", store.userLocation);
        }
    }, [store.userLocation]);

    useEffect(() => {
        if (selectedType && store.userLocation) {
            actions.fetchNearbyPlaces(selectedType);
        }
    }, [selectedType, store.userLocation]);

    if (loadError) return <p>Error cargando el mapa</p>;
    if (!isLoaded) return <p>Cargando mapa...</p>;

    return (
        <div>
            <div className="button-container">
                <button onClick={() => setSelectedType("hospital")}>Hospitales</button>
                <button onClick={() => setSelectedType("police")}>Policía</button>
                <button onClick={() => setSelectedType("embassy")}>Embajadas</button>
            </div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={store.userLocation || { lat: 9.9281, lng: -84.0907 }}  
                zoom={14}
            >
                {store.userLocation && <Marker position={store.userLocation} />}
                {store.nearbyPlaces.map((place) => (
                    <Marker
                        key={place.place_id}
                        position={{
                            lat: place.geometry.location.lat,
                            lng: place.geometry.location.lng,
                        }}
                        onClick={() => alert(`Dirección: ${place.vicinity}`)}
                    />
                ))}
            </GoogleMap>
        </div>
    );
};

export default LocationView;