import { Link } from 'react-router-dom';

import React, { useState } from 'react';
import "../../styles/home.css";
import { FaInfo } from "react-icons/fa";

const faqs = [
  { question: "Transporte", answer: "Datos sobre rutas de camiones y sitios de taxi seguros. " },
  { question: "Números de emergencia", answer: "Directorio de emergencias." },
  { question: "Programas de Gobierno", answer: "Programas y requisitos." },
  { question: "Links", answer: "Links hacia páginas oficiales." },
  { question: "Novedades", answer: "Servicios que actualmente están disponibles como albercas o pistas de hielo." },
  { question: "Otros", answer: <>Puedes consultar nuestro <a href="/chatbot">Chatbot</a>.</> },
  ];

const FreqAskedQuestions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='backpage'>
      <div className='containerH'>
      {/* MODAL DEMO */}
                  <button type="button" className="DemoButton" style={{ width: "50px", height: "50px", borderRadius: "50%" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <FaInfo className='DemoButton' />
                  </button>
                  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div className="modal-content demoContainer">
                        <div className="modal-body">
                          <div className=''>Está pensado como un tríptico digital en el que se pueda brindar información de uso común a la ciudadanía. De igual manera, sirve de periódico mural para publicar las actualizaciones de las acciones de gobierno que se lleven a cabo.</div>
                        </div>
                        <div className="modal-content">
                          <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                   {/* MODAL DEMO */}
          <div className='containerFAQ'>
            <h2 className='heading'>Entérate</h2>
            <div>
        {faqs.map((faq, index) => (
          <div  key={index}>
            <div className='login-buttonesFAQ' onClick={() => toggleFAQ(index)} >
              <h5 >{faq.question}</h5>
            </div>
            
            <div className={`collapse ${openIndex === index ? 'show' : ''}`}>
              <div className="containerAnswer">{faq.answer}</div>
            </div>
          </div>
        ))}
        </div>
        </div>
      </div>
    </div>);
};

export default FreqAskedQuestions;