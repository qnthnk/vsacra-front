import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "./../../styles/Register.css";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const LocationView = () => {
  const { store, actions } = useContext(Context);
  const [location, setLocation] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("La geolocalización no es soportada por este navegador.");
      return;
    }

    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          console.log("Ubicación obtenida:", { latitude, longitude });
        },
        (error) => {
          setError(`Error al obtener la ubicación: ${error.message}`);
        }
      );
    };

    getLocation();
  }, []);

  const handleButtonClick = async (type) => {
    if (!location) {
      setError("Ubicación no disponible.");
      return;
    }

    const placeType = {
      seguridad: "police",
      migrantes: "migrant_help",
      urgencias: "hospital",
    }[type];

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=5000&type=${placeType}&key=${GOOGLE_API_KEY}`
      );

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const firstResult = data.results[0];
        const { lat, lng } = firstResult.geometry.location;
        setSearchResult({ lat, lng });
      } else {
        setError("No se encontraron lugares cercanos.");
      }
    } catch (err) {
      console.error("Error al obtener la ubicación:", err);
      setError("Hubo un problema al obtener la ubicación.");
    }
  };

  return (
    <div>
      {location ? (
        <>
          <p>
            Latitud: {location.latitude}, Longitud: {location.longitude}
          </p>
          <div style={{ width: "100%", height: "400px" }}>
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              // LA API KEY DE GOOGLE MAPS ESTA DIRECTA. HAY QUE HACER QUE SE JALE DESDE EL ENV
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBolAw6yd2HGS04tN3DuJiIC1qWPiE4iVU&q=${
                searchResult
                  ? `${searchResult.lat},${searchResult.lng}`
                  : `${location.latitude},${location.longitude}`
              }`}
            ></iframe>
          </div>
        </>
      ) : (
        <p>Obteniendo ubicación...</p>
      )}

      <div className="d-grid gap-2 col-6 mx-auto">
        <button className="btn btn-primary" type="button" onClick={() => handleButtonClick("seguridad")}>
          Seguridad Pública
        </button>
        <button className="btn btn-primary" type="button" onClick={() => handleButtonClick("migrantes")}>
          Centros de ayuda para migrantes
        </button>
        <button className="btn btn-primary" type="button" onClick={() => handleButtonClick("urgencias")}>
          Atención médica de urgencias
        </button>
      </div>
    </div>
  );
};

export default LocationView;

             

             
