import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import countriesData from './../../../../countries.json';
import statesData from './../../../../states.json';
import citiesData from './../../../../cities.json';
import './../../styles/Register.css';

const Register = () => {
  const { store, actions } = useContext(Context);
  const [step, setStep] = useState(1);
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

  const [errors, setErrors] = useState({});

  const validateForm = (currentStep) => {
    let newErrors = {};
    let genericLegend = "Completa este campo para continuar.";

    if (currentStep === 1) {
      if (!formData.first_name.trim()) newErrors.first_name = genericLegend;
      if (!formData.first_last_name.trim()) newErrors.first_last_name = genericLegend;
      if (!formData.nationality.trim()) newErrors.nationality = genericLegend;
      if (!formData.gender) newErrors.gender = genericLegend;
      if (!formData.birthdate) {
        newErrors.birthdate = genericLegend;
      } else {
        let birthDate = new Date(formData.birthdate);
        let today = new Date();
        if (birthDate > today) newErrors.birthdate = "Seleccione una fecha válida.";
      }
      if (!formData.home_country.trim()) newErrors.home_country = genericLegend;
    }

    if (currentStep === 2) {
      if (!formData.address.trim()) newErrors.address = genericLegend;
      if (!formData.zip_code.trim()) {
        newErrors.zip_code = genericLegend;
      } else if (!/^\d{4,6}$/.test(formData.zip_code)) {
        newErrors.zip_code = "Debe contener al menos 4 dígitos.";
      }
      if (!formData.country_of_residence.trim()) newErrors.country_of_residence = genericLegend;
      if (!formData.state.trim()) newErrors.state = genericLegend;
      if (!formData.city.trim()) newErrors.city = genericLegend;
    }

    if (currentStep === 3) {
      if (!formData.email.trim()) {
        newErrors.email = genericLegend;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Formato de email inválido.";
      }
      if (!formData.phone_number.trim()) {
        newErrors.phone_number = genericLegend;
      } else if (!/^\d+$/.test(formData.phone_number)) {
        newErrors.phone_number = "Solo debe contener números.";
      }
    }

    if (currentStep === 4) {
      if (!formData.blood_type.trim()) newErrors.blood_type = genericLegend;
      if (!formData.allergy.trim()) newErrors.allergy = genericLegend;
      if (!formData.disease.trim()) newErrors.disease = genericLegend;
    }

    if (currentStep === 5) {
      if (!formData.country_of_destination.trim()) newErrors.country_of_destination = genericLegend;
      if (!formData.password) {
        newErrors.password = genericLegend;
      } else if (formData.password.length > 8) {
        newErrors.password = "Por su seguridad, la contraseña debe tener ser mayor a 8 caracteres.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log("este mero", formData[name]);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {

    let dataToSend = formData;
    if (validateForm()) {
      actions.register(formData);
      console.log("Formulario enviado:", formData);
    } else {
      alert("Por favor complete los campos faltantes. Para continuar, revise su solicitud")
      console.log("Errores en el formulario:", errors);
    }
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

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("La geolocalización no es soportada por este navegador.");
      return;
    }

    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prevData) => ({
            ...prevData,
            latitude: latitude,
            longitude: longitude
          }));
          console.log("Ubicación obtenida:", { latitude, longitude });
        },
        (error) => {
          setError("Error al obtener la ubicación: ", error);
        }
      );
    };

    getLocation();
  }, []);


  return (
    <div>
      <div className="register">
        <h2>Bienvenid@ a tu migrante app</h2>
        <h3>Completa el siguiente formulario para inscribirte</h3>
        <div className='form'>
          {step === 1 && (
            <div>
              <h3 className='labels'>Datos Generales</h3>
              <div className='tags'>
                <input className='inputs' type="text" name="first_name" placeholder='Nombre' value={formData.first_name} onChange={handleChange} />
                {errors.first_name && <p className="error">{errors.first_name}</p>}
              </div>
              <div className='tags'>
                <input className='inputs' type="text" name="first_last_name" placeholder='Apellido 1' value={formData.first_last_name} onChange={handleChange} />
                {errors.first_last_name && <p className="error">{errors.first_last_name}</p>}
              </div>
              <div className='tags'>
                <input className='inputs' type="text" name="second_last_name" placeholder='Apellido 2' value={formData.second_last_name} onChange={handleChange} />
              </div>
              <div className='tags'>
                <input className='inputs' type="text" name="nationality" placeholder='Nacionalidad' value={formData.nationality} onChange={handleChange} />
                {errors.nationality && <p className="error">{errors.nationality}</p>}
              </div>
              <div className='tags'>
                <select className='inputs' name="gender" value={formData.gender} onChange={handleChange}>
              <button className='button' onClick={() => { const isValid = validateForm(step); if (isValid) handleNext(); }}>Siguiente</button>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                </select>
                {errors.gender && <p className="error">{errors.gender}</p>}
              </div>
              <div className='tags'>
                <label>Fecha de nacimiento</label>
                <input className='inputs' type="date" name="birthdate" placeholder='añadir date' value={formData.birthdate} onChange={handleChange} />
                {errors.birthdate && <p className="error">{errors.birthdate}</p>}
              </div>
              <div className='tags'>
                <input className='inputs' type="text" name="home_country" placeholder='Pais de Nacimiento' value={formData.home_country} onChange={handleChange} />
                {errors.home_country && <p className="error">{errors.home_country}</p>}
              </div>
              <button className='button' onClick={() => { const isValid = validateForm(step); if (isValid) handleNext(); }}>Siguiente</button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 className='labels'>Dirección</h3>
              <div className='tags'>
                <input className='inputs' type="text" name="address" placeholder='Dirección completa' value={formData.address} onChange={handleChange} />
                {errors.address && <p className="error">{errors.address}</p>}
              </div>
              <div className='tags'>
                <input className='inputs' type="text" name="zip_code" placeholder='Código Postal' value={formData.zip_code} onChange={handleChange} />
                {errors.zip_code && <p className="error">{errors.zip_code}</p>}
              </div>
              <div className='tags'>
                <input className='inputs' type="text" name="country_of_residence" placeholder='Pais de Residencia' value={formData.country_of_residence} onChange={handleChange} />
                {errors.country_of_residence && <p className="error">{errors.country_of_residence}</p>}
              </div>
              <div className='tags'>
                <input className='inputs' type="text" name="state" placeholder='Estado' value={formData.state} onChange={handleChange} />
                {errors.state && <p className="error">{errors.state}</p>}
              </div>
              <div className='tags'>
                <input className='inputs' type="text" name="city" placeholder='Ciudad' value={formData.city} onChange={handleChange} />
                {errors.city && <p className="error">{errors.city}</p>}
              </div>
              <button className='button' onClick={handleBack}>Atrás</button>
              <button className='button' onClick={() => { const isValid = validateForm(step); if (isValid) handleNext(); }}>Siguiente</button>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3 className='labels'>Datos de Contacto</h3>
              <div className='tags'>
                <input className='inputs' type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div className='tags'>
                <input className='inputs' type="text" name="phone_number" placeholder='Teléfono' value={formData.phone_number} onChange={handleChange} />
                {errors.phone_number && <p className="error">{errors.phone_number}</p>}
              </div>
              <div className='tags'>
                <input className='inputs' type="text" name="facebook" placeholder='Facebook' value={formData.facebook} onChange={handleChange} />
              </div>
              <div className='tags'>
                <input className='inputs' type="text" name="instagram" placeholder='Instagram' value={formData.instagram} onChange={handleChange} />
              </div>
              <div className='tags'>
                <input className='inputs' type="text" name="x" placeholder='Twitter o X' value={formData.x} onChange={handleChange} />
              </div>
              <button className='button' onClick={handleBack}>Atrás</button>
              <button className='button' onClick={() => { const isValid = validateForm(step); if (isValid) handleNext(); }}>Siguiente</button>
            </div>
          )}
          {step === 4 && (
            <div>
              <h3 className='labels'>Datos clínicos</h3>
              <div className='tags'>
                <input className='inputs' type="text" name="blood_type" placeholder='Tipo de sangre' value={formData.blood_type} onChange={handleChange} />
                {errors.blood_type && <p className="error">{errors.blood_type}</p>}
              </div>
              <div className='tags'>
                <input className='inputs' type="text" name="allergy" placeholder='Alergias' value={formData.allergy} onChange={handleChange} />
                {errors.allergy && <p className="error">{errors.allergy}</p>}
              </div>
              <div className='tags'>
                <input className='inputs' type="text" name="disease" placeholder='Enfermedades Crónicas' value={formData.disease} onChange={handleChange} />
                {errors.disease && <p className="error">{errors.disease}</p>}
              </div>
              <button className='button' onClick={handleBack}>Atrás</button>
              <button className='button' onClick={() => { const isValid = validateForm(step); if (isValid) handleNext(); }}>Siguiente</button>
            </div>
          )}
          {step === 5 && (
            <div>
              <h3 className='labels'>Finalizar registro</h3>
              <div className='tags'>
                <input className='inputs' type="text" name="country_of_destination" placeholder='Pais de Destino' value={formData.country_of_destination} onChange={handleChange} />
                {errors.country_of_destination && <p className="error">{errors.country_of_destination}</p>}
              </div>
              <div className='tags'>
                <input className='inputs' type="password" name="password" placeholder='Crear contraseña' value={formData.password} onChange={handleChange} />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
              <button className='button' onClick={handleBack}>Atrás</button>
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Registrarse</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
