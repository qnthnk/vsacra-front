import { jwtDecode } from 'jwt-decode';
const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            currencies: [],
            convertedAmount: null,
            error: null,
            weather: null,
            loading: false,
            selectedLocation: null,

            contact: [],


            user: {
                isAuthenticated: false,
                token: null,
                role: null,  // Agregar el rol al estado global
            },


        },
        actions: {

            // Use getActions to call a function within a fuction
            register: async (dataToSend) => {

                console.log("datos cuando se hace clic en registro", dataToSend)
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "api/signup", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataToSend)
                    })
                    if (!resp.ok) {
                        throw new Error('valio v...')
                    } else {
                        alert('funciono en el flux')
                    }

                } catch (error) {
                    console.log("Error de registro", error)
                }
            },

            login: async (payload) => {

                try {
                    const resp = await fetch(process.env.BACKEND_URL + "api/login", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                    });

                    if (!resp.ok) {
                        const errorData = await resp.json();
                        throw new Error(errorData.message || 'Error al iniciar sesión');
                    }

                    const data = await resp.json();
                    const token = data.token;

                    if (!token) {
                        throw new Error('No se recibió un token válido');
                    }

                    const decodedToken = jwtDecode(token);
                    const userRole = decodedToken.role;

                    localStorage.setItem('token', token);
                    localStorage.setItem('userRole', userRole);
                    localStorage.setItem('id', data.id);

                    const store = getStore();
                    setStore({
                        ...store,
                        user: {
                            ...store.user,
                            isAuthenticated: true,
                            token: token,
                            role: userRole,
                        },
                    });

                    if (userRole === 'admin') {
                        alert('Bienvenido, Admin.'); // Alert para admin
                    } else {
                        alert('Bienvenido, Usuario.'); // Alert para user
                    }


                    return data;
                } catch (error) {
                    console.error("Error al iniciar sesión:", error);
                    alert(error.message || 'Error al iniciar sesión');
                    return null;
                }
            },

            getSupportedCurrencies: async () => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "api/currency");
                    if (!response.ok) {
                        throw new Error('No se pudo obtener la lista de monedas.');
                    }
                    const data = await response.json();
                    setStore({ currencies: data.monedas_soportadas });
                } catch (error) {
                    setStore({ error: 'No se pudo obtener la lista de monedas.' });
                    console.error('Error al obtener monedas:', error);
                }
            },

            convertCurrency: async (fromCurrency, toCurrency, amount) => {
                if (!fromCurrency || !toCurrency || !amount) {
                    setStore({ error: 'Por favor, completa todos los campos.' });
                    return;
                }

                try {
                    const url = new URL(process.env.BACKEND_URL + "api/exchange");
                    url.searchParams.append('from', fromCurrency);
                    url.searchParams.append('to', toCurrency);
                    url.searchParams.append('amount', amount);

                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error('Error al realizar la conversión.');
                    }
                    const data = await response.json();
                    setStore({ convertedAmount: data.converted_amount, error: null });
                } catch (error) {
                    setStore({ error: 'Error al realizar la conversión.' });
                    console.error('Error al convertir divisas:', error);
                }
            },

            getMessage: async () => {
                try {

                    const resp = await fetch(process.env.BACKEND_URL + "api/hello")
                    const data = await resp.json()
                    setStore({ message: data.message })

                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
            },

            sendMessage: async (message) => {
                if (!message.trim()) return;

                const store = getStore();
                const newMessage = { user: "Usuario", text: message };
                setStore({ chatMessages: [...store.chatMessages, newMessage] });

                try {
                    const response = await fetch(process.env.BACKEND_URL + "api/chatbot", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ message })
                    });

                    const data = await response.json();
                    if (response.ok) {
                        setStore({ chatMessages: [...store.chatMessages, newMessage, { user: "Chatbot", text: data.response }] });
                    } else {
                        console.error("Error en el chatbot:", data.error);
                    }
                } catch (error) {
                    console.error("Error en la conexión con el servidor:", error);
                }

            },
            getWeather: async (latitude, longitude) => {
                const store = getStore();
                setStore({ loading: true, error: null });

                try {
                    const url = `${process.env.BACKEND_URL}api/weather?lat=${latitude}&lon=${longitude}`;
                    console.log("URL de la solicitud:", url);

                    const response = await fetch(url);

                    const responseText = await response.text();
                    console.log("Respuesta del backend:", responseText);

                    if (!response.ok) {
                        throw new Error('No se pudo obtener el clima.');
                    }

                    const data = JSON.parse(responseText);
                    setStore({ weather: data, loading: false });
                } catch (error) {
                    setStore({ error: 'Error al obtener el clima.', loading: false });
                    console.error(error);
                }
            },

            sendEmergencyCoordinates: async (userId, latitude, longitude) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "api/emergency", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ user_id: userId, latitude, longitude })
                    });

                    if (!resp.ok) {
                        throw new Error('Error al enviar las coordenadas de emergencia');
                    }

                    const data = await resp.json();
                    setStore({ message: data.mensaje, error: null });
                    alert(data.mensaje);
                } catch (error) {
                    setStore({ error: 'Hubo un error al enviar las coordenadas de emergencia.' });
                    console.error("Error al enviar las coordenadas de emergencia:", error);
                    alert("Hubo un error al enviar las coordenadas de emergencia.");
                }
            },

            fetchLocationsFromOpenAI: async (latitude, longitude, category) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/get_locations`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ latitude, longitude, category }),
                    });

                    const data = await response.json();
                    if (data.location) {
                        setStore({ selectedLocation: data.location });
                    }
                } catch (error) {
                    console.error("Error al obtener las ubicaciones desde OpenAI:", error);
                };
            },
            addContact: async (payload, user_id) => {
                let store = getStore();

                console.log("paquete de contacto", payload)

                try {
                    let response = await fetch(process.env.BACKEND_URL + "api/addcontact", {
                        method: "POST",
                        body: JSON.stringify(payload),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        throw new Error("No se pudo agregar el contacto");
                    }

                    let data = await response.json();

                    console.log("esta es la data que recibe de respuesta de addcontact", data)
                    setStore({ ...store, contact: { ...store.contact, ...data } });
                    let storeUpdated = getStore();
                    console.log("la concha", storeUpdated.contact)


                    let data = await response.json();
                    let store = getStore();
                    let updatedContacts = store.contact.map((contact) =>
                        contact.id === id ? data : contact
                    );
                    setStore({ ...store, contact: updatedContacts });
                } catch (error) {
                    console.error("Error en editContact:", error);
                }
            },
            deleteContact: async (id) => {
                try {
                    let response = await fetch(`${process.env.BACKEND_URL}api/deletecontact/${id}`, {
                        method: "DELETE",
                    });

                    if (!response.ok) {
                        throw new Error("No se pudo borrar el contacto");
                    }

                    let store = getStore();
                    let updatedContacts = store.contact.filter((contact) => contact.id !== id);
                    setStore({ ...store, contact: updatedContacts });
                } catch (error) {
                    console.error("Error en deleteContact:", error);
                }
            },
            logout: async () => {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        throw new Error('No hay sesión activa.');
                    }

                    const resp = await fetch(process.env.BACKEND_URL + "/api/logout", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!resp.ok) {
                        throw new Error('Error al cerrar sesión.');
                    }

                    localStorage.removeItem('token');
                    localStorage.removeItem('userRole');
                    localStorage.removeItem('id');

                    const store = getStore();
                    setStore({
                        ...store,
                        user: {
                            isAuthenticated: false,
                            token: null,
                            role: null,
                        },
                    });

                    return true;
                } catch (error) {
                    console.error('Error al cerrar sesión:', error);
                    alert(error.message || 'Error al cerrar sesión');
                    return false;
                }
            },
            // deleteContact: async (handleDelete) => {
            // 	console.log("paquete de borrado", handleDelete)
            // 	let store = getStore();
            // 	try {
            // 		let response = await fetch(`https://playground.4geeks.com/contact/agendas/rumacon/contacts/${handleDelete}`, { //Crear usuario
            // 			method: "DELETE",
            // 		})
            // 		if (!response.ok) {
            // 			throw new Error("NO BORRA")
            // 		}
            // 		let data = await response.json();
            // 		console.log(data)
            // 		setStore({ ...store, contact: [...store.contact, data] });
            // 		let storeUpdated = getStore();
            // 		console.log("la concha", storeUpdated.contact)


            // 	} catch (error) {
            // 		console.log(error);
            // 	}
            // },

            // editContact: async (payload, handleEdit) => {
            // 	console.log("paquete editado", handleEdit)
            // 	console.log("payload enviado", payload)
            // 	let store = getStore();
            // 	try {
            // 		let response = await fetch(`https://playground.4geeks.com/contact/agendas/rumacon/contacts/${payload}`, { //Crear usuario
            // 			method: "PUT",
            // 			body: JSON.stringify(handleEdit),
            // 			headers: {
            // 				"Content-Type": "application/json"
            // 			}
            // 		})
            // 		if (!response.ok) {
            // 			throw new Error("NO SE REALIZARON LOS CAMBIOS")
            // 		}
            // 		let data = await response.json();
            // 		console.log(data)
            // 		setStore({ ...store, contact: [...store.contact, data] });
            // 		let storeUpdated = getStore();
            // 		console.log("la concha", storeUpdated.contact)


            // 	} catch (error) {
            // 		console.log(error);
            // 	}
            // },
            viewContactos: async () => {
                let store = getStore();
                try {
                    let response = await fetch(process.env.BACKEND_URL + "api/contact"); // Asegúrate de que la URL es la correcta
                    if (!response.ok) {
                        throw new Error("Error al obtener contactos");
                    }
                    let data = await response.json();
                    console.log("Contactos obtenidos:", data);
            
                    setStore({
                        ...store,
                        contact: data.contacts || [] // Asegura que siempre sea un array
                    });
            
                } catch (error) {
                    console.error("Error en viewContactos:", error);
                }
            },
        },
    };
}
export default getState;
