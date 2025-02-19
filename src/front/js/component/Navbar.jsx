import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Home</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/lugares-ayuda">Lugares de ayuda</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/embajadas">Embajadas</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/mensajeria">Mensajeria</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/blog">Blog</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/gadgets">Gadgets</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/chatbot">Chatbot</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/contact-list">Contact List</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/requisitos-migratorios">Requisitos migratorios</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/saldo-paypal">Saldo paypal</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/preguntas-frecuentes">Preguntas Frecuentes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/emergencia">Emergencia</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/contactar-ayuda">Contactar Ayuda</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/consola-manejo-datos">Consola manejo de datos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/estadisticas-reportes">Estadisticas y reportes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/panel-edicion-dashboard">Panel edicion dashboard</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/vista-ubicacion">Vista ubicacion</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar;