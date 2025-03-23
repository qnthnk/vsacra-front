import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext'; // Importa el contexto global

const ForgotPassword = () => {
    const { actions } = useContext(Context); // Accede a las acciones desde el contexto
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Llama a la acción `forgotPassword` desde el contexto
            const result = await actions.forgotPassword(email);

            // Verifica si hay un error en el resultado
            if (result.error) {
                setError(result.error); // Muestra el error
                setMessage('');
            } else {
                setMessage(result.message); // Muestra el mensaje de éxito
                setError('');

                // Redirige a la página de restablecimiento de contraseña
                navigate('/reset-password', { state: { email } }); // Pasa el correo como estado
            }
        } catch (error) {
            // Captura cualquier error inesperado
            console.error("Error inesperado:", error);
            setError("Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Recuperar Contraseña</h2>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default ForgotPassword;