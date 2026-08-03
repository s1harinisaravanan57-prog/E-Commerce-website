import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>Welcome to Baby Gift Store</h1>
          <p>Your Trusted Source for Premium Baby Gifts</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-item">
              <div className="about-icon">🎁</div>
              <h3>Premium Selection</h3>
              <p>Carefully curated baby gifts that are safe, beautiful, and thoughtfully designed for new arrivals and milestones.</p>
            </div>

            <div className="about-item">
              <div className="about-icon">✅</div>
              <h3>Quality Assured</h3>
              <p>Every product meets strict safety standards and quality requirements to ensure the best for your little ones.</p>
            </div>

            <div className="about-item">
              <div className="about-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Convenient shipping options to get your gifts to you quickly and safely, no matter the occasion.</p>
            </div>

            <div className="about-item">
              <div className="about-icon">❤️</div>
              <h3>Customer Care</h3>
              <p>Dedicated support team ready to help you find the perfect gift and answer any questions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="our-story">
        <div className="container">
          <h2>Our Story</h2>
          <p>Founded with the passion to celebrate life's precious moments, Baby Gift Store brings together a handpicked collection of gifts that parents, grandparents, and friends trust. From newborn essentials to milestone gifts, we believe every baby deserves something special.</p>
          <p>Our team is committed to providing not just products, but peace of mind – knowing that every gift purchased is safe, quality, and appropriate for the precious babies in your life.</p>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2>What Parents Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Beautiful gift collection! Found the perfect present for my newborn nephew."</p>
              <p className="author">- Sarah M.</p>
            </div>

            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Fast shipping and excellent quality. Highly recommended for baby gifts!"</p>
              <p className="author">- Jennifer T.</p>
            </div>

            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Great customer service and beautiful packaging. Perfect for baby showers!"</p>
              <p className="author">- Emily R.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
