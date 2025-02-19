import React from 'react'
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <ul className="list-group w-auto">
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center" aria-current="true">
          <Link to="/lugares-ayuda">Lugares de ayuda</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/embajadas">Embajadas</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/registro">Registro</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/mensajeria">Mensajería</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/blog">Blog</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/gadgets">Gadgets</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/chatbot">Chatbot</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/contact-list">Contact List</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/requisitos-migratorios">Requisitos migratorios</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/saldo-paypal">Saldo Paypal</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/preguntas-frecuentes">Preguntas Frecuentes</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/emergencia">Emergencia</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/estadisticas-reportes">Estadísticas y reportes</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/contactar-ayuda">Contactar Ayuda</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/vista-ubicacion">Vista de ubicación</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/consola-manejo-datos">Consola de manejo de datos</Link>
        </li>
        <li className="list-group-item list-group-item-action d-flex justify-content-center align-items-center">
          <Link to="/panel-edicion-dashboard">Panel de edición de dashboard de usuarios</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
