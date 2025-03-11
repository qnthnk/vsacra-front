import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import './../../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    setError('');

    const payload = { email, password };

    try {
      const response = await actions.login(payload);

      if (response?.token) {
        localStorage.setItem('token', response.token);

        // Redirección según el rol del usuario
        navigate(response.role === 'admin' ? '/admin-dashboard' : '/home');
      } else {
        setError('Error al iniciar sesión. Verifica tus credenciales.');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setError('Ocurrió un error al iniciar sesión. Inténtalo de nuevo.');
    }
  };

  return (
    <div className='backpage'>
      <div className="container">
        <div className="heading">Login</div>
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
          {error && <div className="alert alert-danger">{error}</div>}
          <span className="forgot-password">
            <a href="/signup">Regístrate</a>
          </span>
          <span className="forgot-password">
            <a href="/recover-password">Olvidé mi contraseña</a>
          </span>
          <input value="Iniciar sesión" type="submit" className="login-button" />
        </form>
        <span className="agreement">
          <a href="#">Aviso de privacidad</a>
        </span>
      </div>
    </div>
  );
};

export default Login;
