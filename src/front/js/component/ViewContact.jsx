import React, { useState, useEffect, useContext } from "react";
import { IoLocation } from "react-icons/io5";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { Context } from "../store/appContext";



const ViewContact = () => {
    const { store, actions } = useContext(Context);
    const [detector, setDetector] = useState(false)
    const [payload, setPayload] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        role: ""
    })
    console.log(payload);
    const handleEdit = async (event, payload, id) => {
        try {
            console.log("aqui debe estar el pedo", event, payload, id)
            event.preventDefault();
            // setNewContact(payload);
            await actions.editContact(id, payload);
            setDetector(prev => !prev)
            setPayload({
                contactName: "",
                contactEmail: "",
                contactPhone: "",
                contactRole: ""
            });
        } catch (error) {
            console.error(error)

        }
    }
    const handleDelete = async (id, event) => {
        try {
            event.preventDefault();
            console.log("id buscado", id);
            if (window.confirm("Estas seguro que quieres borrar el contacto?")) {
                await actions.deleteContact(id);
                setDetector(prev => !prev)
            }
            console.log("DELETE", id);

        } catch (error) {
            console.error(error)

        }
    }
    useEffect(() => {
        actions.viewContactos();
        console.log(store.contact);
        console.log("viewcontact activo");
    }, [detector]);
    return (

        <div className="text-center mt-5">
            <div className="">
                <div className=" ">
                    <h1 className="">Contactos</h1>
                    {Array.isArray(store.contact) && store.contact.map((item, index) => (
                        <div className="row " key={index}>
                            <div className="col-3">
                            </div>
                            <div className="col-7">
                                <p>{item.full_name}</p>
                                <p><IoLocation />{item.role}</p>
                                <p><FaPhoneFlip />{item.phone_number}</p>
                                <p><MdEmail />{item.email}</p>
                                <p>{item.id}</p>
                            </div>

                            <div className="col-2">
                                <div className="row">
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#exampleModal${index}`}>
                                        <MdModeEditOutline /></button>
                                    <div className="modal fade" id={`exampleModal${index}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
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
                                                    ...
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button className="btn col" onClick={(event) => handleEdit(event, payload, item.id)}>Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="btn col" onClick={(event) => handleDelete(item.id, event)} ><MdDeleteForever /></button>
                                </div>
                            </div>
                        </div>

                    ))}

                </div>
            </div>
        </div>
    );
}
export default ViewContact;
