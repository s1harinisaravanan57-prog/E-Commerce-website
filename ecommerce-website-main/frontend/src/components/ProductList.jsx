import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const image = (time) => `/pics/Screenshot 2026-08-01 ${time}.png`;
const curatedProducts = [
  { id: 'mobile', name: 'Cloudy Day Mobile', price: '48.00', tag: 'New Arrival', imageUrl: image('115944'), description: 'A dreamy handmade nursery mobile.' },
  { id: 'knit-suit', name: 'Heirloom Knit Suit', price: '42.00', tag: 'New Arrival', imageUrl: image('115952'), description: 'Soft knit comfort for every day.' },
  { id: 'teddy', name: 'Cuddle Bear', price: '28.00', tag: 'Best Seller', imageUrl: image('120010'), description: 'A forever friend made for tiny hands.' },
  { id: 'romper', name: 'Oatmeal Rib Romper', price: '32.00', tag: 'Sale', imageUrl: image('120021'), description: 'Easy organic cotton essentials.' },
  { id: 'muslin', name: 'Organic Muslin Swaddle', price: '24.00', imageUrl: image('120047'), description: 'Breathable softness for cuddles.' },
  { id: 'socks', name: 'Blush Ribbed Socks', price: '12.00', tag: 'Best Seller', imageUrl: image('120103'), description: 'The sweetest finishing touch.' },
  { id: 'blankets', name: 'Two-Piece Blanket Set', price: '36.00', tag: 'Sale', imageUrl: image('120123'), description: 'Double the softness, beautifully wrapped.' },
  { id: 'bonnet', name: 'Sage Cotton Bonnet', price: '18.00', imageUrl: image('120141'), description: 'A timeless little layer.' },
];

function ProductTile({ product }) {
  return <Link className="product-tile" to={`/product/${product.id}`}>
    <div className="product-image">{product.tag && <span>{product.tag}</span>}<img src={product.imageUrl} alt={product.name} /></div>
    <div className="product-copy"><h3>{product.name}</h3><p>${product.price}</p></div>
  </Link>;
}

export default function ProductList({ searchQuery = '', onClearSearch }) {
  const [products, setProducts] = useState([]);
  useEffect(() => { api.get('/products').then((res) => setProducts(res.data)).catch(() => setProducts([])); }, []);
  const source = products.length ? products : curatedProducts;
  const filtered = source.filter((product) => `${product.name} ${product.description || ''}`.toLowerCase().includes(searchQuery.toLowerCase()));

  return <>
    {!searchQuery && <section className="category-strip"><img src={image('115729')} alt="Baby care essentials" /><div><p className="eyebrow">Made for everyday magic</p><h2>Little things,<br />lovingly chosen.</h2><a href="#products">Explore all pieces <span>→</span></a></div></section>}
    {!searchQuery && <section className="values"><div><span>♧</span><h3>Mindfully made</h3><p>Gentle materials for growing families.</p></div><div><span>⌂</span><h3>Made to last</h3><p>Timeless pieces to treasure and pass on.</p></div><div><span>♡</span><h3>Wrapped with care</h3><p>Every order is packed with love.</p></div></section>}
    <section id="products" className="products-section">
      <div className="products-heading"><div><p className="eyebrow">The little nest edit</p><h2>{searchQuery ? 'Search results' : 'Curated for little ones'}</h2></div><div className="products-heading-action"><p className="product-count">{searchQuery ? `Results for “${searchQuery}”` : 'Thoughtful essentials for tiny humans.'}</p>{searchQuery && <Link to="/products" className="clear-search" onClick={onClearSearch}>← Back to all products</Link>}</div></div>
      <div className="product-grid">{filtered.map((product) => <ProductTile key={product.id} product={product} />)}</div>
      {!filtered.length && <p className="empty-state">No pieces match that search. Try another word.</p>}
    </section>
    {!searchQuery && <section className="story-banner"><img src={image('115858')} alt="Soft baby products and nursery details" /><div><p className="eyebrow">A softer start</p><h2>Everything they need.<br />Nothing they don’t.</h2><Link to="/about">Our story <span>→</span></Link></div></section>}
  </>;
}
