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
            contact: {
                contactName: "ruben",
                contactEmail: "",
                contactPhone: "",
                contactRole: ""
            }
            

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
                        alert('funciono')
                    }

                } catch (error) {
                    console.log("Error de registro", error)
                }
            },

            login: async (payload) => {
                console.log("Datos cuando se hace clic en inicio de sesión:", payload);
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

                    localStorage.setItem('token', token);

                    const store = getStore();
                    setStore({
                        ...store,
                        user: {
                            ...store.user,
                            isAuthenticated: true,
                            token: token,
                        },
                    });

                    alert('Inicio de sesión exitoso'); // Opcional: mostrar un mensaje de éxito
                    return true; // Indicar que el inicio de sesión fue exitoso

                } catch (error) {
                    console.error("Error al iniciar sesión:", error);
                    alert(error.message || 'Error al iniciar sesión'); // Mostrar el mensaje de error
                    return false; // Indicar que el inicio de sesión falló
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

                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
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
            sendEmergencyCoordinates: async (userId) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/enviar-coordenadas", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ user_id: userId })
                    });

                    if (!resp.ok) {
                        throw new Error('Error al enviar las coordenadas de emergencia');
                    }

                    const data = await resp.json();
                    setStore({ message: data.mensaje, error: null });
                    alert(data.mensaje); // Mostrar mensaje de éxito
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
            addContact: async (payload) => {
				let store = getStore();
                console.log("paquete de contacto", payload)
				try {
					let response = await fetch(process.env.BACKEND_URL + "api/addcontact", {
						method: "POST",
						body: JSON.stringify(payload),
						headers: {
							"Content-Type": "application/json"
						}
					})
					if (!response.ok) {
						throw new Error("No agrego el contacto")
					}
					let data = await response.json();
					console.log("esta es la data que recibe de respuesta de addcontact",data)
					setStore({ ...store, contact: [...store.contact, data] });
					let storeUpdated = getStore();
					console.log("la concha", storeUpdated.contact)

				} catch (error) {
					console.log(error);
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
					let response = await fetch(process.env.BACKEND_URL + "api/addcontact", {
					})
					if (!response.ok) {
						throw new Error("Se quebro alv")
					}
					let data = await response.json();
					console.log("dobletea", data)
					setStore(
						{ ...store, contact: data.contacts }
					);

				} catch (error) {
					console.log(error);
				}
			},
        },
    };
}
export default getState;
