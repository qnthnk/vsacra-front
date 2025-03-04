import React from 'react'
import CurrencyConverter from './CurrencyConverter.jsx'
import Weather from './Weather.jsx'
import Calculator from './Calculator.jsx'

const Footer = () => {
  return (
    <div className="navbar bg-dark border-bottom border-body" data-bs-theme="dark" style={{ position: "fixed", bottom: 0, width: "100%" }}>
      <div className="container d-flex justify-content-center align-items-between" style={{ maxHeight: "60px" }}>

        <div className='d-flex justify-content-center align-items-between'>
          <div className=''>
            <p className='text-white'></p>
          </div>
          <div className='mb-2'>
            <Calculator />
          </div>
          <div className='mb-2'>
            <Weather />
          </div>
          <div className='mb-2'>
            <CurrencyConverter />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
