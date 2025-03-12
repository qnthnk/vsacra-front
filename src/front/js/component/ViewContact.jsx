import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { MdDeleteForever } from "react-icons/md"; // Si usas este ícono, asegúrate de importarlo correctamente.

const ViewContact = () => {
    const { store, actions } = useContext(Context);
    const [detector, setDetector] = useState(false);
    const [payload, setPayload] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        role: "",
        user_id: ""
    });

    // Cargar los contactos al montar el componente o cuando cambie detector
    useEffect(() => {
        actions.viewContactos();
    }, [detector]);

    // Llenar el formulario de edición con el contacto seleccionado
    const openEditModal = (contact) => {
        setPayload(contact);
    };

    // Enviar cambios editados
    const handleEdit = async (event, id) => {
        event.preventDefault();
        try {
            console.log("Editando contacto:", id, payload);
            await actions.editContact(id, payload);
            setDetector(prev => !prev);
            setPayload({
                full_name: "",
                email: "",
                phone_number: "",
                role: "",
                user_id: ""
            });
        } catch (error) {
            console.error("Error al editar:", error);
        }
    };

    // Eliminar contacto
    const handleDelete = async (id, event) => {
        event.preventDefault();
        if (window.confirm("¿Estás seguro que quieres borrar este contacto?")) {
            try {
                console.log("Eliminando contacto con ID:", id);
                await actions.deleteContact(id);
                setDetector(prev => !prev);
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        }
    };

    return (
        <div className="text-center mt-5">
            <h1>Contactos</h1>

            {store.contact && Array.isArray(store.contact) && store.contact.length > 0 ? (
                store.contact.map((item, index) => (
                    <div className="row" key={index}>
                        <div className="col">
                            <p><strong>Nombre:</strong> {item.full_name || "No disponible"}</p>
                            <p><strong>Parentesco:</strong> {item.role || "No disponible"}</p>
                            <p><strong>Teléfono:</strong> {item.phone_number || "No disponible"}</p>
                            <p><strong>Email:</strong> {item.email || "No disponible"}</p>
                        </div>

                        <div className="col-2">
                            <div className="row">
                                {/* Botón para abrir modal de edición */}
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#exampleModal${index}`}
                                    onClick={() => openEditModal(item)}
                                >
                                    Editar
                                </button>

                                {/* Modal de edición */}
                                <div className="modal fade" id={`exampleModal${index}`} tabIndex="-1">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Editar Contacto</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="mb-3">
                                                    <input
                                                        type="text"
                                                        value={payload.full_name}
                                                        onChange={(e) => setPayload({ ...payload, full_name: e.target.value })}
                                                        placeholder="Nombre Completo"
                                                        className="form-control"
                                                    />
                                                    <br />
                                                    <input
                                                        type="email"
                                                        value={payload.email}
                                                        onChange={(e) => setPayload({ ...payload, email: e.target.value })}
                                                        placeholder="Email"
                                                        className="form-control"
                                                    />
                                                    <br />
                                                    <input
                                                        type="text"
                                                        value={payload.phone_number}
                                                        onChange={(e) => setPayload({ ...payload, phone_number: e.target.value })}
                                                        placeholder="Teléfono"
                                                        className="form-control"
                                                    />
                                                    <br />
                                                    <input
                                                        type="text"
                                                        value={payload.role}
                                                        onChange={(e) => setPayload({ ...payload, role: e.target.value })}
                                                        placeholder="Parentesco"
                                                        className="form-control"
                                                    />
                                                    <br />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                <button className="btn btn-success" onClick={(event) => handleEdit(event, item.id)}>Guardar cambios</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Botón para eliminar */}
                                <button className="btn btn-danger" onClick={(event) => handleDelete(item.id, event)}>
                                    <MdDeleteForever />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <h1>No hay contactos</h1>
            )}
        </div>
    );
};

export default ViewContact;
