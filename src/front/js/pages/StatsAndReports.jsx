import React from 'react'
import "./StatsAndReports.css"
import example1 from "../../img/white-wall-textures.jpg"
import example2 from "../../img/example2.jpeg"
import example3 from "../../img/example3.jpeg"
import DashboardAdminSocioDem from '../component/DashboardAdminSocioDem.jsx'


const StatsAndReports = () => {
  return (
    <div className="StatsAndReports">
      <div className='container-fluid'>
         <DashboardAdminSocioDem />
         </div>
<h3>Explicacion del panel triple, uso e instrucciones para el admin</h3>
    </div>
  )
}

export default StatsAndReports