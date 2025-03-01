import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    if (!email || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    // Reset error message
    setError('');

    // Simulate form submission
    console.log('Form submitted', { email, password });

    };

  return (
    <div className='container mt-5'>
      <div className='form-container'>
        <form onSubmit={handleSubmit} className="col-4">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input 
              type="email" 
              name="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input 
              type="password" 
              name="password" 
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className='btn btn-primary'>Iniciar sesión</button>

          <div className="mt-3">
            <label>¿No tienes una cuenta? <a href="/register">Regístrate</a></label>
          </div>
          <div className="mt-3">
            <label><a href="/recover-password">Olvidé mi contraseña</a></label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
