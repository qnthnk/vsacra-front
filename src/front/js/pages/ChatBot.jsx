import React, { useState } from "react";
import './../../styles/Chatbot.css';
import { FaInfo } from "react-icons/fa";

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
            <div className="containerH">
             {/* MODAL DEMO */}
             <button type="button" className="DemoButton" style={{ width: "50px", height: "50px", borderRadius: "50%" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <FaInfo className='DemoButton' />
                  </button>
                  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div className="modal-content demoContainer">
                        <div className="modal-body">
                          <div className=''>Se puede entrenar para dar respuestas orientadas al discurso de la administración, como por ejemplo las acciones de gobierno actuales o los actos que se están investigando de las administraciones pasadas. Para este Demo, solo funciona como ChatGPT de consulta generalizada</div>
                        </div>
                        <div className="modal-content">
                          <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                   {/* MODAL DEMO */}
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
                    <button className="login-buttont" onClick={sendMessage}>Preguntar</button>
                </label>
                <div className="forms">
                    <h4 className="input">{GPTResponse}</h4>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ChatBot;