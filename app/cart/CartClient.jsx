'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Minus,
  Plus,
  ArrowRight,
  Lock,
  MessageCircle,
  ShoppingBag,
  Trash2,
  Tag,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Photo from '@/components/Photo';
import Steps from '@/components/Steps';
import { useCart } from '@/components/CartProvider';
import { products, inr } from '@/lib/data';

export default function CartClient() {
  const {
    lines,
    count,
    subtotal,
    discount,
    promoCode,
    applyPromo,
    removePromo,
    shippingCost,
    total,
    change,
    remove
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const res = applyPromo(inputCode);
    setPromoMessage(res);
  };

  // Suggested pieces not currently in the bag
  const suggested = products.filter((p) => !lines.some((l) => l.slug === p.slug)).slice(0, 2);

  return (
    <div className="wrap page cart-page-root">
      <div className="cart-layout">
        {/* Main Cart Items Section */}
        <section className="cart-main">
          <span className="eyebrow">A CONSIDERED PURCHASE</span>
          <div className="between end cart-title-row">
            <h1 className="serif big">Your Shopping Bag</h1>
            <span className="muted">
              {count} {count === 1 ? 'item' : 'items'}
            </span>
          </div>
          <p className="muted">Ceremonial essentials, thoughtfully chosen for sacred rites.</p>

          <Steps at={0} />

          {lines.length > 0 ? (
            <div className="cart-lines-list">
              {lines.map((l, i) => (
                <div key={`${l.slug}-${l.size}-${l.color}`} className="line-item">
                  <Link href={`/product/${l.slug}`}>
                    <Photo src={l.p.img} tone={l.p.tone} className="line-img" alt={l.p.name} />
                  </Link>

                  <div className="line-info grow">
                    <div className="between start">
                      <div>
                        <small className="eyebrow">{l.p.cat}</small>
                        <h2 className="serif">
                          <Link href={`/product/${l.slug}`}>{l.p.name}</Link>
                        </h2>
                        <p className="sm muted">
                          {l.color} • {l.size}
                        </p>
                      </div>
                      <b className="line-price">{inr(l.p.price * l.qty)}</b>
                    </div>

                    <div className="between mt">
                      <div className="qty-control">
                        <button
                          type="button"
                          onClick={() => change(i, -1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={15} />
                        </button>
                        <span className="qty-number">{l.qty}</span>
                        <button
                          type="button"
                          onClick={() => change(i, 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="ul-s sm muted remove-line-btn"
                        onClick={() => remove(i)}
                      >
                        <Trash2 size={14} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-cart-state">
              <ShoppingBag size={48} className="gold mb" aria-hidden="true" />
              <h2 className="serif big2">Your Bag is Empty</h2>
              <p className="muted max-w-sm">
                No ceremonial vestments are currently in your shopping bag. Explore our collection of hand-loomed robes and ecclesiastical attire.
              </p>
              <Link href="/shop" className="btn mt">
                <span>EXPLORE THE COLLECTION</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          )}

          {lines.length > 0 && (
            <div className="continue-shopping-strip">
              <Link href="/shop" className="ul-s">
                ← Continue Browsing Vestments
              </Link>
            </div>
          )}
        </section>

        {/* Sidebar Summary Section */}
        {lines.length > 0 && (
          <aside className="summary-sidebar" aria-label="Order summary">
            <h2 className="serif big2">Order Summary</h2>

            {/* Voucher Code Form */}
            <form onSubmit={handleApplyPromo} className="promo-form">
              <div className="code-input-wrap">
                <Tag size={16} className="muted ml-sm" aria-hidden="true" />
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Voucher code (try ASTHA10)"
                  aria-label="Voucher or gift code"
                />
                <button type="submit" className="caps sm apply-code-btn">
                  APPLY
                </button>
              </div>
              {promoMessage && (
                <div
                  className={`promo-feedback ${
                    promoMessage.success ? 'success' : 'error'
                  } sm mt-xs`}
                >
                  {promoMessage.success ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <AlertCircle size={14} />
                  )}
                  <span>{promoMessage.message}</span>
                </div>
              )}
              {promoCode && (
                <div className="between active-promo-tag sm">
                  <span>
                    Applied Code: <b>{promoCode}</b>
                  </span>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="ul-s sm text-danger"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            <div className="summary-lines">
              <div className="between">
                <span>Subtotal ({count} items)</span>
                <span>{inr(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="between green">
                  <span>Privilege Concession ({promoCode})</span>
                  <span>- {inr(discount)}</span>
                </div>
              )}

              <div className="between">
                <span>Insured Pan-India Transit</span>
                <span className="green">Complimentary</span>
              </div>

              <hr />

              <div className="between summary-total-row">
                <b>Total to Pay</b>
                <b className="big2">{inr(total)}</b>
              </div>

              <p className="muted sm">
                Inclusive of all applicable GST • Standard insured dispatch on us
              </p>
            </div>

            <Link href="/checkout" className="btn full between proceed-btn">
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={18} />
            </Link>

            <p className="center-t muted sm mt-xs">
              <Lock size={14} /> 256-bit Encrypted Checkout • Free Insured Delivery
            </p>
          </aside>
        )}
      </div>

      {/* Suggested Pieces Section */}
      {suggested.length > 0 && (
        <section className="suggest-section" aria-label="Complementary pieces">
          <div className="between">
            <div>
              <span className="eyebrow">COMPLEMENTARY PIECES</span>
              <h2 className="serif big2">Suggested for Your Commission</h2>
            </div>
            <Link href="/shop" className="ul-s sm">
              VIEW CATALOGUE
            </Link>
          </div>

          <div className="grid4 g2 mt">
            {suggested.map((p) => (
              <div key={p.slug} className="sug-card">
                <Link href={`/product/${p.slug}`}>
                  <Photo src={p.img} tone={p.tone} className="sug-img" alt={p.name} />
                </Link>
                <div className="sug-body">
                  <small className="eyebrow">{p.cat}</small>
                  <h3 className="serif">
                    <Link href={`/product/${p.slug}`}>{p.name}</Link>
                  </h3>
                  <b>{inr(p.price)}</b>
                  <Link href={`/product/${p.slug}`} className="btn ghost full mt-xs">
                    VIEW DETAILS
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="atelier-support-card">
            <MessageCircle size={20} className="gold" aria-hidden="true" />
            <span>Need advice on custom ecclesiastical or Vedic sizing?</span>
            <Link href="/contact" className="ul-s sm">
              Speak with our Atelier Advisor →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

