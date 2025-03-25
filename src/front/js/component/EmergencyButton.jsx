import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import './../../styles/home.css';

const EmergencyButton = ({ userId }) => {
    const { actions } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [showCountdown, setShowCountdown] = useState(false);
    const [countdown, setCountdown] = useState(5);

    const handleEmergencia = () => {
        setLoading(true);
        setShowCountdown(false);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const latitude = position.coords.latitude.toString();
                    const longitude = position.coords.longitude.toString();

                    try {
                        await actions.sendEmergencyCoordinates(latitude, longitude);

                    } catch (error) {
                        alert(error.message || "Hubo un error al enviar las coordenadas.");
                    } finally {
                        setLoading(false);
                    }
                },
                (error) => {
                    alert("No se pudo obtener la ubicación.");
                    setLoading(false);
                }
            );
        } else {
            alert("Geolocalización no soportada en este navegador.");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (showCountdown && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            handleEmergencia();
        }
    }, [showCountdown, countdown]);

    return (
        <>
            <button
                onClick={() => {
                    if (window.confirm("¿Estás seguro de que quieres enviar una alerta de EMERGENCIA a todos tus contactos?")) {
                        setShowCountdown(true);
                        setCountdown(5);
                    }
                }}
                className="login-buttonesEmergencia"
                disabled={loading}
            >
                <i className="fas fa-exclamation-triangle me-2"></i>
                {loading ? 'Enviando...' : ''}
            </button>

            {showCountdown && (
                <div className="modal-overlay">
                    <div className="modal-contentE">
                        <h2>Enviando alerta en...</h2>
                        <p className="countdown">{countdown}</p>
                    </div>
                </div>
            )}

        </>
    );
};

export default EmergencyButton;
