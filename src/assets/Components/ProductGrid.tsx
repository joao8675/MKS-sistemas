import React, { useState, useEffect } from 'react';
import { Product, ProductsResponse } from '../types'; // Certifique-se de ajustar o caminho de importação conforme necessário
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
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
            <button>
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.737212" fill-rule="evenodd" clip-rule="evenodd" d="M3 1L1 3.7V13.15C1 13.8956 1.59695 14.5 2.33333 14.5H11.6667C12.403 14.5 13 13.8956 13 13.15V3.7L11 1H3Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path opacity="0.737212" d="M1 4.375H13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path opacity="0.737212" d="M10 7C10 8.24264 8.82475 9.25 7.375 9.25C5.92525 9.25 4.75 8.24264 4.75 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Comprar</button>
          </div>
        </div>
      ))}
      <button onClick={loadMoreProducts} disabled={loading}>
        {loading ? 'Carregando...' : 'Carregar mais produtos'}
      </button>
    </div>
  );
};

export default ProductDetail;