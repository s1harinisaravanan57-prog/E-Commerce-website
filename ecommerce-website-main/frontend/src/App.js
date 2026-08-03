import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import api from './services/api';
import './App.css';

const fallbackProductIdMap = {
  mobile: 1,
  'knit-suit': 2,
  teddy: 3,
  romper: 4,
  muslin: 5,
  socks: 6,
  blankets: 7,
  bonnet: 8
};

function App(){
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleCheckout = async (customer) => {
    const token = localStorage.getItem('token');
    if (!token) {
      // behave like previous flow: let Cart show inline message
      throw { response: { data: { message: 'Please login to place orders' } } };
    }
    const response = await api.post('/orders', {
      ...customer,
      items: cart.map((item) => ({
        productId: Number(item.id) || fallbackProductIdMap[item.id],
        quantity: item.quantity
      }))
    });
    setCart([]);
    return response.data;
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Header 
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          onSearch={setSearchQuery}
          onNavigate={(path) => window.location.href = path}
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<><Hero /><ProductList searchQuery={searchQuery} onClearSearch={() => setSearchQuery('')} /></>} />
            <Route path="/products" element={<ProductList searchQuery={searchQuery} onClearSearch={() => setSearchQuery('')} />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} onRemove={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} onCheckout={handleCheckout} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer onNavigate={(path) => window.location.href = path} />
      </div>
    </BrowserRouter>
  );
}
export default App;
