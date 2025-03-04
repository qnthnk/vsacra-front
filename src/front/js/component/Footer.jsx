import React from 'react'
import CurrencyConverter from './CurrencyConverter.jsx'

const Footer = () => {
  return (
    <div className="navbar bg-dark border-bottom border-body" data-bs-theme="dark" style={{ position: "fixed", bottom: 0, width: "100%" }}>
      <div className="container d-flex justify-content-center align-items-between" style={{ maxHeight: "60px" }}>

        <div className='d-flex justify-content-center align-items-between'>
          <div className=''>
            <p className='text-white'>Gadget 01</p>
          </div>
          <div className=''>
            <p className='text-white'>Gadget 02</p>
          </div>
          <div className=''>
            <p className='text-white'>Gadget 03</p>
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
