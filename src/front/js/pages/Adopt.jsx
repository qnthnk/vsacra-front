import React, { useState } from "react";
import "../../styles/ContactList.css";
import { FaInfo } from "react-icons/fa";
import Dog1 from "../../img/adopt/dog1.jpg";
import Dog2 from "../../img/adopt/dog2.jpg";
import Dog3 from "../../img/adopt/dog3.jpg";
import Dog4 from "../../img/adopt/dog4.jpg";
import Dog5 from "../../img/adopt/dog5.jpg";
import Dog6 from "../../img/adopt/dog6.jpg";
import Dog7 from "../../img/adopt/dog7.jpg";
import Dog8 from "../../img/adopt/dog8.jpg";
import Dog9 from "../../img/adopt/dog9.jpg";
import Dog10 from "../../img/adopt/dog10.jpg";
import Dog11 from "../../img/adopt/dog11.jpg";

const dogs = [
    { question: "", answer: "", image: Dog1 },
    { question: "", answer: "", image: Dog2 },
    { question: "", answer: "", image: Dog3 },
    { question: "", answer: "", image: Dog4 },
    { question: "", answer: "", image: Dog5 },
    { question: "", answer: "", image: Dog6 },
    { question: "", answer: "", image: Dog7 },
    { question: "", answer: "", image: Dog8 },
    { question: "", answer: "", image: Dog9 },
    { question: "", answer: "", image: Dog10 },
    { question: "", answer: "", image: Dog11 }


   
]
const Adopt = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
    const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
      <div className='containerRMCs'>
        <div className='containerHs'>
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
                  <div className='heroContact'>
                  <form className="formContact">
                    <h2 className='heading'>Adopta</h2>
                    <div style={{ overflowY: "auto", maxHeight: "50vh", minWidth: "65vw" }}>
                      {dogs.map((dog, index) => (
                        <div key={index}>
                          <div className='inputContact submit' style={{width:"65vw"}} onClick={() => toggleFAQ(index)} >
                            <img src={dog.image} style={{width:"50vw" ,borderRadius:"20px"}} />
                          </div>
          
                          {/* <div className={`collapse ${openIndex === index ? 'show' : ''}`} style={{ overflowY: "auto", maxHeight: "40vh", minWidth: "80vw" }}>
                            <div className="inputContacts">{dog.answer}</div>
                          </div> */}
                </div>
              ))}
            </div>
            </form>
          </div>
        </div>
      </div>);
  };

export default Adopt;
