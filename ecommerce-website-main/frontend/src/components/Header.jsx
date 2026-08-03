import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ cartCount, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const goTo = (path) => { setShowMobileMenu(false); navigate(path); };
  const submitSearch = (event) => { event.preventDefault(); onSearch(searchQuery); goTo('/products'); };

  return (
    <header className="header">
      <div className="announcement">Free shipping on orders over $75 <span>•</span> Thoughtful essentials for little ones</div>
      <div className="header-shell">
        <button className="brand" onClick={() => goTo('/')} aria-label="Little Nest home">
          <span className="brand-mark">✦</span><span>little nest</span>
        </button>
        <nav className="nav-menu" aria-label="Main navigation">
          <button onClick={() => goTo('/')}>Home</button>
          <button onClick={() => goTo('/products')}>Shop</button>
          <button onClick={() => goTo('/about')}>Our story</button>
          <button onClick={() => goTo('/contact')}>Contact</button>
        </nav>
        <div className="header-actions">
          <form onSubmit={submitSearch} className="search-bar">
            <input type="search" aria-label="Search products" placeholder="Search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
            <button type="submit" aria-label="Search">⌕</button>
          </form>
          <button className="icon-button" onClick={() => goTo('/cart')} aria-label="Shopping bag">Bag <span className="cart-badge">{cartCount}</span></button>
          <button className="icon-button" onClick={() => goTo('/login')} aria-label="Login">Login</button>
        </div>
        <button className="mobile-menu-toggle" aria-label="Toggle menu" onClick={() => setShowMobileMenu(!showMobileMenu)}>☰</button>
      </div>
      {showMobileMenu && <nav className="mobile-menu" aria-label="Mobile navigation">
        <button onClick={() => goTo('/')}>Home</button><button onClick={() => goTo('/products')}>Shop</button><button onClick={() => goTo('/about')}>Our story</button><button onClick={() => goTo('/contact')}>Contact</button>
      </nav>}
    </header>
  );
};

export default Header;
