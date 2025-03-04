const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            currencies: [],
            convertedAmount: null,
            error: null,
            weather: null,
            loading: false,
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
                console.log("datos cuando se hace clic en registro", payload)
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "api/login", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    })
                    if (!resp.ok) {
                        throw new Error('valio v...')
                    } else {
                        alert('funciono')
                    }

                } catch (error) {
                    console.log("Error al iniciar sesión:", error)
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
        },
    };
}
export default getState;
