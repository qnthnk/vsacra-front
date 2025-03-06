import React, { useState } from "react";

const ChatBot = () => {
    const [GPTResponse, setGPTResponse]= useState("")
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const newMessage = { user: "Usuario", text: message };
        console.log("este es el mensaje que se envia",message)
        try {
            const response = await fetch("https://miniature-barnacle-x6xjp69pvgpc9q5j-3001.app.github.dev/api/chatbot", {
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
        <div className="chat-container">
        <h2>Chatbot</h2>
        {error && <p className="error">{error}</p>}
        <label className="search-label">
            <input
                type="text"
                name="text"
                className="input"
                required
                placeholder="Type here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <kbd className="slash-icon">/</kbd>
        </label>
        <button onClick={sendMessage}>Enviar</button>
        <h3>{GPTResponse}</h3>
    </div>
    );
};

export default ChatBot;