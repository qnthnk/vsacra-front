import React, { useState } from "react";
import './../../styles/Chatbot.css';
import { RiHome6Fill } from "react-icons/ri";

const ChatBot = () => {
    const [GPTResponse, setGPTResponse]= useState("")
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const newMessage = { user: "Usuario", text: message };
        console.log("este es el mensaje que se envia",message)
        try {
            const response = await fetch(process.env.BACKEND_URL + "api/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({"message": message })
            });

            const data = await response.json();
            if (response.ok) {
                setGPTResponse(data.response)
            } else {
                setError(data.error || "Error en el chatbot.");
            }
        } catch (err) {
            setError("Error en la conexión con el servidor.");
        }

        setMessage("");
    };

    return (
        <div className="backpage">
            <div className="container">
                <h2 className="heading">Chatbot</h2>
                {error && <p className="error">{error}</p>}
                <label className="forms">
                    <input
                        type="text"
                        name="text"
                        className="input"
                        required
                        placeholder="¿Comó puedo ayudarte?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="login-button" onClick={sendMessage}>Preguntar</button>
                </label>
                <div className="forms">
                    <h4 className="input">{GPTResponse}</h4>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="login-buttonesN" onClick={() => {
                    const isLoggedIn = true; // Aquí deberías verificar si el usuario está loggeado correctamente
                    if (isLoggedIn) {
                        window.location.href = '/home';
                    } else {
                        window.location.href = '/login';
                    }
                }}><RiHome6Fill style={{fontSize:"2em"}}/></button>
            </div>
        </div>
    );
};

export default ChatBot;