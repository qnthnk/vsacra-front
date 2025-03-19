import React from 'react'
import CurrencyConverter from './CurrencyConverter.jsx'
import Weather from './Weather.jsx'
import Calculator from './Calculator.jsx'
import EmergencyButton from './EmergencyButton.jsx'
import "../../styles/Footer.css"

const Footer = () => {
  return (
    <>
      <div className="card">
        <div className='buttons'>
          <Calculator />
          <Weather />
          <CurrencyConverter />
          </div>
          <div className='social-link'>
          <EmergencyButton />
          </div>
      </div>
    </>
  );
}

export default Footer
