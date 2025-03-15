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
                center={store.userLocation}
                zoom={14}
            >
                {store.userLocation && <Marker position={store.userLocation} />}
                {store.nearbyPlaces?.map((place, index) => (
                    place.location && (
                        <Marker
                            key={index}
                            position={{
                                lat: place.location.latitude,
                                lng: place.location.longitude,
                            }}
                            onClick={() => alert(`Dirección: ${place.formattedAddress}`)}
                        />
                    )
                ))}
            </GoogleMap>

            <div className="places-list">
                {store.nearbyPlaces.length > 0 ? (
                    store.nearbyPlaces.map((place, index) => (
                        <div key={index} className="place-item">
                            <h2>{place.displayName?.text || "Sin nombre"}</h2>
                            <p>{place.formattedAddress || "Dirección desconocida"}</p>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron lugares cercanos</p>
                )}
            </div>
        </div>
    );
};

export default LocationView;