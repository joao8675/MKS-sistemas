import React from 'react';
import { Product } from '../types';
import './Cart.css';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: { product: Product; quantity: number }[];
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, removeFromCart, updateQuantity }) => {
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price || 0) * item.quantity, 0);
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };

  const handleIncreaseQuantity = (productId: string) => {
    const item = items.find(item => item.product.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (productId: string) => {
    const item = items.find(item => item.product.id === productId);
    if (item && item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  return (
    <div className={`cart ${isOpen ? 'open' : ''}`}>
      <div className="cart-content">
        <h2>Carrinho de compras</h2>
        <button onClick={onClose}>X</button>
        <ul className="cart-items">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="cart-item">
              <div className="item-info">
                <img src={product.thumbnail} alt={product.title} />
                <div>
                  <p>{product.title}</p>
                  <p>R${product.price}</p>
                </div>
              </div>
              <div className="item-controls">
                <button onClick={() => handleDecreaseQuantity(product.id)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleIncreaseQuantity(product.id)}>+</button>
                <button onClick={() => handleRemove(product.id)}>Remover</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="cart-footer">
          <p>Total de itens: {getTotalItems()}</p>
          <p>Total a pagar: R${getTotalPrice().toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;