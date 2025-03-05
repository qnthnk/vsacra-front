import React from 'react'
import CurrencyConverter from './CurrencyConverter.jsx'
import Weather from './Weather.jsx'
import Calculator from './Calculator.jsx'
import "../../styles/Footer.css"

const Footer = () => {
  return (
    <>
    <div className="card">
      <a className="social-link">
      <Calculator />
      </a>
      <a className="social-link">
      <Weather />
      </a>
      <a className="social-link">
      <CurrencyConverter />
      </a>
    </div>     
    </>        
  );
}

export default Footer
