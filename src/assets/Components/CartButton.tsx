import React, { useState } from 'react';
import Cart from './Cart';

const CartButton: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <>
      <button className={`cart-button ${cartOpen ? 'open' : 'closed'}`} onClick={toggleCart}>
        <img src="../src/assets/Cart.svg" />
        <span className="item-count">{}</span>
      </button>
      <Cart isOpen={cartOpen} onClose={toggleCart} />
    </>
  );
};

export default CartButton;