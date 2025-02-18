import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Home</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Lugares de ayuda</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Embajadas</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Mensajeria</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Blog</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Gadgets</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Chatbot</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Contact List</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Requisitos migratorios</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Saldo paypal</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Preguntas Frecuentes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Emergencia</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Contactar Ayuda</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar;