import React, { useEffect, useState, useContext } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { RiHome6Fill } from "react-icons/ri";
import Swal from 'sweetalert2';
import { FaInfo } from "react-icons/fa";


const libraries = ["places"];
const mapContainerStyle = { width: "100%", height: "350px" };

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
        <div className="backpage">
            <div className="containerH">
                {!isLoaded ? (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        zIndex: 10
                    }}>
                        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Cargando...</p>
                    </div>
                ) : (
                    <>
                        {/* MODAL DEMO */}
                        <button type="button" className="DemoButton" style={{ width: "50px", height: "50px", borderRadius: "50%" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <FaInfo className='DemoButton' />
                        </button>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div className="modal-content demoContainer">
                                    <div className="modal-body">
                                        <div className=''>Se presentan al menos 3 tipos de ubicaciones. Pueden ser oficinas de gobierno, bomberos, auxilio, policia o cualquier instalación que se considere prudente. Si son lugares nuevos, se procede a darlos de alta en google para que puedan aparecer </div>
                                    </div>
                                    <div className="modal-content">
                                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* MODAL DEMO */}
                        <div className="container p-3">
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
                                            onClick={() =>
                                                Swal.fire(
                                                    `${place.displayName?.text || "Sin nombre"}\nDirección: ${place.formattedAddress}\nTeléfono: ${place.internationalPhoneNumber || "No disponible"}`
                                                )
                                            }
                                        />
                                    )
                                ))}
                            </GoogleMap>
                            <div className="" style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                                <button className='login-buttonesMap m-1' onClick={() => setSelectedType("hospital")}>Hospitales</button>
                                <button className='login-buttonesMap m-1' onClick={() => setSelectedType("police")}>Policía</button>
                                <button className='login-buttonesMap m-1' onClick={() => setSelectedType("city_hall")}>Gobierno</button>
                            </div>

                            <div className="container p-2" style={{ borderRadius: "none" }}>
                                {store.nearbyPlaces.length > 0 ? (
                                    store.nearbyPlaces.map((place, index) => (
                                        <div key={index} className="containerData">
                                            <h2>{place.displayName?.text || "Sin nombre"}</h2>
                                            <p>{place.formattedAddress || "Dirección desconocida"}</p>
                                            {place.internationalPhoneNumber && (
                                                <p><hr />Teléfono: {place.internationalPhoneNumber}</p>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    // PENDIENTE ARREGLAR ESTILO DEL TEXTO
                                    <p style={{}}>Presione la opción que desee para obtener las ubicaciones</p>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LocationView;