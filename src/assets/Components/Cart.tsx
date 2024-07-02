import React from 'react';
import './Cart.css';

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
  }

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
    return (
      <div className={`cart ${isOpen ? 'open' : ''}`}>
        <div className="cart-content">
          {<h2>Carrinho de <br /> compras</h2>}
          <button onClick={onClose}>X</button>
        </div>
      </div>
    );
  };

export default Cart