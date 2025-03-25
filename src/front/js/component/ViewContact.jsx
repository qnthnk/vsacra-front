import React, { useState, useEffect, useContext } from "react";
import { IoLocation } from "react-icons/io5";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdEmail, MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";


const ViewContact = () => {
    const { store, actions } = useContext(Context);
    const [detector, setDetector] = useState(false);
    const [payload, setPayload] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        role: "",
    });

    const handleEdit = async (event, payload, id) => {
        try {
            event.preventDefault();
            await actions.editContact(id, payload);
            setDetector((prev) => !prev);
            setPayload({
                full_name: "",
                email: "",
                phone_number: "",
                role: "",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id, event) => {
        event.preventDefault(); // Evita que la página se recargue

        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás recuperar este contacto una vez eliminado.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
    
        if (result.isConfirmed) {
            try {
                await actions.deleteContact(id);
                setDetector((prev) => !prev);
    
                // Mensaje de éxito
                Swal.fire({
                    title: "¡Eliminado!",
                    text: "El contacto ha sido eliminado con éxito.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                });
            } catch (error) {
                console.error(error);
    
                // Mensaje de error
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al eliminar el contacto.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            }
        }
    };

    useEffect(() => {
        actions.viewContacts();
    }, [detector]);

    return (
        <div className="">
            <div className="">
            <h1 className="">Contactos</h1>
                <div  className="containermaplist places-list">
                    
                    {Array.isArray(store.contact) &&
                        store.contact.map((item, index) => (
                            <div className="row" key={index}>
                                <div className="col-3"></div>
                                <div className="col-7">
                                    <p>{item.full_name}</p>
                                    <p>
                                        <FaPhoneFlip /> {item.phone_number}
                                    </p>
                                    <p>
                                        <MdEmail /> {item.email}
                                    </p>
                                </div>
                                <div className="col-2">
                                    <div className="row">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#exampleModal${index}`}
                                        >
                                            <MdModeEditOutline />
                                        </button>
                                        <div
                                            className="modal fade"
                                            id={`exampleModal${index}`}
                                            tabIndex="-1"
                                            aria-labelledby="exampleModalLabel"
                                            aria-hidden="true"
                                        >
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                                                            Editar Contacto
                                                        </h1>
                                                        <button
                                                            type="button"
                                                            className="btn-close"
                                                            data-bs-dismiss="modal"
                                                            aria-label="Close"
                                                        ></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="mb-3">
                                                            <input
                                                                type="text"
                                                                value={payload.full_name}
                                                                onChange={(e) =>
                                                                    setPayload({ ...payload, full_name: e.target.value })
                                                                }
                                                                placeholder="Nombre completo"
                                                                className="form-control"
                                                            />
                                                            <br />
                                                            <input
                                                                type="email"
                                                                value={payload.email}
                                                                onChange={(e) =>
                                                                    setPayload({ ...payload, email: e.target.value })
                                                                }
                                                                placeholder="Email"
                                                                className="form-control"
                                                            />
                                                            <br />
                                                            <input
                                                                type="text"
                                                                value={payload.phone_number}
                                                                onChange={(e) =>
                                                                    setPayload({ ...payload, phone_number: e.target.value })
                                                                }
                                                                placeholder="Teléfono"
                                                                className="form-control"
                                                            />
                                                            <br />
                                                            <input
                                                                type="text"
                                                                value={payload.role}
                                                                onChange={(e) =>
                                                                    setPayload({ ...payload, role: e.target.value })
                                                                }
                                                                placeholder="Rol"
                                                                className="form-control"
                                                            />
                                                            <br />
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                            data-bs-dismiss="modal"
                                                        >
                                                            Cerrar
                                                        </button>
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={(event) => handleEdit(event, payload, item.id)}
                                                        >
                                                            Guardar cambios
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="btn btn-danger"
                                            onClick={(event) => handleDelete(item.id, event)}
                                        >
                                            <MdDeleteForever />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ViewContact;