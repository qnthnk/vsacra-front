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
    <>
    <div className="home">

      <div>
        <h1>NOTAS. BOTON DE EMERGENCIA ES DE ALI</h1>
        
      </div>
      <ul className="form">
        <div className="tags">
          <Link className="buttons" to="/chat">Mensajería (EDUARDO)</Link>
        </div>
        <div className="tags">
          <Link className="buttons" to="/chatbot">Chatbot (DANNY)</Link>
        </div>
        <div className="tags">
          <Link className="buttons" to="/contact-list">Contact List (RUBEN)</Link>
        </div>
        <div className="tags">
          <Link className="buttons" to="/freq-asked-questions">Preguntas Frecuentes (EDUARDO)</Link>
        </div>
        <div className="tags">
          <Link className="buttons" to="/help">Contactar Ayuda (EDUARDO)</Link>
        </div>
        <div className="tags">
          <Link className="buttons" to="/stats-and-reports">Estadísticas y reportes(ADMIN) (RUBEN)</Link>
        </div>
        <div className="tags">
          <Link className="buttons" to="/location-view">Vista de ubicación(RENAME PD) (DANNY Y ALI)</Link>
        </div>
        <div className="tags">
          <Link className="buttons" to="/admin-console">Consola de manejo de datos(ADMIN)</Link>
        </div>
      </ul>
    </div>
    </>
  )
}

export default Home
