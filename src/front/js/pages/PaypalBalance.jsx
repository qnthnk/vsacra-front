import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import "../../styles/PaypalBalance.css"


const PaypalBalance = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  const handleDonate = (e) => {
    e.preventDefault();

    const isValid = (
      cardNumber.replace(/\s/g, '').length === 16 &&
      cardName.trim() !== '' &&
      cardExpiry.length === 5 &&
      cardCVV.length === 3
    );

    if (isValid) {
      Swal.fire({
        title: '¡Gracias por tu donación!',
        text: 'Tu apoyo es muy valioso para nosotros.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => navigate('/login'));
    } else {
      Swal.fire({
        title: 'Error en el formulario',
        text: 'Por favor verifica que todos los campos estén correctamente completos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="paypal-page">
      <div className="paypal-container">
        <div className="paypal-card">
          <div className="cardNumber">•••• •••• •••• ••••</div>
          <div className="cardDetails">
            <div className="cardHolder">
              <div className="label">NOMBRE COMPLETO</div>
              <div id="card-holder-name">JUAN PEREZ</div>
            </div>
            <div className="cardExpiration">
              <div className="label">VENCIMIENTO</div>
              <div id="card-expiration-date">MM/AA</div>
            </div>
          </div>
          <div className="cvvStrip" />
          <div className="cvvNumber" id="card-cvv">123</div>
        </div>

        <form className="paypal-form" onSubmit={handleDonate}>
          <div>
            <label htmlFor="money">Cantidad en dólares</label>
            <select
              id="money"
              style={{
                width: "100%",
                textAlign: "center",
                fontWeight: 'bolder',
                height: "50px"
              }}
            >
              <option value="10">$10</option>
              <option value="20">$20</option>
              <option value="50">$50</option>
              <option value="100">$100</option>
            </select>
          </div>

          <div>
            <label htmlFor="card-number">Número de tarjeta</label>
            <input
              type="text"
              id="card-number"
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="card-name">Nombre completo</label>
            <input
              type="text"
              id="card-name"
              placeholder="John Doe"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="card-expiry">Fecha de vencimiento</label>
            <input
              type="text"
              id="card-expiry"
              placeholder="MM/YY"
              maxLength="5"
              value={cardExpiry}
              onChange={(e) => setCardExpiry(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="card-cvv">CVV</label>
            <input
              type="password"
              id="card-cvv"
              placeholder="123"
              maxLength="3"
              value={cardCVV}
              onChange={(e) => setCardCVV(e.target.value)}
            />
          </div>

          <button type="submit">Donar</button>
        </form>

        <button
          className='login-buttonesN2'
          style={{ width: "50%" }}
          onClick={() => navigate('/login')}
        >
          Regresar
        </button>
      </div>
    </div>
  );
};

export default PaypalBalance;
