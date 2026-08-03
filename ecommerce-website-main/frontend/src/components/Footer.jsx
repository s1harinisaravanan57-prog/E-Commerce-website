import React from 'react';
import '../styles/Footer.css';

const Footer = ({ onNavigate }) => <footer className="footer">
  <div className="footer-content">
    <div className="footer-brand"><p className="footer-logo">✦ little nest</p><p>Soft beginnings, thoughtfully gathered for the people you love most.</p></div>
    <div><h3>Explore</h3><button onClick={() => onNavigate('/')}>Home</button><button onClick={() => onNavigate('/products')}>Shop all</button><button onClick={() => onNavigate('/about')}>Our story</button></div>
    <div><h3>Need a hand?</h3><button onClick={() => onNavigate('/contact')}>Contact us</button><a href="#shipping">Shipping & returns</a><a href="#faq">Frequently asked questions</a></div>
    <div className="footer-newsletter"><h3>Notes from the nest</h3><p>New arrivals and small moments, sent with love.</p><form onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="Your email address" aria-label="Email address" /><button>Join →</button></form></div>
  </div>
  <div className="footer-bottom"><span>© {new Date().getFullYear()} Little Nest</span><span>Instagram &nbsp; Pinterest</span></div>
</footer>;

export default Footer;
