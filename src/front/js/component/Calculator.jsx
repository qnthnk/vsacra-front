import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { CiCalculator2 } from "react-icons/ci";

const Calculator = () => {
    const [showModal, setShowModal] = useState(false);
    const [input, setInput] = useState('');

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleButtonClick = (value) => {
        setInput((prevInput) => prevInput + value);
    };

    const calculateResult = () => {
        try {
            setInput(eval(input).toString());
        } catch (error) {
            setInput('Error');
        }
    };

    const clearInput = () => {
        setInput('');
    };

    return (
        <div>
            {/* Botón para abrir el modal */}
            <Button variant="primary" onClick={handleOpenModal} className="m-2">
                <CiCalculator2 size={24} /> {/* Ajusta el tamaño del ícono */}
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Calculadora</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        className="form-control mb-3"
                        value={input}
                        readOnly
                    />

                    <div className="buttons">
                        <div className="row mb-2">
                            <div className="col">
                                <Button variant="secondary" className="w-100" onClick={() => handleButtonClick('7')}>7</Button>
                            </div>
                            <div className="col">
                                <Button variant="secondary" className="w-100" onClick={() => handleButtonClick('8')}>8</Button>
                            </div>
                            <div className="col">
                                <Button variant="secondary" className="w-100" onClick={() => handleButtonClick('9')}>9</Button>
                            </div>
                            <div className="col">
                                <Button variant="warning" className="w-100" onClick={() => handleButtonClick('/')}>/</Button>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col">
                                <Button variant="secondary" className="w-100" onClick={() => handleButtonClick('4')}>4</Button>
                            </div>
                            <div className="col">
                                <Button variant="secondary" className="w-100" onClick={() => handleButtonClick('5')}>5</Button>
                            </div>
                            <div className="col">
                                <Button variant="secondary" className="w-100" onClick={() => handleButtonClick('6')}>6</Button>
                            </div>
                            <div className="col">
                                <Button variant="warning" className="w-100" onClick={() => handleButtonClick('*')}>*</Button>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col">
                                <Button variant="secondary" className="w-100" onClick={() => handleButtonClick('1')}>1</Button>
                            </div>
                            <div className="col">
                                <Button variant="secondary" className="w-100" onClick={() => handleButtonClick('2')}>2</Button>
                            </div>
                            <div className="col">
                                <Button variant="secondary" className="w-100" onClick={() => handleButtonClick('3')}>3</Button>
                            </div>
                            <div className="col">
                                <Button variant="warning" className="w-100" onClick={() => handleButtonClick('-')}>-</Button>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col">
                                <Button variant="secondary" className="w-100" onClick={() => handleButtonClick('0')}>0</Button>
                            </div>
                            <div className="col">
                                <Button variant="secondary" className="w-100" onClick={() => handleButtonClick('.')}>.</Button>
                            </div>
                            <div className="col">
                                <Button variant="success" className="w-100" onClick={calculateResult}>=</Button>
                            </div>
                            <div className="col">
                                <Button variant="warning" className="w-100" onClick={() => handleButtonClick('+')}>+</Button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Button variant="danger" className="w-100" onClick={clearInput}>C</Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Calculator;