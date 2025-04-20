import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate, Link } from 'react-router-dom';
import './../../styles/Login.css';
import LOGO from '../../img/garciaback.png'
import { FaInfo } from "react-icons/fa";


const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.user?.isAuthenticated) {
      const redirectPath = store.user.role === 'admin' ? '/admin-dashboard' : '/home';
      navigate(redirectPath, { replace: true });
    }
  }, [store.user, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    setError('');

    try {
      const response = await actions.login({ email, password });

      if (response?.token) {
        // Actualizar el token en el Layout
        if (setToken) setToken(response.token);

        // Redirigir basado en el rol del usuario
        const redirectPath = store.user.role === 'admin' ? '/admin-dashboard' : '/home';

        // Dos métodos de redirección para asegurar el funcionamiento
        navigate(redirectPath, { replace: true });
        window.location.href = redirectPath;
      } else {
        setError('Credenciales incorrectas o error en el servidor');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setError(error.message || 'Ocurrió un error al iniciar sesión. Inténtalo de nuevo.');
    }
  };

  return (
    <div className='backpage'>
      <div className='containerH'>
        <button type="button" className="DemoButton firstClick" style={{ width: "200px", borderRadius: "20px" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
          Haz click aquí
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content demoContainer">
              <div className="modal-body">
                <div className=''>Bienvenido al DEMO. En cada sección encontrarás un ícono de información, como el que se muestra a continuación. Puedes presionar sobre él para obtener referencias sobre cada función.
                </div>
                {/* Hay que ajustar el tamaño del icono dentro del boton y centrarlo */}
                <FaInfo className='DemoButton' style={{ fontSize: "5px" }} />
              </div>
              <div className="modal-content">
                <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={LOGO} className='logo' />
        </div>
        <div className="container">
          <div className="heading">Ingresar</div>
          <form className="forms" onSubmit={handleSubmit}>
            <input
              placeholder="E-mail"
              id="email"
              name="email"
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span className="forgot-password">
              <Link to="/signup">Regístrate</Link>
            </span>
            <span className="forgot-password">
              <Link to="/forgot-password">Olvidé mi contraseña</Link>
            </span>
            <div style={{ textAlign: 'center' }}>
              <input value="Iniciar sesión" type="submit" className="login-buttont" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;