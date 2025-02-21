import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';

const Register = () => {
  const { store, actions } = useContext(Context);
  const [formData, setFormData] = useState({
    General_data: 
    {
    id :'',
    first_name :'',
    first_last_name :'',
    second_last_name :'',
    nacionality :'',
    gender :'',
    birthdate :'',
    email :'',
    password :'',
    user_principal_id :''
    },
    Clinical_data:
    {
      id :'',
      blood_type :'',
      allergy :'',
      disease :'',
      user_principal_id :''
    },
    Contact_data:
    {
      id :'',
    phone_number :'',
    facebook :'',
    instagram :'',
    x :''
    },
    Aditional_data:
    {
      id :'',
      city :'',
      street :'',
      home_country :'',
      country_of_residence :'',
      country_of_destination :''
    },
    Location:
    {
    id :'',
    latitude :'',
    longitude :''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(formData);
  };

  const handleSubmit = () => {

    let dataToSend = formData;
    actions.register(dataToSend);


    console.log(formData);
  };

  return (
    <div>
      <div className="card">
        <h2>Bienvenid@ a tu migrante app</h2>
        <h3>Completa el siguiente formulario para inscribirte</h3>
        <div className='card'>

          <div>
            <div>
              <h3>DATOS GENERALES</h3>
              <label>Apellido Paterno</label>
              <input type="text" name="apellidoPaterno" placeholder='A.Paterno' value={formData.General_data.first_name} onChange={handleChange} />
            </div>
            <div>
              <label>Apellido Materno</label>
              <input type="text" name="apellidoMaterno" placeholder='A.Materno' value={formData.General_data.first_last_name} onChange={handleChange} />
            </div>
            <div>
              <label>Nombre(s)</label>
              <input type="text" name="nombres" placeholder='Nombre(s)' value={formData.General_data.second_last_name} onChange={handleChange} />
            </div>
            <div>
              <label>Pais de Nacimiento</label>
              <input type="text" name="paisNacimiento" placeholder='Añadir Select' value={''} onChange={handleChange} />
            </div>
            <div>
              <label>Pais de Origen</label>
              <input type="text" name="paisOrigen" placeholder='Añadir Select' value={formData.Aditional_data.home_country} onChange={handleChange} />
            </div>
            <div>
              <label>Pais de Destino</label>
              <input type="text" name="paisDestino" placeholder='Añadir Select' value={formData.Aditional_data.country_of_destination} onChange={handleChange} />
            </div>
            <div>
              <label>Nacionalidad</label>
              <input type="text" name="nacionalidad" placeholder='Añadir Select' value={formData.General_data.nacionality} onChange={handleChange} />
            </div>
            <div>
              <label>Género</label>
              <input type="text" name="genero" placeholder='Añadir Select' value={formData.General_data.gender} onChange={handleChange} />
            </div>
            <div>
              <label>Fecha de nacimiento</label>
              <input type="text" name="fechaNacimiento" placeholder='añadir date' value={formData.General_data.birthdate} onChange={handleChange} />
            </div>
            <h3>DATOS ADICIONALES</h3>
            <div>
              <label>Dirección completa</label>
              <input type="text" name="direccionCompleta" placeholder='Dirección completa' value={''} onChange={handleChange} />
            </div>
            <div>
              <label>Código Postal</label>
              <input type="text" name="codigoPostal" placeholder='Código Postal' value={''} onChange={handleChange} />
            </div>
            <div>
              <label>Ciudad</label>
              <input type="text" name="ciudad" placeholder='Ciudad' value={formData.Aditional_data.city} onChange={handleChange} />
            </div>
            <div>
              <label>País</label>
              <input type="text" name="pais" placeholder='País' value={formData.Aditional_data.country_of_residence} onChange={handleChange} />
            </div>
            <h3>DATOS DE CONTACTO</h3>
            <div>
              <label>Teléfono</label>
              <input type="text" name="telefono" placeholder='Teléfono' value={formData.Contact_data.phone_number} onChange={handleChange} />
            </div>
            <div>
              <label>Correo Electrónico</label>
              <input type="text" name="email" placeholder='Email' value={formData.General_data.email} onChange={handleChange} />
            </div>
            <div>
              <label>Facebook</label>
              <input type="text" name="facebook" placeholder='Facebook' value={formData.Contact_data.facebook} onChange={handleChange} />
            </div>
            <div>
              <label>Instagram</label>
              <input type="text" name="instagram" placeholder='Instagram' value={formData.Contact_data.instagram} onChange={handleChange} />
            </div>
            <div>
              <label>Twitter o X</label>
              <input type="text" name="twitter" placeholder='Twitter o X' value={formData.Contact_data.x} onChange={handleChange} />
            </div>
            <h3>DATOS CLÍNICOS</h3>
            <div>
              <label>Tipo de Sangre</label>
              <input type="text" name="tipoSangre" placeholder='Añadir Select' value={formData.Clinical_data.blood_type} onChange={handleChange} />
            </div>
            <div>
              <label>Alergias</label>
              <input type="text" name="alergias" placeholder='Alergias' value={formData.Clinical_data.allergy} onChange={handleChange} />
            </div>
            <div>
              <label>Enfermedades crónicas</label>
              <input type="text" name="enfermedadesCronicas" placeholder='Enfermedades Crónicas' value={formData.Clinical_data.disease} onChange={handleChange} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Registrarse</button>

        </div>
      </div>
    </div>
  );
};

export default Register;
