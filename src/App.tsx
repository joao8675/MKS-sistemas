import { useState } from 'react'
import './App.css'
import CartButton from './assets/Components/CartButton';
import ProductsList from './assets/Components/ProductGrid';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav>
        <div className='navLogo'>
          <h2>mks</h2> 
          <span>Sistemas</span>
        </div>
        <CartButton />
      </nav>
      <main>
      <ProductsList />
      </main>
    </>
  )
}

export default App
