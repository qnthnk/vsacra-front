import React from 'react'

const Register = () => {
  return (
    <div>

      <div className="card">
        <h2>Bienvenid@ a tu migrante app</h2>
        <h3>Completa el siguiente formulario para inscribirte</h3>
        <div className='card'>
          <form action="" className='mb-3'>
            <div>
              <div>
                <h3>DATOS GENERALES</h3>
                <label>Apellido Paterno</label>
                <input type="text" placeholder='A.Paterno' />
              </div>
              <div>
                <label>Apellido Materno</label>
                <input type="text" placeholder='A.Materno' />
              </div>
              <div>
                <label>Nombre(s)</label>
                <input type="text" placeholder='Nombre(s)' />
              </div>
              <div>
                <label>Pais de Nacimiento</label>
                <input type="text" placeholder='Añadir Select' />
              </div>
              <div>
                <label>Pais de Origen</label>
                <input type="text" placeholder='Añadir Select' />
              </div>
              <div>
                <label>Pais de Destino</label>
                <input type="text" placeholder='Añadir Select' />
              </div>
              <div>
                <label>Nacionalidad</label>
                <input type="text" placeholder='Añadir Select' />
              </div>
              <div>
                <label>Género</label>
                <input type="text" placeholder='Añadir Select' />
              </div>
              <div>
                <label>Fecha de nacimiento</label>
                <input type="text" placeholder='añadir date' />
              </div>
              <h3>DATOS ADICIONALES</h3>
              <div>
                <label>Calle y número</label>
                <input type="text" placeholder='Calle y número' />
              </div>
              <div>
                <label>Colonia, Barrio o Sector</label>
                <input type="text" placeholder='Colonia, Barrio o Sector' />
              </div>
              <div>
                <label>Código Postal</label>
                <input type="text" placeholder='Código Postal' />
              </div>
              <div>
                <label>Ciudad</label>
                <input type="text" placeholder='Ciudad' />
              </div>
              <div>
                <label>País</label>
                <input type="text" placeholder='País' />
              </div>
              <h3>DATOS DE CONTACTO</h3>
              <div>
                <label>Teléfono</label>
                <input type="text" placeholder='Teléfono' />
              </div>
              <div>
                <label>Correo Electrónico</label>
                <input type="text" placeholder='Email' />
              </div>
              <div>
                <label>Facebook</label>
                <input type="text" placeholder='Facebook' />
              </div>
              <div>
                <label>Instagram</label>
                <input type="text" placeholder='Instagram' />
              </div>
              <div>
                <label>Twitter o X</label>
                <input type="text" placeholder='Twitter o X' />
              </div>
              <h3>DATOS CLÍNICOS</h3>
              <div>
                <label>Tipo de Sangre</label>
                <input type="text" placeholder='Añadir Select' />
              </div>
              <div>
                <label>Alergias</label>
                <input type="text" placeholder='Alergias' />
              </div>
              <div>
                <label>Enfermedades crónicas</label>
                <input type="text" placeholder='Enfermedades Crónicas' />
              </div>
            </div>
          </form>
        </div>
        <button type="button" className="btn btn-primary">Registrarse</button>
      </div>

    </div>
  )
}

export default Register
