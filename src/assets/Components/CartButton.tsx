import React, { useState } from 'react';
import Cart from './Cart';
import './CartButton.css';

const CartButton: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <>
      <button className={`cart-button ${cartOpen ? 'open' : 'closed'}`} onClick={toggleCart}>
        Carrinho
      </button>
      <Cart isOpen={cartOpen} onClose={toggleCart} />
    </>
  );
};

export default CartButton;