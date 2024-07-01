import { useState } from 'react'
import './App.css'
import CartButton from './assets/Components/CartButton';

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
    </>
  )
}

export default App
