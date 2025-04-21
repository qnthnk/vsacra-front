import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate, Link } from 'react-router-dom';
import './../../styles/Login.css';
import LOGO from '../../img/garciaback.png'
import { FaInfo } from "react-icons/fa";


const Login = () => {
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
      //   if (setToken) setToken(response.token);

        // Redirigir basado en el rol del usuario
        const redirectPath = store.user.role === 'admin' ? '/admin-dashboard' : '/home';
        console.log('Redirigiendo a:', redirectPath);
        // Dos métodos de redirección para asegurar el funcionamiento
        navigate(redirectPath);
        // navigate(redirectPath, { replace: true });
        // window.location.href = redirectPath;
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
        

       
        <div className="main">
        <div className="mainInner">
          

        <div className="login">
          <div className="heading" style={{color:"white", marginTop:"20px"}}>Ingresar</div>
          <form className="form" onSubmit={handleSubmit}>
            <input
              placeholder="E-mail"
              id="email"
              name="email"
              type="email"
              className="inputlog"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              className="inputlog"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="loginNew" style={{marginTop: "-20px"}}>
              <button value="Iniciar sesión" type="submit" >Ingresar</button>
          <button >
              <Link to="/signup">Regístrate</Link>
            </button>
            <span >
              <Link style={{ color: "white", marginTop: "10px", textDecoration: "none" }} to="/forgot-password">Olvidé mi contraseña</Link>
            </span>
            </div>
            </form>
            </div>
            </div>
          <div className="register">
            <form className="form">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={LOGO} className='logo' />
        </div>
         
            </form>
            </div>

            

        
        </div>
        <br />
        <button type="button" className="DemoButton firstClick" style={{ width: "200px", borderRadius: "20px" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
          Versión Demo CLICK
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
      
      </div>
    </div>
  );
};

export default Login;