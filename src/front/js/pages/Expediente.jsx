import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '../store/appContext';

const Expediente = () => {
    const { actions } = useContext(Context);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Cargar todos los usuarios al montar el componente
    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                const usersData = await actions.getAllUsers();
                setUsers(usersData);
            } catch (error) {
                console.error("Error cargando usuarios:", error);
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    // Función para manejar la selección de usuario
    const handleSelectUser = (userId) => {
        const user = users.find(u => u.id === userId);
        setSelectedUser(user);
        if (user) setShowModal(true);
    };

    // Función para formatear campos vacíos
    const formatField = (value) => value || 'No especificado';

    return (
        <div className="container py-4">
            <h2 className="mb-4">Expedientes de Usuarios</h2>

            {/* Selector de usuarios */}
            <div className="card mb-4">
                <div className="card-body">
                    <label className="form-label">Seleccione un usuario:</label>
                    <select
                        className="form-select"
                        onChange={(e) => handleSelectUser(parseInt(e.target.value))}
                        disabled={loading}
                    >
                        <option value="">-- Seleccione un usuario --</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.first_name} {user.first_last_name} ({user.email})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {loading && (
                <div className="text-center my-4">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            )}

            {/* Modal para mostrar los detalles */}
            {selectedUser && (
                <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    Expediente de {selectedUser.first_name} {selectedUser.first_last_name}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    {/* Columna izquierda - Datos personales */}
                                    <div className="col-md-6">
                                        <h5>Datos Personales</h5>
                                        <p><strong>Nombre:</strong> {selectedUser.first_name}</p>
                                        <p><strong>Apellido Paterno:</strong> {selectedUser.first_last_name}</p>
                                        <p><strong>Apellido Materno:</strong> {selectedUser.second_last_name}</p>
                                        <p><strong>CURP:</strong> {selectedUser.curp}</p>
                                        <p><strong>Género:</strong> {selectedUser.gender}</p>
                                        <p><strong>Fecha Nacimiento:</strong> {formatField(selectedUser.birthdate)}</p>

                                        <h5 className="mt-4">Contacto</h5>
                                        <p><strong>Email:</strong> {selectedUser.email}</p>
                                        <p><strong>Teléfono:</strong> {selectedUser.phone_number}</p>
                                        <p><strong>Facebook:</strong> {formatField(selectedUser.facebook)}</p>
                                        <p><strong>Instagram:</strong> {formatField(selectedUser.instagram)}</p>
                                        <p><strong>Twitter/X:</strong> {formatField(selectedUser.x)}</p>
                                    </div>

                                    {/* Columna derecha - Información médica y dirección */}
                                    <div className="col-md-6">
                                        <h5>Información Médica</h5>
                                        <p><strong>Tipo de Sangre:</strong> {formatField(selectedUser.blood_type)}</p>
                                        <p><strong>Alergias:</strong> {formatField(selectedUser.allergy)}</p>
                                        <p><strong>Enfermedades:</strong> {formatField(selectedUser.disease)}</p>

                                        <h5 className="mt-4">Dirección</h5>
                                        <p><strong>Calle:</strong> {selectedUser.street} #{selectedUser.house_number}</p>
                                        <p><strong>Colonia:</strong> {selectedUser.colonia_mex}</p>
                                        <p><strong>Municipio:</strong> {selectedUser.nombre_municipio}</p>
                                        <p><strong>Estado:</strong> {selectedUser.state}</p>
                                        <p><strong>Código Postal:</strong> {selectedUser.zip_code}</p>
                                        <p><strong>Sección:</strong> {selectedUser.seccion}</p>
                                        <p><strong>Distrito Federal:</strong> {selectedUser.distrito_federal}</p>
                                        <p><strong>Distrito Local:</strong> {selectedUser.distrito_local}</p>
                                        <p><strong>Tipo Sección:</strong> {selectedUser.tipo_seccion}</p>
                                        <p><strong>Coordenadas:</strong> {formatField(selectedUser.latitude)}, {formatField(selectedUser.longitude)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Expediente;