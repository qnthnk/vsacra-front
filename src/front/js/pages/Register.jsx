import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import countriesData from './../../../../countries.json';
import statesData from './../../../../states.json';
import citiesData from './../../../../cities.json';
import './../../styles/Register.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Register = () => {
  const { store, actions } = useContext(Context);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    first_last_name: '',
    second_last_name: '',
    curp: '',
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
    colonia_mex: 'none',
    house_number: 'none',
    street: '',
    seccion: 'none',
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
      if (!formData.second_last_name.trim()) newErrors.second_last_name = genericLegend;
      if (!formData.curp.trim()) newErrors.curp = genericLegend;
      if (formData.curp.length < 18) newErrors.curp = "El CURP debe contener 18 caracteres.";
    }

    if (currentStep === 2) {
      if (!formData.street.trim()) newErrors.street = genericLegend;
      if (!formData.zip_code.trim()) {
        newErrors.zip_code = genericLegend;
      } else if (!/^\d{4,6}$/.test(formData.zip_code)) {
        newErrors.zip_code = "Debe contener al menos 4 dígitos.";
      }
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

  const handleSubmit = async () => {
    let dataToSend = formData;

    // Validar el formulario
    if (!validateForm()) {
      Swal.fire("Por favor complete los campos faltantes. Para continuar, revise su solicitud");
      console.log("Errores en el formulario:", errors);
      return;
    }

    try {
      await actions.register(formData);
      console.log("Formulario enviado:", formData);
      Swal.fire("Te has registrado! Redirigiéndote a login.")
      navigate('/login');
    } catch (error) {
      console.log("Error en el registro:", error);
      Swal.fire("Hubo un error en el registro. Por favor, inténtalo de nuevo.");
    }
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
            latitude: latitude.toString(),
            longitude: longitude.toString()
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


  const extractBirthdateAndGenderFromCURP = (curp) => {
    if (curp.length === 18) {
      const year = parseInt(curp.substring(4, 6), 10);
      const month = curp.substring(6, 8);
      const day = curp.substring(8, 10);
      const genderChar = curp[10];

      const fullYear = year < 30 ? `20${year}` : `19${year}`;
      const birthdate = `${fullYear}-${month}-${day}`;
      const gender = genderChar.toUpperCase() === 'H' ? 'Hombre' : 'Mujer';

      return { birthdate, gender };
    }
    return { birthdate: '', gender: '' };
  };

  const handleCURPChange = (e) => {
    const { name, value } = e.target;
    const { birthdate, gender } = extractBirthdateAndGenderFromCURP(value);

    setFormData({
      ...formData,
      [name]: value,
      birthdate,
      gender
    });
  };

  return (
    <div className='backpage'>
      <div className='containerH'>
      
      <h3 className='heading'>Completa el siguiente formulario para inscribirte</h3>

      <div className="container">
        <div className='forms'>
          {step === 1 && (
            <div>
              <h3 className='heading'>Datos Generales</h3>
              <input className='inputs' type="text" name="first_name" placeholder='Nombre' value={formData.first_name} onChange={handleChange} />
              {errors.first_name && <p className="error">{errors.first_name}</p>}
              <input className='inputs' type="text" name="first_last_name" placeholder='Apellido Paterno' value={formData.first_last_name} onChange={handleChange} />
              {errors.first_last_name && <p className="error">{errors.first_last_name}</p>}
              <input className='inputs' type="text" name="second_last_name" placeholder='Apellido Materno' value={formData.second_last_name} onChange={handleChange} />
              {errors.second_last_name && <p className="error">{errors.second_last_name}</p>}
              <input className='inputs' type="text" name="curp" placeholder='CURP' value={formData.curp} onChange={handleCURPChange} />
              {errors.curp && <p className="error">{errors.curp}</p>}
              <button className='login-buttont' onClick={() => { const isValid = validateForm(step); if (isValid) handleNext(); }}>Siguiente</button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 className='heading'>Dirección</h3>
              <input className='inputs' type="text" name="street" placeholder='Dirección completa' value={formData.street} onChange={handleChange} />
              {errors.street && <p className="error">{errors.street}</p>}
              <input className='inputs' type="text" name="zip_code" placeholder='Código Postal' value={formData.zip_code} onChange={handleChange} />
              {errors.zip_code && <p className="error">{errors.zip_code}</p>}
              <input className='inputs' type="text" name="state" placeholder='Estado' value={formData.state} onChange={handleChange} />
              {errors.state && <p className="error">{errors.state}</p>}
              <input className='inputs' type="text" name="city" placeholder='Ciudad' value={formData.city} onChange={handleChange} />
              {errors.city && <p className="error">{errors.city}</p>}
              <button className='login-buttont' onClick={handleBack}>Atrás</button>
              <button className='login-buttont' onClick={() => { const isValid = validateForm(step); if (isValid) handleNext(); }}>Siguiente</button>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3 className='heading'>Datos de Contacto</h3>
              <input className='inputs' type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} />
              {errors.email && <p className="error">{errors.email}</p>}
              <input className='inputs' type="text" name="phone_number" placeholder='Teléfono' value={formData.phone_number} onChange={handleChange} />
              {errors.phone_number && <p className="error">{errors.phone_number}</p>}
              <input className='inputs' type="text" name="facebook" placeholder='Facebook' value={formData.facebook} onChange={handleChange} />
              <input className='inputs' type="text" name="instagram" placeholder='Instagram' value={formData.instagram} onChange={handleChange} />
              <input className='inputs' type="text" name="x" placeholder='Twitter o X' value={formData.x} onChange={handleChange} />
              <button className='login-buttont' onClick={handleBack}>Atrás</button>
              <button className='login-buttont' onClick={() => { const isValid = validateForm(step); if (isValid) handleNext(); }}>Siguiente</button>
            </div>
          )}
          {step === 4 && (
            <div>
              <h3 className='heading'>Datos clínicos</h3>
              <input className='inputs' type="text" name="blood_type" placeholder='Tipo de sangre' value={formData.blood_type} onChange={handleChange} />
              {errors.blood_type && <p className="error">{errors.blood_type}</p>}
              <input className='inputs' type="text" name="allergy" placeholder='Alergias' value={formData.allergy} onChange={handleChange} />
              {errors.allergy && <p className="error">{errors.allergy}</p>}
              <input className='inputs' type="text" name="disease" placeholder='Enfermedades Crónicas' value={formData.disease} onChange={handleChange} />
              {errors.disease && <p className="error">{errors.disease}</p>}
              <button className='login-buttont' onClick={handleBack}>Atrás</button>
              <button className='login-buttont' onClick={() => { const isValid = validateForm(step); if (isValid) handleNext(); }}>Siguiente</button>
            </div>
          )}
          {step === 5 && (
            <div>
              <h3 className='heading'>Finalizar registro</h3>
              <input className='inputs' type="password" name="password" placeholder='Crear contraseña' value={formData.password} onChange={handleChange} />
              {errors.password && <p className="error">{errors.password}</p>}
              <button className='login-buttont' onClick={handleBack}>Atrás</button>
              <button type="submit" className="login-buttont" onClick={handleSubmit}>Registrarse</button>
            </div>
          )}
        </div>
      </div>
      <br />
      <br />
    </div>
    </div>
  );
};

export default Register;