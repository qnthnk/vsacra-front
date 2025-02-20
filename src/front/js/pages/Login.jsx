import React from 'react'

const Login = () => {
 
    
       return(
        
            <div className='container mt-5'>
            <div className='form-container'>
              <form action="" className="col-4">
                <div className="mb-3">
                  <label htmlFor="usuario" className="form-label">Usuario</label>
                  <input type='text' name="usuario" className="form-control" required/>
                </div>
          
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input type="password" name="password" className="form-control" required/>
                </div>
          
                <button type="submit" className='btn btn-primary'>Iniciar sesión</button>
                <div className="mt-3">
                  <label>¿No tienes una cuenta? <a href="/register">Regístrate</a></label>
                </div>
                <div className="mt-3">
                  <label><a href="/">Olvide mi contraseña</a></label>
                </div>
              </form>
            </div>
          </div>
          
        );
    
  
}

export default Login
