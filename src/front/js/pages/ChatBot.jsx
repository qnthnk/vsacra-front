import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

const ChatBot = () => {
    const { actions, store } = useContext(Context);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    const handleSendMessage = async () => {
        if (message.trim() === "") return;

        // Agregar mensaje del usuario al chat
        const userMessage = { sender: "user", text: message };
        setChat([...chat, userMessage]);

        // Enviar mensaje a la IA
        const response = await actions.getAIResponse(message);
        const aiMessage = { sender: "bot", text: response };

        // Actualizar chat con la respuesta de la IA
        setChat([...chat, userMessage, aiMessage]);
        setMessage("");
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-primary text-white">ChatBot</div>
                <div className="card-body" style={{ height: "300px", overflowY: "auto" }}>
                    {chat.map((msg, index) => (
                        <div key={index} className={`alert ${msg.sender === "user" ? "alert-info" : "alert-secondary"}`}>
                            <strong>{msg.sender === "user" ? "Tú" : "Bot"}:</strong> {msg.text}
                        </div>
                    ))}
                </div>
                <div className="card-footer">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Escribe un mensaje..."
                        />
                        <button className="btn btn-primary" onClick={handleSendMessage}>
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;