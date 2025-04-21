import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { Navigate } from 'react-router-dom';
import './../../styles/home.css';
import HomeUser from './HomeUser.jsx';
import HomeAdmin from './HomeAdmin.jsx';
import { FaInfo } from "react-icons/fa";

const Home = () => {
  const token = localStorage.getItem('token');
  const { actions } = useContext(Context);

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); 

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("La geolocalización no es soportada por este navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitud: latitude, longitud: longitude });
        actions.setUserLocation(latitude, longitude);
        console.log("Ubicación:", location);
      },
      (error) => {
        setError("Error al obtener la ubicación: ", error);
      }
    );
  }, []);

  // Función para manejar el cambio del checkbox
  const handleToggle = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <>
      {token ? (
        <div className='backpage'>
          <div className='containerH'>
            {/* MODAL DEMO */}
            <button type="button" className="DemoButton" style={{ width: "50px", height: "50px", borderRadius: "50%" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
              <FaInfo className='DemoButton' />
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content demoContainer">
                  <div className="modal-body">
                    <div className=''>Debajo de la leyenda de "Usuario" se encuentra un botón que activa el modo Admin. Puedes cambiar las vistas para tener acceso a ambas consolas. Esto es solo para el Demo. Cuando el sistema está en funcionamiento, cada rol de usuario puede ver únicamente las opciones que le corresponden.</div>
                  </div>
                  <div className="modal-content">
                    <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
            {/* MODAL DEMO */}
            <div className="checkbox-wrapper-8 mt-5">
              <input
                type="checkbox"
                id="cb3-8"
                className="tgl tgl-skewed"
                checked={isAdmin}
                onChange={handleToggle}
              />
              <label
                htmlFor="cb3-8"
                data-tg-on="Admin"
                data-tg-off="Usuario"
                className="tgl-btn"
              ></label>
            </div>

            <div className="toggle-wrapper">
              <input className="toggle-checkbox" type="checkbox" checked={isAdmin} onChange={handleToggle} />
              <div className="toggle-container">
                <div className="toggle-button">
                  <div className="toggle-button-circles-container">
                    <div className="toggle-button-circle"></div>
                    <div className="toggle-button-circle"></div>
                    <div className="toggle-button-circle"></div>
                    <div className="toggle-button-circle"></div>
                    <div className="toggle-button-circle"></div>
                    <div className="toggle-button-circle"></div>
                    <div className="toggle-button-circle"></div>
                    <div className="toggle-button-circle"></div>
                    <div className="toggle-button-circle"></div>
                    <div className="toggle-button-circle"></div>
                    <div className="toggle-button-circle"></div>
                    <div className="toggle-button-circle"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="checkbox-wrapper-8">
              {isAdmin ? <HomeAdmin /> : <HomeUser />}
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
      </>
  );
};

export default Home;