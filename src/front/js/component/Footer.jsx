import React from 'react'

const Footer = () => {
  return (
    <div className="fixed-bottom navbar bg-dark border-bottom border-body " data-bs-theme="dark">
      
      <div className="container d-flex justify-content-center align-items-between" style={{ maxHeight: "40px" }}>
     
        <div className='row ' >
          <div className='col-3'>
            <p className='text-white'>Gadget 01</p>
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
