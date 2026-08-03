import React, { useState } from 'react';
import '../styles/Contact.css';
import api from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/contact-messages', formData);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(true);
    } catch (requestError) { setError('Your message could not be sent. Please try again after starting the backend.'); }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you! Get in touch with any questions or gift recommendations.</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            
            <div className="info-item">
              <h3>📍 Address</h3>
              <p>Balannagar<br />pudukkottai<br />Tamilnadu</p>
            </div>

            <div className="info-item">
              <h3>📞 Phone</h3>
              <p><a href="tel:+91 8248571465">(91) 8248571465</a></p>
              <p className="hours">Monday - Friday: 9AM - 6PM EST</p>
            </div>

            <div className="info-item">
              <h3>✉️ Email</h3>
              <p><a href="mailto:s1harinisaravanan57@gmail.com">s1harinisaravanan57@gmail.com</a></p>
              <p className="response-time">We'll respond within 24 hours</p>
            </div>

            <div className="info-item">
              <h3>💬 Live Chat</h3>
              <p>Available during business hours for immediate assistance</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send us a Message</h2>
            
            {submitted && (
              <div className="success-message">
                ✅ Thank you! We've received your message and will get back to you soon.
              </div>
            )}
            {error && <div className="form-error">{error}</div>}

            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Do you offer gift wrapping?</h4>
              <p>Yes! Premium gift wrapping is available for most items at checkout.</p>
            </div>

            <div className="faq-item">
              <h4>What's your return policy?</h4>
              <p>30-day returns on unopened items. Contact us for details on opened or used items.</p>
            </div>

            <div className="faq-item">
              <h4>Can I schedule a delivery date?</h4>
              <p>Yes! Select your preferred delivery date during checkout. Additional fees may apply.</p>
            </div>

            <div className="faq-item">
              <h4>Do you ship internationally?</h4>
              <p>Currently, we ship within the US. International shipping coming soon!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
