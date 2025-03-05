import React, { useEffect, useContext, useState } from 'react'
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";
import './../../styles/home.css';
import { DiVim } from 'react-icons/di';




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
    <div className='backpage'>
    <div className="container">

      <div>
        
      </div>
      <ul className="forms">
          <Link className="login-button" to="/chat">Mensajería (EDUARDO)</Link>
          <Link className="login-button" to="/chatbot">Chatbot (DANNY)</Link>
          <Link className="login-button" to="/contact-list">Contact List (RUBEN)</Link>
          <Link className="login-button" to="/freq-asked-questions">Preguntas Frecuentes (EDUARDO)</Link>
          <Link className="login-button" to="/help">Contactar Ayuda (EDUARDO)</Link>
          <Link className="login-button" to="/stats-and-reports">Estadísticas y reportes(ADMIN) (RUBEN)</Link>
          <Link className="login-button" to="/location-view">Vista de ubicación(RENAME PD) (DANNY Y ALI)</Link>
          <Link className="login-button" to="/admin-console">Consola de manejo de datos(ADMIN)</Link>
      </ul>
    </div>
    </div>
  )
}

export default Home
