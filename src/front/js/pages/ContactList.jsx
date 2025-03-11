import React from "react";
import AddContact from "../component/AddContact.jsx";
import ViewContact from "../component/ViewContact.jsx";
import { useState } from "react";

const ContactList = () => {
    

      const [view, setView] = useState(null);

      const toggleView = (viewName) => {
        setView(view === viewName ? null : viewName);
      };

      return (
        <div className="backpage">
           <div className="container text-center">
        <div className="row">
          <div className="forms">
            <button type="button" className="login-button" onClick={() => toggleView("view")}>Ver contactos</button>
          </div>
          <div className="">
            {view === "view" && <ViewContact />}
          </div>
        </div>
          </div>
          <div className="container text-center">
        <div className="row">
          <div className="forms">
            <button type="button" className="login-button" onClick={() => toggleView("add")}>Agregar contacto</button>
          </div>
          <div className="">
            {view === "add" && <AddContact />}
          </div>
        </div>
          </div>
         
        </div>
      );
    };

export default ContactList
