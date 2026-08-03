import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import api from '../services/api';

const fallbackProducts = {
  mobile: { id: 'mobile', name: 'Cloudy Day Mobile', price: '48.00', description: 'A dreamy handmade nursery mobile.', imageUrl: '/pics/Screenshot 2026-08-01 115944.png' },
  'knit-suit': { id: 'knit-suit', name: 'Heirloom Knit Suit', price: '42.00', description: 'Soft knit comfort for every day.', imageUrl: '/pics/Screenshot 2026-08-01 115952.png' },
  teddy: { id: 'teddy', name: 'Cuddle Bear', price: '28.00', description: 'A forever friend made for tiny hands.', imageUrl: '/pics/Screenshot 2026-08-01 120010.png' },
  romper: { id: 'romper', name: 'Oatmeal Rib Romper', price: '32.00', description: 'Easy organic cotton essentials.', imageUrl: '/pics/Screenshot 2026-08-01 120021.png' },
  muslin: { id: 'muslin', name: 'Organic Muslin Swaddle', price: '24.00', description: 'Breathable softness for cuddles.', imageUrl: '/pics/Screenshot 2026-08-01 120047.png' },
  socks: { id: 'socks', name: 'Blush Ribbed Socks', price: '12.00', description: 'The sweetest finishing touch.', imageUrl: '/pics/Screenshot 2026-08-01 120103.png' },
  blankets: { id: 'blankets', name: 'Two-Piece Blanket Set', price: '36.00', description: 'Double the softness, beautifully wrapped.', imageUrl: '/pics/Screenshot 2026-08-01 120123.png' },
  bonnet: { id: 'bonnet', name: 'Sage Cotton Bonnet', price: '18.00', description: 'A timeless little layer.', imageUrl: '/pics/Screenshot 2026-08-01 120141.png' }
};

export default function ProductDetail({ onAddToCart }){
  const {id} = useParams();
  const [product,setProduct] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{ api.get(`/products/${id}`).then(r=>setProduct(r.data)).catch(()=>setProduct(fallbackProducts[id] || null)); },[id]);
  if(!product) return <div className="container product-detail">Loading...</div>;
  return (
    <div className="product-detail container">
      <button className="back-button" onClick={() => navigate(-1)}>Back to shop</button>
      <div className="product-detail-content">
        <img src={product.imageUrl || '/images/classic-leather-bag.svg'} alt={product.name} />
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p className="price">${product.price}</p>
          <p>{product.description}</p>
          <button className="btn" onClick={() => onAddToCart(product)}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
