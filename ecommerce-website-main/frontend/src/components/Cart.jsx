import React, { useState } from 'react';

export default function Cart({ cart, onRemove, onUpdateQuantity, onCheckout }) {
  const [customer, setCustomer] = useState({ customerName: '', email: '', shippingAddress: '' });
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const updateField = (event) => setCustomer((current) => ({ ...current, [event.target.name]: event.target.value }));
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');

  const checkout = async (event) => {
    event.preventDefault(); setError('');
    // if not logged in, redirect to login and show inline message there
    const currentToken = localStorage.getItem('token');
    if (!currentToken) {
      localStorage.setItem('authMessage', 'login to placeorder');
      window.location.href = '/login';
      return;
    }
    setSubmitting(true);
    try {
      setOrder(await onCheckout(customer));
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || 'Checkout could not be completed. Please make sure the backend is running.');
    } finally { setSubmitting(false); }
  };

  if (order) return <section className="cart-page container"><div className="checkout-success"><p className="eyebrow">Order confirmed</p><h1>Thank you for your order.</h1><p>Order #{order.id} has been placed. We’ll send confirmation details to your email shortly.</p></div></section>;
  return <section className="cart-page container">
    <h1>Your bag</h1>
    {cart.length === 0 ? <p className="empty-state">Your bag is empty. Add something you love from the collection.</p> : <div className="checkout-layout">
      <div className="cart-list">{cart.map((item) => <article className="cart-item" key={item.id}><img src={item.imageUrl} alt={item.name} /><div className="cart-item-info"><h2>{item.name}</h2><p>${Number(item.price).toFixed(2)}</p></div><div className="quantity-control"><button aria-label={`Decrease ${item.name} quantity`} onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>−</button><span>{item.quantity}</span><button aria-label={`Increase ${item.name} quantity`} onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button></div><button className="remove-button" onClick={() => onRemove(item.id)}>Remove</button></article>)}</div>
      <form className="checkout-form" onSubmit={checkout}><h2>Checkout</h2>
        {!username && <p className="form-error">You must be logged in to place an order. <button type="button" className="link-like" onClick={() => window.location.href = '/login'}>Login</button></p>}
        <label>Full name<input required name="customerName" value={customer.customerName} onChange={updateField} /></label>
        <label>Email address<input required type="email" name="email" value={customer.email} onChange={updateField} /></label>
        <label>Shipping address<textarea required name="shippingAddress" rows="3" value={customer.shippingAddress} onChange={updateField} /></label>
        <div className="cart-summary"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
        {error && <p className="form-error">{error}</p>}
        <button className="btn" disabled={submitting || !username}>{submitting ? 'Placing order…' : 'Place order'}</button>
      </form>
    </div>}
  </section>;
}
