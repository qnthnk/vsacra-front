import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";;
import "../../styles/home.css";

const Navbar = () => {
  const { store, actions } = useContext(Context);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) return null;

  const handleLogout = async () => {
    try {
      await actions.logout();

      navigate("/login");

      alert("Has cerrado sesión correctamente.");
    } catch (error) {
      console.error("Error en el logout:", error);
      alert("Ocurrió un error al cerrar sesión. Inténtalo de nuevo.");
    }
  };

  const handleMigrappClick = () => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleMigrappClick();
            }}
            >
             <strong> MIGRAPP (provisional)</strong>
            </a>
            <button
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            style={{ background: 'none', border: 'none' }}
            >
            <GiHamburgerMenu className='login-buttonesN'  />
            </button>
            <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            >
            <div className="offcanvas-header">
              <h6 className="navbar-brand" id="offcanvasNavbarLabel">
              Menu
              </h6>
              <button
              type="button"
              className="btn-close btn-close-dark"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body ">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li>
                <a className="nav-link" href="/about">
                About
                </a>
              </li>
              <li>
                <a className="nav-link" href="/home">
                Home
                </a>
              </li>
              {/* <li>
                <a className="nav-link" href="/login">
                Login
                </a>
              </li> */}
              <li>
                <a className="nav-link" href="/chat">
                Mensajeria
                </a>
              </li>
              <li>
                <a className="nav-link" href="/chatbot">
                Chatbot
                </a>
              </li>
              <li>
                <a className="nav-link" href="/contact-list">
                Contact List
                </a>
              </li>
              <li>
                <a className="nav-link" href="/freq-asked-questions">
                Tips
                </a>
              </li>
              <li>
                <a className="nav-link" href="/help">
                Contactar Ayuda
                </a>
              </li>
              <li>
                <a className="nav-link" href="/admin-console">
                Consola manejo de datos(ADMIN)
                </a>
              </li>
              <li>
                <a className="nav-link" href="/stats-and-reports">
                Estadisticas y reportes(ADMIN)
                </a>
              </li>
              <li>
                <a className="nav-link" href="/location-view">
                Vista ubicacion(RENAME PD)
                </a>
              </li>
              <li>
                <a className="nav-link" href="/help">
                Contactar Ayuda
                </a>
              </li>
              <li>
                <a
                className="nav-link"
                href="/login"
                onClick={(e) => {
                      e.preventDefault(); // Evita la navegación predeterminada
                      handleLogout(); // Llama a la función de cierre de sesión
                    }}
                  >
                    Cerrar sesión
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;