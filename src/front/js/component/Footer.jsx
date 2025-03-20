import React from 'react'
import CurrencyConverter from './CurrencyConverter.jsx'
import Weather from './Weather.jsx'
import Calculator from './Calculator.jsx'
import EmergencyButton from './EmergencyButton.jsx'
import "../../styles/Footer.css"
import { RiHome6Fill } from "react-icons/ri";

const Footer = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;




  return (
    <>
      <div className="card">
        <div className='buttons'>
          <Calculator />
          <Weather />
          <CurrencyConverter />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="login-buttonesN" onClick={() => {
            const isLoggedIn = true; // Aquí deberías verificar si el usuario está loggeado correctamente
            if (isLoggedIn) {
              window.location.href = '/home';
            } else {
              window.location.href = '/login';
            }
          }}><RiHome6Fill style={{fontSize:"2em"}}/></button>
        </div>
        <div className='social-link'>
          <EmergencyButton />
        </div>
      </div>
    </>
  );
}

export default Footer
