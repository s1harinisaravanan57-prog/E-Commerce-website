import React from 'react';

export default function Hero() {
  return (
    <section className="hero" aria-label="Little Nest introduction">
      <img src="/pics/Screenshot 2026-08-01 121921.png" alt="Dreamy nursery with a handmade mobile" />
      <div className="hero-card">
        <p className="eyebrow">For your smallest days</p>
        <h1>Gentle First<br />Moments</h1>
        <span className="hero-star">☁</span>
        <p>Discover a curated world of organic cotton layers and hand-crafted treasures for your little one.</p>
        <a href="#products" className="hero-button">Shop the collection <span>→</span></a>
      </div>
    </section>
  );
}
