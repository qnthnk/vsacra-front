import React, { useEffect, useContext, useState } from 'react'
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";




const Home = () => {
  const { store, actions } = useContext(Context);

  const [location, setLocation] = useState(null);
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
          setLocation({ latitud: latitude, longitud: longitude });
          console.log("ubiv", location);
        },
        (error) => {
          setError("Error al obtener la ubicación: ", error);
        }
      );
    };

    getLocation();
  }, []);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">

      <div>
        <h1>NOTAS. BOTON DE EMERGENCIA ES DE ALI</h1>
        <h2>Ubicación del Usuario</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {location ? (
          <p>
            Latitud: {location.latitud}, Longitud: {location.longitud}
            <h2>AHUEVOOOO</h2>
          </p>

        ) : (
          <p>Obteniendo ubicación...</p>
        )}
      </div>
      <ul className="list-group w-auto">
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/chat">Mensajería (EDUARDO)</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/chatbot">Chatbot (DANNY)</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/contact-list">Contact List (RUBEN)</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/freq-asked-questions">Preguntas Frecuentes (EDUARDO)</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/help">Contactar Ayuda (EDUARDO)</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/stats-and-reports">Estadísticas y reportes(ADMIN) (RUBEN)</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/location-view">Vista de ubicación(RENAME PD) (DANNY Y ALI)</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/admin-console">Consola de manejo de datos(ADMIN)</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
