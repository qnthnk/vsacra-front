import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { MdCurrencyExchange } from "react-icons/md";
import { Context } from '../store/appContext'; // Ajusta la ruta según tu estructura

const CurrencyConverter = () => {
    const { store, actions } = useContext(Context);
    const [show, setShow] = useState(false); // Estado para controlar la visibilidad del modal
    const [amount, setAmount] = useState(1); // Cantidad a convertir
    const [fromCurrency, setFromCurrency] = useState('USD'); // Moneda de origen
    const [toCurrency, setToCurrency] = useState('JPY'); // Moneda de destino

    // Funciones para abrir y cerrar el modal
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);



    // Función para manejar la conversión
    const handleConvert = () => {
        actions.convertCurrency(fromCurrency, toCurrency, amount);
    };

    useEffect(() => {
        if (show) {
            actions.getSupportedCurrencies();
        }
    }, [show]);

    return (
        <>

            <Button variant="primary" onClick={handleShow} style={{ margin: '10px' }}>
                <MdCurrencyExchange />
            </Button>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Conversor de Divisas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {store.error && <p style={{ color: 'red' }}>{store.error}</p>}
                    <div>
                        <label>Cantidad:</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="0"
                            style={{ margin: '10px', padding: '5px', width: '100%' }}
                        />
                    </div>
                    <div>
                        <label>De:</label>
                        <select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            style={{ margin: '10px', padding: '5px', width: '100%' }}
                        >
                            {store.currencies.map(currency => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>A:</label>
                        <select
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            style={{ margin: '10px', padding: '5px', width: '100%' }}
                        >
                            {store.currencies.map(currency => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>
                    </div>
                    {store.convertedAmount !== null && (
                        <div style={{ marginTop: '20px' }}>
                            <h2>Resultado:</h2>
                            <p>{amount} {fromCurrency} = {store.convertedAmount} {toCurrency}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleConvert}>
                        Convertir
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CurrencyConverter;