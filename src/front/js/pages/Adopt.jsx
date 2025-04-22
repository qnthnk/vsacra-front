import React, { useState } from "react";
import "../../styles/ContactList.css";
import { FaInfo } from "react-icons/fa";
import Dog1 from "../../img/adopt/IMG_4713.jpg";
import Dog2 from "../../img/adopt/IMG_4714.jpg";
import Dog3 from "../../img/adopt/IMG_4715.jpg";
import Dog4 from "../../img/adopt/IMG_4716.jpg";
import Dog5 from "../../img/adopt/IMG_4717.jpg";
import Dog6 from "../../img/adopt/IMG_4718.jpg";
import Dog7 from "../../img/adopt/IMG_4719.jpg";
import Dog8 from "../../img/adopt/IMG_4720.jpg";
import Dog9 from "../../img/adopt/IMG_4721.jpg";
import Dog10 from "../../img/adopt/IMG_4722.jpg";
import Dog11 from "../../img/adopt/IMG_4723.jpg";
import Dog12 from "../../img/adopt/IMG_4724.jpg";
import Dog13 from "../../img/adopt/IMG_4725.jpg";
import Dog14 from "../../img/adopt/IMG_4726.jpg";
import Dog15 from "../../img/adopt/IMG_4727.jpg";
import Dog16 from "../../img/adopt/IMG_4728.jpg";
import Dog17 from "../../img/adopt/IMG_4729.jpg";
import Dog18 from "../../img/adopt/IMG_4730.jpg";
import Dog19 from "../../img/adopt/IMG_4731.jpg";

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
    { question: "", answer: "", image: Dog11 },
    { question: "", answer: "", image: Dog12 },
    { question: "", answer: "", image: Dog13 },
    { question: "", answer: "", image: Dog14 },
    { question: "", answer: "", image: Dog15 },
    { question: "", answer: "", image: Dog16 },
    { question: "", answer: "", image: Dog17 },
    { question: "", answer: "", image: Dog18 },
    { question: "", answer: "", image: Dog19 },

   
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
                    <div style={{ overflowY: "auto", maxHeight: "50vh", minWidth: "55vw" }}>
                      {dogs.map((dog, index) => (
                        <div key={index}>
                          <div className='inputContact submit' style={{width:"55vw"}} onClick={() => toggleFAQ(index)} >
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
