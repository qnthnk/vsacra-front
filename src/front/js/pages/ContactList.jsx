import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import AddContact from "../component/AddContact.jsx";
import ViewContact from "../component/ViewContact.jsx";
import "../../styles/home.css"
import { FaInfo } from "react-icons/fa";

const ContactList = () => {
  const { actions } = useContext(Context);
  const [view, setView] = useState(null);

  // Cargar los contactos al montar el componente
  useEffect(() => {
    actions.viewContacts();
  }, []);

  const toggleView = (viewName) => {
    setView(view === viewName ? null : viewName);
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
                            <div className=''>Cada usuario puede agregar hasta 5 contactos de emergencia a quienes se les enviará un mensaje de alerta con la ubicación en tiempo real del usuario, el teléfono de contacto y datos clínicos de tipo de sangre, alergias y enfermedades crónicas en caso de que se requiera brindar auxilio médico.</div>
                            <br/>
                            <div style={{fontWeight:"bolder"}}>Por favor agregue al menos un registro con datos de contacto reales para que puedan recibir el mensaje muestra de alerta cuando presionen el botón de pánico</div>

                          </div>
                          <div className="modal-content">
                            <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Cerrar</button>
                          </div>
                        </div>
                      </div>
                    </div>
                     {/* MODAL DEMO */}
      <div className="container text-center">
       
        <div className="row">
          <div className="forms">
            <button
              type="button"
              className="login-buttont"
              onClick={() => toggleView("view")}
            >
              Ver contactos
            </button>
          </div>
          <div >
              {view === "view" && <ViewContact />}
          </div>
        </div>
      </div>
      <div className="container text-center">
        <div className="row">
          <div className="forms">
            <button
              type="button"
              className="login-buttont"
              onClick={() => toggleView("add")}
            >
              Agregar contacto
            </button>
          </div>
          <div className="">
            {view === "add" && <AddContact />}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactList;
