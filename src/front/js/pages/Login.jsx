import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate, Link } from 'react-router-dom';
import './../../styles/Login.css';
import LOGO from '../../img/garciaback.png'


const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

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
                <div className='demoContainer'>Los recuadros rosas como este, solo aparecen en esta versión demo para explicar funcionalidades generales. </div>

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
                    <div className='demoContainer'>En Demo no se puede registrar usuario ni recuperar contraseña. </div>

          {error && <div className="alert alert-danger">{error}</div>}
                    <span className="forgot-password">
            <Link href="/login" >Regístrate</Link>
          </span>
          <span className="forgot-password">
            <Link href="/login">Olvidé mi contraseña</Link>
          </span>

          {/* <span className="forgot-password">
            <Link href="/signup" >Regístrate</Link>
          </span>
          <span className="forgot-password">
            <Link href="/forgot-password">Olvidé mi contraseña</Link>
          </span> */}
          <div style={{ textAlign: 'center' }}>
            <input value="Iniciar sesión" type="submit" className="login-buttont" />
          </div>
        </form>
        {/* <span className="login-buttonesN2">
          <Link href="/paypal-balance" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>Donar</Link>
        </span> */}
      </div>
    </div>
  );
};

export default Login;