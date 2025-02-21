import React from 'react'
import "./StatsAndReports.css"
import "../component/DashboardAdminItems.jsx"
import example1 from "../../img/white-wall-textures.jpg"
import example2 from "../../img/example2.jpeg"
import example3 from "../../img/example3.jpeg"
import DashboardAdminItems from '../component/DashboardAdminItems.jsx'

const StatsAndReports = () => {
  return (
    <div className="StatsAndReports">
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={example1} className="d-block w-100" alt="..." style={{ height: "500px", width: "100%"}} />
            <div className="carousel-caption d-none d-md-block">
              <DashboardAdminItems />
             



              <h5 style={{color:"black"}}>First slide label</h5>
              <p style={{color:"black"}}>Some representative placeholder content for the second slide.</p>
           
            </div>
          </div>
          <div className="carousel-item">
            <img src={example1} className="d-block w-100" alt="..." style={{ height: "500px", width: "100%" }} />
            <div className="carousel-caption d-none d-md-block">
              <h5 style={{color:"black"}}>Second slide label</h5>
              <p style={{color:"black"}}>Some representative placeholder content for the second slide.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={example1} className="d-block w-100" alt="..." style={{ height: "500px", width: "100%" }} />
            <div className="carousel-caption d-none d-md-block">
              <h5 style={{color:"black"}}>Third slide label</h5>
              <p style={{color:"black"}}>Some representative placeholder content for the third slide.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

    </div>
  )
}

export default StatsAndReports