import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { MdCurrencyExchange } from "react-icons/md";
import { Context } from '../store/appContext';

const CurrencyConverter = () => {
    const { store, actions } = useContext(Context);
    const [show, setShow] = useState(false);
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('JPY');

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

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
            <Button variant="primary" onClick={handleShow} className="m-2">
                <MdCurrencyExchange size={24} />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Conversor de Divisas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Mensaje de error */}
                    {store.error && <Alert variant="danger">{store.error}</Alert>}

                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Cantidad:</Form.Label>
                            <Form.Control
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                min="0"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>De:</Form.Label>
                            <Form.Select
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                            >
                                {store.currencies.map(currency => (
                                    <option key={currency} value={currency}>{currency}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>A:</Form.Label>
                            <Form.Select
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                            >
                                {store.currencies.map(currency => (
                                    <option key={currency} value={currency}>{currency}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>

                    {store.convertedAmount !== null && (
                        <div className="mt-4">
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