import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";



const AddContact = () => {
    const { store, actions } = useContext(Context);
    const [newContact, setNewContact] = useState({});
    const [payload, setPayload] = useState({
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        contactRole: ""
    });

    const handleAdd = (event) => {
        event.preventDefault();
        setNewContact(payload);
        actions.addContact(payload);
        setPayload({
            contactName: "",
            contactEmail: "",
            contactPhone: "",
            contactRole: ""
        });
        console.log("Pay", payload)
        alert("Contacto agregado!")
    };

    console.log(payload);

    useEffect(() => {
        console.log("addcontact activo");
    }, []);
    

    return (
        <div className="text-center mt-5">
            <h1>funciono</h1>
            <div className="">
                
                <div className="">
                    <h1 className="">New Contact</h1>

                    <div className="mb-3">
                        <input type="text" value={payload.contactName} onChange={(e) => setPayload({ ...payload, contactName: e.target.value })} placeholder="Full Name" className="form-control" />
                        <br />
                        <input type="email" value={payload.contactEmail} onChange={(e) => setPayload({ ...payload, contactEmail: e.target.value })} placeholder="Email" className="form-control" />
                        <br />
                        <input type="text" value={payload.contactPhone} onChange={(e) => setPayload({ ...payload, contactPhone: e.target.value })} placeholder="Phone Number" className="form-control" />
                        <br />
                        <input type="text" value={payload.contactRole} onChange={(e) => setPayload({ ...payload, contactRole: e.target.value })} placeholder="Address" className="form-control" />
                        <br />
                    </div>
                    <button type="submit" className="btn btn-warning" onClick={handleAdd}>Save Contact</button>
                    <br />
                </div>
            </div>
        </div>
    )
};
export default AddContact;