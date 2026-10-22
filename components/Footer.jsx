'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';
import { Logo } from './Header';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    try {
      localStorage.setItem('astha-newsletter-subscribed', email);
    } catch {}
  };

  return (
    <footer className="footer-root">
      {/* Brand Value Pillars */}
      <div className="footer-pillars-wrap">
        <div className="wrap footer-pillars">
          <div className="pillar-item">
            <ShieldCheck size={26} className="pillar-icon" />
            <div>
              <b className="caps sm">AUTHENTIC ECCLESIASTICAL & VEDIC TEXTILES</b>
              <p className="muted sm">Pure Ahimsa mulberry silk, certified organic linen, and superfine tropical wool.</p>
            </div>
          </div>
          <div className="pillar-item">
            <Truck size={26} className="pillar-icon" />
            <div>
              <b className="caps sm">INSURED PAN-INDIA & GLOBAL DISPATCH</b>
              <p className="muted sm">Complimentary insured transit on domestic orders. Secure protective packaging.</p>
            </div>
          </div>
          <div className="pillar-item">
            <RefreshCw size={26} className="pillar-icon" />
            <div>
              <b className="caps sm">14-DAY CONSIDERED RETURNS</b>
              <p className="muted sm">Unworn ceremonial vestments eligible for return in accordance with sacred guidelines.</p>
            </div>
          </div>
          <div className="pillar-item">
            <Sparkles size={26} className="pillar-icon" />
            <div>
              <b className="caps sm">BESPOKE ATELIER CONSULTATION</b>
              <p className="muted sm">Expert assistance for ordination, monastery habit, and temple sanctum requirements.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap footer-main">
        {/* Brand Column & Newsletter */}
        <div className="footer-brand-col">
          <Logo className="logo-md" />
          <p className="muted footer-tagline">
            Faith that lives through you. Dedicated to the venerable preservation of sacred vestments, monastic habit, and ritual drapery crafted with uncompromised textile sanctity.
          </p>

          <div className="footer-newsletter">
            <span className="eyebrow">THE SACRED GAZETTE</span>
            <p className="sm muted">Receive liturgical season updates, weaver chronicles, and private collection releases.</p>
            {subscribed ? (
              <div className="newsletter-success">
                <CheckCircle2 size={18} color="var(--gold)" />
                <span className="sm">You are subscribed to the Gazette. Welcome.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address"
                  aria-label="Newsletter email"
                />
                <button type="submit" className="newsletter-submit" aria-label="Subscribe">
                  <span>SUBSCRIBE</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
            {error && <span className="newsletter-error">{error}</span>}
          </div>
        </div>

        {/* Links Grid */}
        <div className="footer-links-grid">
          {/* Column 1: Collections */}
          <div className="footer-col">
            <h4 className="footer-title">COLLECTIONS</h4>
            <ul className="footer-list">
              <li><Link href="/shop">Shop All Vestments</Link></li>
              <li><Link href="/shop?tradition=vedic">Indian Ceremonial & Vedic</Link></li>
              <li><Link href="/shop?tradition=priests">Catholic Clerical Cassocks</Link></li>
              <li><Link href="/shop?tradition=monks">Buddhist Monastic Robes</Link></li>
              <li><Link href="/shop?tradition=liturgical">Liturgical Chasubles & Stoles</Link></li>
              <li><Link href="/shop?material=Silk">Pure Ahimsa Silk</Link></li>
              <li><Link href="/shop?material=Pure+Wool">Tropical Wool Collection</Link></li>
            </ul>
          </div>

          {/* Column 2: Client Services */}
          <div className="footer-col">
            <h4 className="footer-title">SERVICES</h4>
            <ul className="footer-list">
              <li><Link href="/track">Track Your Order</Link></li>
              <li><Link href="/size-guide">Size & Measurement Guide</Link></li>
              <li><Link href="/care-guide">Vestment Care & Preservation</Link></li>
              <li><Link href="/shipping">Shipping & Insured Delivery</Link></li>
              <li><Link href="/returns">Returns & Exchange Policy</Link></li>
              <li><Link href="/faq">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* Column 3: The Atelier */}
          <div className="footer-col">
            <h4 className="footer-title">THE ATELIER</h4>
            <ul className="footer-list">
              <li><Link href="/about">Our Story & Craft Heritage</Link></li>
              <li><Link href="/contact">Contact Atelier Concierge</Link></li>
              <li><Link href="/account">Customer Account</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-wrap">
        <div className="wrap footer-bottom">
          <p className="footer-copy muted sm">
            © {new Date().getFullYear()} आstha Sacred Clothiers Pvt. Ltd. All rights reserved. Crafted for sacred reverence.
          </p>
          <div className="footer-badges">
            <span className="pay-badge">VISA</span>
            <span className="pay-badge">Mastercard</span>
            <span className="pay-badge">RuPay</span>
            <span className="pay-badge">UPI</span>
            <span className="pay-badge">Net Banking</span>
            <span className="pay-badge">256-bit SSL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

