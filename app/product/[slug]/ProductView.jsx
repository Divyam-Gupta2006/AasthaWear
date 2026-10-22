'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Heart,
  Truck,
  RotateCcw,
  MessageCircle,
  Plus,
  Minus,
  ShieldCheck,
  Check,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Package,
  Sparkles,
  Info
} from 'lucide-react';
import Photo from '@/components/Photo';
import Guarantee from '@/components/Guarantee';
import ProductCard from '@/components/ProductCard';
import { useCart, useWishlist } from '@/components/CartProvider';
import { products, inr } from '@/lib/data';

export default function ProductView({ p }) {
  const router = useRouter();
  const { add } = useCart();
  const { isSaved, toggleWishlist } = useWishlist();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(p.defaultSize || p.sizes?.[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(p.color);
  const [qty, setQty] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'specs' | 'care' | 'shipping'
  const [addedNotice, setAddedNotice] = useState(false);

  const saved = isSaved(p.slug);
  const gallery = p.gallery && p.gallery.length > 0 ? p.gallery : [p.img];
  const activeImage = gallery[activeImgIndex] || p.img;

  const handleAddToCart = () => {
    add(p.slug, selectedSize, selectedColor, qty);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const handleBuyNow = () => {
    add(p.slug, selectedSize, selectedColor, qty);
    router.push('/checkout');
  };

  const nextImage = () => {
    setActiveImgIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setActiveImgIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  // Related products from catalogue excluding current
  const relatedProducts = products.filter((item) => item.slug !== p.slug).slice(0, 4);

  return (
    <div className="wrap page pdp-root">
      {/* Breadcrumb */}
      <nav className="pdp-breadcrumbs sm muted" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/shop">Shop</Link>
        <span>/</span>
        <Link href={`/shop?tradition=${p.tradition}`}>
          {p.tradition === 'vedic'
            ? 'Vedic & Indian'
            : p.tradition === 'monks'
            ? 'Monastic'
            : 'Clerical & Liturgical'}
        </Link>
        <span>/</span>
        <span className="current-crumb">{p.name}</span>
      </nav>

      <div className="pdp-grid">
        {/* Left: Interactive Media Gallery */}
        <div className="gallery-column">
          <div className="g-main-wrapper">
            <Photo
              src={activeImage}
              tone={p.tone}
              className="g-main"
              alt={`${p.name} - View ${activeImgIndex + 1}`}
              onClick={() => setLightboxOpen(true)}
            >
              {p.badge && <span className="tag-b">{p.badge}</span>}
              <button
                type="button"
                className={`heart ${saved ? 'heart-active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(p.slug);
                }}
                aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart
                  size={18}
                  fill={saved ? 'var(--gold)' : 'none'}
                  color={saved ? 'var(--gold)' : '#000'}
                />
              </button>
              <button
                type="button"
                className="zoom-hint-btn"
                onClick={() => setLightboxOpen(true)}
                aria-label="Enlarge image"
              >
                <ZoomIn size={16} />
                <span>Enlarge</span>
              </button>
              <span className="count">
                {activeImgIndex + 1} / {gallery.length}
              </span>
            </Photo>
          </div>

          {/* Thumbnails */}
          {gallery.length > 1 && (
            <div className="thumbs-row">
              {gallery.map((imgSrc, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`thumb ${idx === activeImgIndex ? 'on' : ''}`}
                  onClick={() => setActiveImgIndex(idx)}
                  aria-label={`Show photo ${idx + 1}`}
                >
                  <Photo src={imgSrc} tone={p.tone} className="fill" alt="" />
                </button>
              ))}
            </div>
          )}

          {/* Authentic Material Highlight Card */}
          <div className="craft-card-box">
            <span className="eyebrow">VERIFIED COMPOSITION</span>
            <h4 className="serif">{p.fabricMaterial}</h4>
            <p className="sm muted">{p.craftsmanship}</p>
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="info-column">
          <small className="eyebrow">{p.cat}</small>
          <div className="between start title-price-row">
            <h1 className="serif big2">{p.name}</h1>
            <div className="price-block">
              <b className="price">{inr(p.price)}</b>
              <span className="sm muted d-block">{p.note || 'Inclusive of GST'}</span>
            </div>
          </div>

          <p className="lead muted">{p.description}</p>

          <hr />

          {/* Color Selection if multiple exist */}
          {p.colorSwatches && p.colorSwatches.length > 0 && (
            <div className="pdp-field">
              <div className="between">
                <small className="caps">SHADE / FINISH:</small>
                <span className="sm muted">{selectedColor}</span>
              </div>
              <div className="swatches">
                {p.colorSwatches.map((swatch) => (
                  <button
                    key={swatch.name}
                    type="button"
                    className={`sw ${selectedColor === swatch.name ? 'on' : ''}`}
                    onClick={() => setSelectedColor(swatch.name)}
                    aria-label={`Select ${swatch.name}`}
                  >
                    <i style={{ background: swatch.hex }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div className="pdp-field">
            <div className="between">
              <small className="caps">SELECT SIZE / DIMENSIONS:</small>
              <Link href="/size-guide" className="ul-s sm">
                Size Guide
              </Link>
            </div>
            <div className="sizes-grid">
              {p.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`size-btn ${selectedSize === s ? 'on' : ''}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            {p.dimensions && <p className="sm muted mt-xs">{p.dimensions}</p>}
          </div>

          {/* Quantity Selector */}
          <div className="pdp-field">
            <small className="caps">QUANTITY:</small>
            <div className="qty-row">
              <div className="qty-control">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="qty-number">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="sm muted">
                Subtotal: <b>{inr(p.price * qty)}</b>
              </span>
            </div>
          </div>

          {/* Purchase Actions */}
          <div className="purchase-actions">
            <button
              type="button"
              className="btn full add-cart-btn"
              onClick={handleAddToCart}
            >
              {addedNotice ? (
                <>
                  <Check size={18} />
                  <span>ADDED TO BAG</span>
                </>
              ) : (
                <>
                  <span>ADD TO BAG</span>
                  <span>•</span>
                  <span>{inr(p.price * qty)}</span>
                </>
              )}
            </button>

            <button
              type="button"
              className="btn ghost full buy-now-btn"
              onClick={handleBuyNow}
            >
              <span>INSTANT CHECKOUT</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Stock & Delivery Promise */}
          <div className="stock-notice">
            <span className="stock-indicator" />
            <span className="sm">
              <b>{p.stockStatus}:</b> {p.dispatchTime}
            </span>
          </div>

          <div className="trust-strip">
            <span>
              <ShieldCheck size={16} /> Authentic Textile Sanctity
            </span>
            <span>
              <Truck size={16} /> Complimentary Insured Courier
            </span>
            <span>
              <RotateCcw size={16} /> 14-Day Considered Returns
            </span>
          </div>

          {/* Package Inclusions */}
          <div className="package-inclusions-box">
            <div className="row g8">
              <Package size={18} className="gold" />
              <b className="sm caps">WHAT IS INCLUDED IN THIS COMMISSION:</b>
            </div>
            <ul className="inclusions-list">
              {p.includes.map((inc, i) => (
                <li key={i} className="sm muted">
                  • {inc}
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Specification Tabs */}
          <div className="pdp-tabs-section">
            <div className="tabs-header">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Design & Appearance
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                onClick={() => setActiveTab('specs')}
              >
                Specifications
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'care' ? 'active' : ''}`}
                onClick={() => setActiveTab('care')}
              >
                Care & Keeping
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
                onClick={() => setActiveTab('shipping')}
              >
                Shipping & Returns
              </button>
            </div>

            <div className="tab-pane">
              {activeTab === 'details' && (
                <div className="tab-content">
                  <p className="muted">{p.designAppearance}</p>
                  <p className="muted mt">{p.craftsmanship}</p>
                </div>
              )}

              {activeTab === 'specs' && (
                <dl className="specs-list">
                  {p.specs.map(([k, v]) => (
                    <div key={k} className="spec-row">
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {activeTab === 'care' && (
                <ul className="care-list">
                  {p.careInstructions.map((inst, i) => (
                    <li key={i} className="sm muted">
                      • {inst}
                    </li>
                  ))}
                  <li className="mt-xs">
                    <Link href="/care-guide" className="ul-s sm">
                      Read Complete Textile Care Handbook →
                    </Link>
                  </li>
                </ul>
              )}

              {activeTab === 'shipping' && (
                <div className="tab-content">
                  <p className="muted sm">
                    <b>Pan-India Delivery:</b> Every vestment is packed inside protective dust bags and shipped via premium insured courier partners. Dispatch occurs within 2–3 business days.
                  </p>
                  <p className="muted sm mt">
                    <b>Returns:</b> Unworn garments with intact security tags may be returned within 14 days of delivery.
                  </p>
                  <p className="mt">
                    <Link href="/shipping" className="ul-s sm mr">
                      Shipping Details
                    </Link>
                    {' • '}
                    <Link href="/returns" className="ul-s sm">
                      Returns Policy
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Atelier Consultation Contact */}
          <div className="box consultation-box">
            <div className="boxrow">
              <span className="ic">
                <MessageCircle size={20} />
              </span>
              <div>
                <b className="sm">Need Exact Ecclesiastical Sizing?</b>
                <p className="muted sm">
                  Our master tailors in Varanasi & Rome hand-cut each garment to your prescribed temple ritual or parish ordination specifications.
                </p>
                <Link href="/contact" className="ul-s sm mt-xs">
                  Speak with an Atelier Specialist →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / High-Resolution Zoom Modal */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={() => setLightboxOpen(false)}>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close enlarged view"
            >
              <X size={24} />
            </button>

            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox-nav-btn prev"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  type="button"
                  className="lightbox-nav-btn next"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <div className="lightbox-img-wrapper">
              <img
                src={activeImage}
                alt={`${p.name} enlarged view`}
                className="lightbox-img"
              />
            </div>

            <div className="lightbox-caption">
              <b>{p.name}</b>
              <span>
                Image {activeImgIndex + 1} of {gallery.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Related Products Section */}
      <section className="complete-section">
        <div className="between">
          <div>
            <span className="eyebrow">CURATED COMPLEMENTS</span>
            <h2 className="serif big2">Complete the Sacred Observance</h2>
          </div>
          <Link href="/shop" className="ul-s sm">
            VIEW ALL VESTMENTS
          </Link>
        </div>

        <div className="grid4 mt">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.slug} p={rel} showAdd />
          ))}
        </div>
      </section>

      {/* Atelier Guarantee */}
      <div className="mt-lg">
        <Guarantee />
      </div>
    </div>
  );
}
