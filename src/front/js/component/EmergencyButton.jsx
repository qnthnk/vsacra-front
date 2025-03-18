import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';

const EmergencyButton = ({ userId }) => {
    const { actions } = useContext(Context);
    const [loading, setLoading] = useState(false); // Estado para manejar el loading

    const handleEmergencia = () => {
        setLoading(true); // Activar el estado de loading

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    // Convertir las coordenadas a cadenas (strings)
                    const latitudeStr = latitude.toString();
                    const longitudeStr = longitude.toString();

                    console.log("Coordenadas obtenidas:", { latitude: latitudeStr, longitude: longitudeStr }); // Log de las coordenadas

                    try {
                        await actions.sendEmergencyCoordinates(latitudeStr, longitudeStr);
                        alert("Coordenadas enviadas correctamente.");
                    } catch (error) {
                        console.error("Error al enviar las coordenadas:", error);
                        alert(error.message || "Hubo un error al enviar las coordenadas.");
                    } finally {
                        setLoading(false); // Desactivar el estado de loading
                    }
                },
                (error) => {
                    console.error("Error al obtener la ubicación:", error);
                    alert("No se pudo obtener la ubicación.");
                    setLoading(false); // Desactivar el estado de loading en caso de error
                }
            );
        } else {
            alert("Geolocalización no soportada en este navegador.");
            setLoading(false); // Desactivar el estado de loading
        }
    };

    return (
        <button
            onClick={handleEmergencia}
            className="btn btn-danger btn-lg"
            disabled={loading} // Deshabilitar el botón mientras se carga
        >
            <i className="fas fa-exclamation-triangle me-2"></i>
            {loading ? 'Enviando...' : 'Botón de Emergencia'}
        </button>
    );
};

export default EmergencyButton;