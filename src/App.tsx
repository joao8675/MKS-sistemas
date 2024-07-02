import { useState } from 'react';
import './App.css';
import CartButton from './assets/Components/CartButton';
import ProductsList from './assets/Components/ProductGrid';
import Cart from './assets/Components/Cart';
import { Product } from './assets/types'; // Certifique-se de ajustar o caminho de importação conforme necessário

function App() {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (productToAdd: Product) => {
    const existingItem = cart.find(item => item.product.id === productToAdd.id);

    if (existingItem) {
      setCart(prevCart =>
        prevCart.map(item =>
          item.product.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart(prevCart => [...prevCart, { product: productToAdd, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleCart = () => {
    setIsCartOpen(prevIsCartOpen => !prevIsCartOpen);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price || 0) * item.quantity, 0);
  };

  return (
    <>
      <nav>
        <div className='navLogo'>
          <h2>mks</h2>
          <span>Sistemas</span>
        </div>
        <CartButton
          isCartOpen={isCartOpen}
          toggleCart={toggleCart}
          itemCount={getTotalItems()}
        />
      </nav>
      <main>
        <ProductsList addToCart={addToCart} />
      </main>
      <Cart isOpen={isCartOpen} onClose={toggleCart} items={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
      <div className="total-container">
        <p>Total a pagar: R${getTotalPrice().toFixed(2)}</p>
      </div>
    </>
  );
}

export default App;