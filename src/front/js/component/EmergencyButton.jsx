import React, { useContext } from 'react';
import { Context } from '../store/flux';

const BotonEmergencia = ({ userId }) => {
    const { actions } = useContext(Context);

    const handleEmergencia = () => {
        actions.sendEmergencyCoordinates(userId);
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

export default BotonEmergencia;