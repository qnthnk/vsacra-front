import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import './../../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { store, actions } = useContext(Context);




  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    if (!email || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }


    setError("");

    let payload = {
      password: password,
      email: email
    }

    actions.login(payload)

    console.log("Iniciando sesión con:", { email });

  };

  return (
    <div className='backpage'>

      <div className="container">
        <div className="heading">Login</div>
        <form className="forms" action={handleSubmit}>
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
          <span className="forgot-password"><a href="/signup">Regístrate</a></span>
          <span className="forgot-password"><a href="/recover-password">Olvidé mi contraseña</a></span>
          <input value="Iniciar sesión" type="submit" className="login-button" />
        </form>
        <span className="agreement"><a href="#">Aviso de privacidad</a></span>
      </div>
    </div>
  );
};

export default Login
