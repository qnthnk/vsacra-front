import React, { useEffect, useContext, useState } from 'react'
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";
import './../../styles/home.css';
import { TbMessageChatbotFilled } from "react-icons/tb";
import { FaChartPie } from "react-icons/fa";
import { LiaMapSolid } from "react-icons/lia";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";




const HomeAdmin = () => {
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
          actions.setUserLocation(latitude, longitude);
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
      {token ? (
        <>
          <h2 className='headingH'>Inicio</h2>
          <div className='formis'>

                            {token && (
                <Link className='Login-buttonesAdmin' to='/admin-console'>
                  <MdOutlineDashboardCustomize style={{ fontSize: '4em' }} />
                  <p className='button-text'>Consola</p>
                </Link>
              )}
              {token && (
                <Link className='Login-buttonesAdmin' to='/dashboard-edition'>
                  <LiaMapSolid style={{ fontSize: '4em' }} />
                  <p className='button-text'> Mapas</p>
                </Link>
              )}
              {token && (
                <Link className='Login-buttonesAdmin' to='/stats-and-reports'>
                  <FaChartPie style={{ fontSize: '4em' }} />
                  <p className='button-text'>Estadísticas</p>
                </Link>
              )}

              {token && (
                <Link className='Login-buttonesAdmin' to='/chatbot'>
                  <TbMessageChatbotFilled style={{ fontSize: '4em' }} />
                  <p className='button-text'>Chatbot</p>
                </Link>
              )}
                            {token && (
                <Link className='Login-buttonesAdmin' to='/blog'>
                  <FaAddressCard style={{ fontSize: '4em' }} />
                  <p className='button-text'>Expedientes</p>
                </Link>
              )} 
              {token && (
                <Link className='Login-buttonesAdmin' to='/blog'>
                  <TbReportSearch style={{ fontSize: '4em' }} />
                  <p className='button-text'>Reportes</p>
                </Link>
              )} 

              {/* {token && admin && (
                <Link className='Login-buttonesAdmin' to='/stats-and-reports'>
                  <p>Estadísticas y reportes(ADMIN)</p>
                </Link>
              )}
              {token && admin && (
                <Link className='Login-buttonesAdmin' to='/admin-console'>
                  <p>Consola de manejo de datos(ADMIN)</p>
                </Link>
              )} */}

          </div>
        </>
      ) : (
        <div>
          <h1>Por favor inicia sesión</h1>
          <Link to='/login'>Iniciar sesión</Link>
        </div>
      )}
    </div>
  );
};

export default HomeAdmin
