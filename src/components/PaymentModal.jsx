import React, { useState, useEffect } from 'react';
import { FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';

const PaymentModal = ({ isOpen, onClose, onCompletePurchase, total }) => {
  const [showCardForm, setShowCardForm] = useState(false);
  const [showCashForm, setShowCashForm] = useState(false);
  const [cashGiven, setCashGiven] = useState('');
  const [change, setChange] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setShowCardForm(false);
      setShowCashForm(false);
      setCashGiven('');
      setChange(0);
    }
  }, [isOpen]);

  const handlePaymentMethod = (method) => {
    if (method === 'card') {
      setShowCardForm(true);
    } else if (method === 'cash') {
      setShowCashForm(true);
    }
  };

  const handleCardPayment = () => {
    onCompletePurchase('card');
    onClose();
  };

  const handleCashPayment = () => {
    onCompletePurchase('cash');
    onClose();
  };

  const handleCalculateChange = () => {
    const cash = parseFloat(cashGiven);
    if (!isNaN(cash) && cash >= total) {
      setChange(cash - total);
    } else {
      setChange(0);
      alert('El monto ingresado no es suficiente para cubrir el total.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4">Elige el método de pago</h2>
        <p className="text-lg mb-4">Total: ${total.toFixed(2)}</p>
        {showCardForm ? (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                Número de Tarjeta
              </label>
              <input
                type="text"
                id="cardNumber"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="1234 5678 9123 4567"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
                Fecha de Expiración
              </label>
              <input
                type="text"
                id="expiryDate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="MM/AA"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvc">
                CVC
              </label>
              <input
                type="text"
                id="cvc"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="123"
              />
            </div>
            <button
              onClick={handleCardPayment}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Pagar
            </button>
          </div>
        ) : showCashForm ? (
          <div>
            <div className="mb-4 flex items-center">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cashGiven">
                  Monto Recibido
                </label>
                <input
                  type="text"
                  id="cashGiven"
                  value={cashGiven}
                  onChange={(e) => setCashGiven(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ingrese el monto recibido"
                />
              </div>
              <button
                onClick={handleCalculateChange}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded ml-4 mt-6"
              >
                Calcular
              </button>
            </div>
            {change > 0 && (
              <p className="text-lg mb-4">Cambio: ${change.toFixed(2)}</p>
            )}
            <button
              onClick={handleCashPayment}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Completar Compra
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <button
              onClick={() => handlePaymentMethod('cash')}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              <FaMoneyBillWave className="mr-2" /> En efectivo
            </button>
            <button
              onClick={() => handlePaymentMethod('card')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              <FaCreditCard className="mr-2" /> En tarjeta
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
