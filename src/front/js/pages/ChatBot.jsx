import React, { useState } from "react";

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const newMessage = { user: "Usuario", text: message };
        setMessages([...messages, newMessage]);

        try {
            const response = await fetch("http://localhost:5000/api/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            if (response.ok) {
                setMessages([...messages, newMessage, { user: "Chatbot", text: data.response }]);
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
        <div className="chat-box">
            {messages.map((msg, index) => (
                <p key={index} className={msg.user === "Usuario" ? "user-msg" : "bot-msg"}>
                    <strong>{msg.user}:</strong> {msg.text}
                </p>
            ))}
        </div>
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
            <svg
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="512"
                height="512"
                viewBox="0 0 56.966 56.966"
            >
                <g>
                    <path
                        d="M55.146 51.887 41.588 37.786A22.926 22.926 0 0 0 46.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 0 0 .083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z"
                        fill="currentColor"
                    ></path>
                </g>
            </svg>
        </label>
        <button onClick={sendMessage}>Enviar</button>
    </div>
    );
};

export default ChatBot;