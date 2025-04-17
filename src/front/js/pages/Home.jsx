import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../store/appContext';
import './../../styles/home.css';
import HomeUser from './HomeUser.jsx';
import HomeAdmin from './HomeAdmin.jsx';

const Home = () => {
  const token = localStorage.getItem('token');
  const { actions } = useContext(Context);

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Estado para cambiar entre usuario y admin

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
    <div>
      {token ? (
        <div className='backpage'>
          <div className='containerH'>
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

            <div className="checkbox-wrapper-8">
            {isAdmin ? <HomeAdmin /> : <HomeUser />}
            </div>
          </div>
        </div>
      ) : (
        <div>Please log in to access this page.</div>
      )}
    </div>
  );
};

export default Home;
