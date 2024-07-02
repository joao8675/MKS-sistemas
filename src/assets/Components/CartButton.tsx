import React from 'react';
import './Cart.css';

interface CartButtonProps {
  isCartOpen: boolean;
  toggleCart: () => void;
  itemCount: number;
}

const CartButton: React.FC<CartButtonProps> = ({ isCartOpen, toggleCart, itemCount }) => {
  return (
    <button className={`cart-button ${isCartOpen ? 'open' : 'closed'}`} onClick={toggleCart}>
      <img src="../src/assets/Cart.svg" alt="Cart" />
      <span className="item-count">{itemCount}</span>
    </button>
  );
};

export default CartButton;