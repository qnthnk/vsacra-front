import React, { useEffect, useContext, useState } from 'react'
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";
import './../../styles/home.css';




const Home = () => {
  const admin = JSON.parse(localStorage.getItem('admin'));
  const token = localStorage.getItem('token');
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
    <div>
     
    <div className='backpage'>
    <div className="container">
      <ul className="forms">
      {token && (
          <Link className="login-button" to="/chat">Mensajería (EDUARDO)</Link>
        )}
        {token && (
          <Link className="login-button" to="/chatbot">Chatbot (DANNY)</Link>
        )}
        {token && (
          <Link className="login-button" to="/contact-list">Contact List (RUBEN)</Link>
        )}
        {token && (
          <Link className="login-button" to="/freq-asked-questions">Preguntas Frecuentes (EDUARDO)</Link>
        )}
        {token && (
          <Link className="login-button" to="/help">Contactar Ayuda (EDUARDO)</Link>
        )}
        {token && admin && (
          <Link className="login-button" to="/stats-and-reports">Estadísticas y reportes(ADMIN) (RUBEN)</Link>
        )}
        {token && (
          <Link className="login-button" to="/location-view">Vista de ubicación(RENAME PD) (DANNY Y ALI)</Link>
        )}
        {token && admin && (
          <Link className="login-button" to="/admin-console">Consola de manejo de datos(ADMIN)</Link>
        )}
      </ul>
    
      
    </div>
    </div>
  ) : (
    <div>
        <h1>Por favor inicia sesión</h1>
        <Link to="/login">Iniciar sesión</Link>
      </div>
    )}
  </div>
  )
}

export default Home
