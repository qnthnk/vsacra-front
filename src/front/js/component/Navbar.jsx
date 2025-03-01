import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
        <h1>ENCARGADO DANNY</h1>
        <h1>DO NOT TOUCH JUEPUTA</h1>
          <a className="navbar-brand" href="/">Home</a>
          <a className="navbar-brand" href="/login">Login</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/chat">Mensajeria</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/chatbot">Chatbot</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact-list">Contact List</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/freq-asked-questions">Preguntas Frecuentes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/help">Contactar Ayuda</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin-console">Consola manejo de datos(ADMIN)</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/stats-and-reports">Estadisticas y reportes(ADMIN)</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/location-view">Vista ubicacion(RENAME PD)</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar;