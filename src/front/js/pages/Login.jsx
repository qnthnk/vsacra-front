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
      <>
      <div className='login'>
        <div className='form'>
            
              <label htmlFor="email" className="labels">Correo Electrónico</label>
              <div className='tags'>
              <input
                type="email"
                name="email"
                className="inputs"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
              <label htmlFor="password" className="labels">Contraseña</label>
              <div className='tags'>
              <input
                type="password"
                name="password"
                className="inputs "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <br/>
            <br/>
  
            <button type="submit" className='button' onClick={handleSubmit}>Iniciar sesión</button>
  
              <label className="labels-subt">¿No tienes una cuenta? 
                <div style={{width:"50%"}}>
                <a className="labels-link" href="/signup">Regístrate</a>
                <a className="labels-link" href="/recover-password">Olvidé mi contraseña</a>
                </div>
                </label>
        </div>
      </div>
      </>
    );
  };

  export default Login
