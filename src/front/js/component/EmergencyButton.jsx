import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import Swal from 'sweetalert2';
import './../../styles/home.css';

const EmergencyButton = () => {
    const { actions } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [showCountdown, setShowCountdown] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [geolocationError, setGeolocationError] = useState(null);

    

    const getLocation = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocalización no soportada'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                position => resolve(position),
                error => {
                    let errorMessage = 'Error al obtener ubicación';
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = 'Permiso de ubicación denegado';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = 'Información de ubicación no disponible';
                            break;
                        case error.TIMEOUT:
                            errorMessage = 'Tiempo de espera agotado';
                            break;
                    }
                    reject(new Error(errorMessage));
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        });
    };

    const handleEmergencia = async () => {
        setLoading(true);
        setGeolocationError(null);

        try {
            const position = await getLocation();
            const latitude = position.coords.latitude.toString();
            const longitude = position.coords.longitude.toString();
            const user_id = localStorage.getItem('id');

            if (!user_id) {
                throw new Error('No se pudo identificar al usuario');
            }

            const result = await actions.sendTwilioAlert(latitude, longitude);

            showSuccessAlert(latitude, longitude, result.contacts_notified);
        } catch (error) {
            handleEmergencyError(error);
        } finally {
            setLoading(false);
        }
    };

    const showSuccessAlert = (latitude, longitude, contactsNotified) => {
        Swal.fire({
            title: '¡Alerta enviada!',
            html: `
                <div style="text-align: left;">
                    <p>Se notificó a <strong>${contactsNotified} contactos</strong>.</p>
                    <p><strong>Tu ubicación actual:</strong></p>
                    <ul>
                        <li>Latitud: ${latitude}</li>
                        <li>Longitud: ${longitude}</li>
                    </ul>
                    <a href="https://www.google.com/maps?q=${latitude},${longitude}" 
                       target="_blank" 
                       style="color: #d33; font-weight: bold; text-decoration: underline;">
                        Ver en Google Maps
                    </a>
                    <p style="margin-top: 15px; font-size: 0.9em; color: #555;">
                        Los contactos recibieron tus datos médicos importantes.
                    </p>
                </div>
            `,
            icon: 'success',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#28a745'
        });
    };

    const handleEmergencyError = (error) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            html: `
                <p>${error.message}</p>
                ${geolocationError ?
                    '<p style="font-size: 0.9em;">Por favor habilita los permisos de ubicación en tu navegador.</p>' :
                    '<p style="font-size: 0.9em;">Intenta nuevamente o contacta al soporte.</p>'
                }
            `,
            confirmButtonText: 'Aceptar'
        });
    };

    useEffect(() => {
        let timer;
        if (showCountdown && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0 && showCountdown) {
            handleEmergencia();
            setShowCountdown(false);
        }
        return () => clearTimeout(timer);
    }, [showCountdown, countdown]);

    return (
        <>
            <button
                onClick={() => {
                    Swal.fire({
                        title: "¿Estás en emergencia?",
                        html: `
                            <div style="text-align: left;">
                                <p>Al confirmar, se enviará una alerta a:</p>
                                <ul>
                                    <li>Todos tus contactos de emergencia</li>
                                    <li>Con tu ubicación exacta en tiempo real</li>
                                    <li>Tus datos médicos importantes</li>
                                </ul>
                                <p style="color: #d33; font-weight: bold; margin-top: 15px;">
                                    Esta acción no puede deshacerse.
                                </p>
                            </div>
                        `,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#6c757d",
                        confirmButtonText: "Sí, necesito ayuda",
                        cancelButtonText: "Cancelar",
                        focusCancel: true
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setShowCountdown(true);
                            setCountdown(5);
                        }
                    });
                }}
                className={`login-buttonesEmergencia ${loading ? 'disabled' : ''}`}
                disabled={loading}
            >
                <i className="fas fa-exclamation-triangle me-2"></i>
                {loading ? 'Enviando...' : 'Botón de Emergencia'}
            </button>

            {showCountdown && (
                <div className="modal-overlay">
                    <div className="modal-contentE">
                        <h2>Enviando alerta en...</h2>
                        <p className="countdown">{countdown}</p>
                        <button
                            className="btn btn-outline-secondary mt-3"
                            onClick={() => {
                                setShowCountdown(false);
                                setCountdown(5);
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default EmergencyButton;