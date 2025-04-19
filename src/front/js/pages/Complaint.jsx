import React from 'react'
import { FaInfo } from "react-icons/fa";
import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

const Complaint = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    const [complaintData, setComplaintData] = useState({
        cause: '',
        url_image_complaint: 'none',
        complaint_comment: '',
        status: 'new',
        latitude: '',
        longitude: '',
        user_id: localStorage.getItem("id") || ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setComplaintData({
            ...complaintData,
            [name]: value
        });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImageToCloudinary = async (base64Image) => {
        const data = new FormData();
        data.append("file", base64Image);
        data.append("upload_preset", "complaint_upload");
        data.append("cloud_name", "dtxgs0qsc");
      
        const response = await fetch("https://api.cloudinary.com/v1_1/dtxgs0qsc/image/upload", {
          method: "POST",
          body: data,
        });
      
        const result = await response.json();
        return result.secure_url;
      };
      


    const validateForm = () => {
        const errors = {};

        if (!complaintData.cause.trim()) {
            errors.cause = "El motivo es obligatorio.";
        }

        if (!complaintData.complaint_comment.trim()) {
            errors.complaint_comment = "El comentario es obligatorio.";
        }

        if (!image) {
            errors.image = "Debe subir una imagen.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        const complaintToSend = {
            ...complaintData,
            // url_image_complaint: image || "none"
        };

        if (!validateForm()) {
            Swal.fire("Por favor complete los campos faltantes. Para continuar, revise su solicitud");
            console.log("Errores en el formulario:", errors);
            return;
        }

        try {
            const imageUrl = await uploadImageToCloudinary(image);

            const complaintToSend = {
                ...complaintData,
                url_image_complaint: imageUrl
              };

            await actions.complaint(complaintToSend);
            console.log("Formulario enviado:", complaintToSend);
            Swal.fire("Denuncia enviada con éxito.");
            navigate('/home');
        } catch (error) {
            console.log("Error en el registro:", error);
            Swal.fire("Hubo un error en el registro. Por favor, inténtalo de nuevo.");
        }
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            setErrors((prev) => ({ ...prev, geolocation: "La geolocalización no es soportada por este navegador." }));
            return;
        }

        const getLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setComplaintData((prevData) => ({
                        ...prevData,
                        latitude: latitude.toString(),
                        longitude: longitude.toString()
                    }));
                },
                (error) => {
                    setErrors((prev) => ({ ...prev, geolocation: "Error al obtener la ubicación: " + error.message }));
                }
            );
        };

        getLocation();
    }, []);

    return (
        <div className='backpage'>
            <div className='containerH'>
            {/* MODAL DEMO */}
            <button type="button" className="DemoButton" style={{ width: "50px", height: "50px", borderRadius: "50%" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                <FaInfo className='DemoButton' />
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content demoContainer">
                        <div className="modal-body">
                            <div>Se puede entrenar para dar respuestas orientadas al discurso de la administración, como por ejemplo las acciones de gobierno actuales o los actos que se están investigando de las administraciones pasadas. Para este Demo, solo funciona como ChatGPT de consulta generalizada</div>
                        </div>
                        <div className="modal-content">
                            <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* MODAL DEMO */}
            <div className='container'>
                <p className='heading'>Denuncia Ciudadana</p>
                <div>
                    <div style={{ marginBottom: "20px" }}>
                        <label htmlFor="cause" style={{ display: "block", marginBottom: "5px" }}>Motivo:</label>
                        <input
                            type="text"
                            id="cause"
                            name="cause"
                            value={complaintData.cause}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                        />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <label htmlFor="complaint_comment" style={{ display: "block", marginBottom: "5px" }}>Comentario:</label>
                        <textarea
                            id="complaint_comment"
                            name="complaint_comment"
                            value={complaintData.complaint_comment}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", minHeight: "100px" }}
                        />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <input type="file" accept="image/*" capture="camera" onChange={handleImageUpload} />
                        <div style={{ marginTop: "20px" }}>
                            {image ? (
                                <img src={image}
                                    alt="Uploaded"
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "300px",
                                        border: "1px solid #ccc",
                                        padding: "10px"
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: "100%",
                                        height: "300px",
                                        border: "1px solid #ccc",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#f9f9f9"
                                    }}
                                >
                                    <span style={{ color: "#aaa" }}>No image uploaded</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <button type="submit" className="login-buttont" onClick={handleSubmit}>Enviar</button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Complaint;
