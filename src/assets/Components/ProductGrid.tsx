import React, { useState, useEffect } from 'react';
import { Product, ProductsResponse } from '../types'; // Certifique-se de ajustar o caminho de importação conforme necessário
import './ProductGrid.css';
import './ProductDetail.css';

interface ProductsListProps {
  addToCart: (product: Product) => void;
}

const ProductsList: React.FC<ProductsListProps> = ({ addToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=8');
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
      }
      const data: ProductsResponse = await response.json();
      setProducts(data.products);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const loadMoreProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/products?limit=8&skip=${products.length}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar mais produtos');
      }
      const data: ProductsResponse = await response.json();
      setProducts(prevProducts => [...prevProducts, ...data.products]);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    // Aqui você pode adicionar lógica adicional, como exibir um alerta de sucesso, etc.
  };

  if (loading && products.length === 0) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="product-container">
      {products.map(product => (
        <div key={product.id} className="product-detail">
          <div className='productImg'>
            <img src={product.thumbnail} alt={product.title} />
          </div>
          <div className="namePrice">
            <h2>{product.title}</h2>
            <p>R${product.price}</p>
          </div>
          <div className='description'>
            <p>{product.description}</p>
          </div>
          <div className='buy'>
            <button onClick={() => handleAddToCart(product)}>
              Comprar
            </button>
          </div>
        </div>
      ))}
      <button onClick={loadMoreProducts} disabled={loading}>
        {loading ? 'Carregando...' : 'Carregar mais produtos'}
      </button>
    </div>
  );
};

export default ProductsList;