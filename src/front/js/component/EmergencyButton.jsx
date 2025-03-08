import React, { useContext } from 'react';
import { Context } from '../store/appContext';

const EmergencyButton = ({ userId }) => {
    const { actions } = useContext(Context);

    const handleEmergencia = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    actions.sendEmergencyCoordinates(userId, latitude, longitude);
                },
                (error) => {
                    console.error("Error al obtener la ubicación:", error);
                    alert("No se pudo obtener la ubicación.");
                }
            );
        } else {
            alert("Geolocalización no soportada en este navegador.");
        }
    };

    return (
        <button
            onClick={handleEmergencia}
            className="btn btn-danger btn-lg"
        >
            <i className="fas fa-exclamation-triangle me-2"></i>
            Botón de Emergencia
        </button>
    );
};

export default EmergencyButton;