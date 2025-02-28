import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import countriesData from './../../../../countries.json';
import statesData from './../../../../states.json';
import citiesData from './../../../../cities.json';
import './../../styles/Register.css';


const Register = () => {
  const { store, actions } = useContext(Context);
  const [formData, setFormData] = useState({


    first_name: '',
    first_last_name: '',
    second_last_name: '',
    nationality: '',
    gender: '',
    birthdate: '',
    email: '',
    password: '',
    phone_number: '',
    facebook: '',
    instagram: '',
    x: '',
    blood_type: '',
    allergy: '',
    disease: '',
    city: '',
    state: '',
    address: '',
    home_country: '',
    country_of_residence: '',
    country_of_destination: '',
    zip_code: '',
    latitude: '',
    longitude: ''

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log("este mero", formData[name]);
  };

  const handleSubmit = () => {

    let dataToSend = formData;
    actions.register(dataToSend);


    console.log(formData);
  };
  const handleCountryChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      state: '', // Reset state when country changes
      city: '' // Reset city when country changes
    });
  };

  // Manejo especial para seleccionar un estado
  const handleStateChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      city: '' // Reset city when state changes
    });
  };


  return (
    <div>
      <div className="card register">
        <h2>Bienvenid@ a tu migrante app</h2>
        <h3>Completa el siguiente formulario para inscribirte</h3>
        <div className='card form'>
          <div>
            <div>
              <h3>DATOS</h3>
              <input type="text" name="first_name" placeholder='Nombre' value={formData.first_name} onChange={handleChange} />
            </div>
            <div>
              <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <input type="text" name="first_last_name" placeholder='Apellido 1' value={formData.first_last_name} onChange={handleChange} />
            </div>
            <div>
              <input type="text" name="second_last_name" placeholder='Apellido 2' value={formData.second_last_name} onChange={handleChange} />
            </div>
            <div>
              <input type="password" name="password" placeholder='Crear contraseña' value={formData.password} onChange={handleChange} />
            </div>
            <div>
              <input type="text" name="facebook" placeholder='Facebook' value={formData.facebook} onChange={handleChange} />
            </div>
            <div>
              <input type="text" name="instagram" placeholder='Instagram' value={formData.instagram} onChange={handleChange} />
            </div>
            <div>
              <input type="text" name="x" placeholder='Twitter o X' value={formData.x} onChange={handleChange} />
            </div>
            <div>
              <input type="number" name="phone_number" placeholder='Teléfono' value={formData.phone_number} onChange={handleChange} />
            </div>
            <div>
              <label>Fecha de nacimiento</label>
              <input type="date" name="birthdate" placeholder='añadir date' value={formData.birthdate} onChange={handleChange} />
            </div>
            <div>
              <input type="text" name="blood_type" placeholder='Tipo de sangre' value={formData.blood_type} onChange={handleChange} />
            </div>
            <div>
              <input type="text" name="allergy" placeholder='Alergias' value={formData.allergy} onChange={handleChange} />
            </div>
            <div>
              <input type="text" name="disease" placeholder='Enfermedades Crónicas' value={formData.disease} onChange={handleChange} />
            </div>
             
            <div>
              <select name="nationality" value={formData.nationality} onChange={handleChange}>
                <option value="">Nacionalidad</option>
                {countriesData.countries.map((nationality, index) => (
                  <option key={index} value={nationality.name}>{nationality.name}</option>
                ))}
              </select>
            </div>
            <div>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Género</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                <option value="other">Otro</option>
              </select>
            </div>
           
            <div>
              <select name="home_country" value={formData.home_country} onChange={handleChange}>
                <option value="">País de nacimiento</option>
                {countriesData.countries && countriesData.countries.map((country, index) => (
                  <option key={index} value={country.name}>{country.name}</option>
                ))}
              </select>
            </div> 

             <div>
              <select name="country_of_destination" value={formData.country_of_destination} onChange={handleChange}>
                <option value="">País de destino</option>
                {countriesData.countries && countriesData.countries.map((country, index) => (
                  <option key={index} value={country.name}>{country.name}</option>
                ))}
              </select>
            </div>
            <div>
              <select name="nationality" value={formData.nationality} onChange={handleChange}>
                <option value="">Nacionalidad</option>
                {countriesData.countries.map((nationality, index) => (
                  <option key={index} value={nationality.name}>{nationality.name}</option>
                ))}
              </select>
            </div>
            <div>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Género</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <h3>DATOS ADICIONALES</h3>
            <div>
              <input type="text" name="address" placeholder='Dirección completa' value={formData.address} onChange={handleChange} />
            </div>
            <div>
              <input type="number" name="zip_code" placeholder='Código Postal' value={formData.zip_code} onChange={handleChange} />
            </div>
            <div>
              <select name="country_of_residence" value={formData.country_of_residence} onChange={handleCountryChange}>
                <option value="">País de residencia</option>
                {countriesData.countries && countriesData.countries.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select name="state" value={formData.state} onChange={handleStateChange} disabled={!formData.country_of_residence}>
                <option value="">Estado</option>
                {statesData.states
                  .filter((state) => {
                    // Encuentra el país seleccionado en countries.json
                    const selectedCountry = countriesData.countries.find(
                      (country) => country.name === formData.country_of_residence
                    );

                    // Compara el id del país con el id_country del estado
                    return selectedCountry ? state.id_country === selectedCountry.id : false;
                  })
                  .map((state, index) => (
                    <option key={index} value={state.name}>
                      {state.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <select name="city" value={formData.city} onChange={handleChange} disabled={!formData.state}>
                <option value="">Ciudad</option>
                {citiesData.cities
                  .filter((city) => {
                    // Encuentra el estado seleccionado en states.json
                    const selectedState = statesData.states.find(
                      (state) => state.name === formData.state
                    );

                    // Compara el id del estado con el id_state de la ciudad
                    return selectedState && city.id_state === selectedState.id;
                  })
                  .map((city, index) => (
                    <option key={index} value={city.name}>
                      {city.name}
                    </option>
                  ))}
              </select>
            </div>
            
            <h3>DATOS CLÍNICOS</h3>
            
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Registrarse</button>
        </div>
      </div>
    // </div >
  );
};

export default Register;
