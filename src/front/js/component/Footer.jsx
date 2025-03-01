import React from 'react'

const Footer = () => {
  return (
    <div className="navbar bg-dark border-bottom border-body" data-bs-theme="dark" style={{ position: "relative", bottom: 0, width: "100%" }}>
      <div className="container d-flex justify-content-center align-items-between" style={{ maxHeight: "40px" }}>
      
        <div className='row'>
          <div className='col-3'>
            <p className='text-white'>Gadget 01</p>
            <h1>ENCARGADO ALI</h1>
      <h1>DO NOT TOUCH JUEPUTA</h1>
          </div>
          <div className='col-3'>
            <p className='text-white'>Gadget 02</p>
          </div>
          <div className='col-3'>
            <p className='text-white'>Gadget 03</p>
          </div>
          <div className='col-3'>
            <p className='text-white'>Gadget 04</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
