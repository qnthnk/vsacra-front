import React, { useState, useEffect } from "react";
import "./../../styles/Chat.css";
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const socket = io(process.env.BACKEND_URL);

const Chat = () => {
    const [targetUser, setTargetUser] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const [isConnected, setIsConnected] = useState(false);


    const [currentUser, setCurrentUser] = useState(() => {
        return `Usuario-${uuidv4()}`;
    });

    useEffect(() => {

        socket.on("connect", () => setIsConnected(true));
        socket.on("disconnect", () => setIsConnected(false));
        socket.on("receive_message", (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("receive_message");
        };
    }, []);

    const sendMessage = () => {
        if (!message.trim() || !targetUser.trim()) return;

        const newMessage = { text: message, target: targetUser, sender: currentUser };

        // Enviar mensaje al servidor
        socket.emit("send_message", newMessage);

        setMessage("");
    };

    return (
        <div className="backpage">
            <div className="container">
                <h2 className="heading">Chat</h2>
                {error && <p className="error">{error}</p>}
                <div>
                    <input
                        className="inputuser"
                        type="text"
                        placeholder="Buscar usuario"
                        value={targetUser}
                        onChange={(e) => setTargetUser(e.target.value)}
                    />
                </div>
                <div className="chat-box">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${msg.sender === currentUser ? "user-message" : "other-user-message"
                                }`}
                        >
                            {msg.text} { }
                        </div>
                    ))}
                </div>
                <label className="forms">
                    <input
                        type="text"
                        name="text"
                        className="input"
                        required
                        placeholder="Escribe un mensaje..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="login-button" onClick={sendMessage}>Enviar</button>
                </label>
            </div>
        </div>
    );
};

export default Chat;
