import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import AddContact from "../component/AddContact.jsx";
import ViewContact from "../component/ViewContact.jsx";
import { RiHome6Fill } from "react-icons/ri";

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
      <div className="container text-center">
        <div className="row">
          <div className="forms">
            <button
              type="button"
              className="login-button"
              onClick={() => toggleView("view")}
            >
              Ver contactos
            </button>
          </div>
          <div className="">
            {view === "view" && <ViewContact />}
          </div>
        </div>
      </div>
      <div className="container text-center">
        <div className="row">
          <div className="forms">
            <button
              type="button"
              className="login-button"
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

export default ContactList;
