'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  ChevronDown,
  Check,
  BookOpen,
  Scissors,
  Truck
} from 'lucide-react';
import Photo from '@/components/Photo';
import { Logo } from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { products, inr, faqs } from '@/lib/data';

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  // The 4 required products in exact order specified in prompt
  const bestProducts = [
    products.find((p) => p.slug === 'pitambari-dhoti-angavastram') || products[0],
    products.find((p) => p.slug === 'roman-clerical-wool-cassock') || products[1],
    products.find((p) => p.slug === 'saffron-kasaya-meditation-robe') || products[2],
    products.find((p) => p.slug.startsWith('gothic-chasuble')) || products[3]
  ];

  const featuredCollections = [
    {
      title: 'Indian Ceremonial Wear',
      subtitle: 'Vedic Rituals & Yajnas',
      description: 'Mulberry Ahimsa silk Pitambari dhotis, matching angavastrams, and handspun Ayodhya khadi.',
      img: '/images/pitambari.jpg',
      tone: '#d98a1b',
      href: '/shop?tradition=vedic',
      tag: 'VEDIC CANON'
    },
    {
      title: 'Catholic Clerical Wear',
      subtitle: 'Priestly & Formal Duties',
      description: 'Pure tropical wool Roman cassocks with 33 cloth buttons, rabat collars, and precise draping.',
      img: '/images/cassock.jpg',
      tone: '#1a1a1a',
      href: '/shop?tradition=priests',
      tag: 'ECCLESIASTICAL SARTORIAL'
    },
    {
      title: 'Buddhist Monastic Apparel',
      subtitle: 'Civara & Meditation Robes',
      description: 'Canonical 7-strip paddy patchwork Kasaya robes dyed with natural saffron-ochre herbal pigments.',
      img: '/images/kasaya.jpg',
      tone: '#b9792b',
      href: '/shop?tradition=monks',
      tag: 'VINAYA PRECEPT'
    },
    {
      title: 'Liturgical Vestments',
      subtitle: 'Holy Mass & High Feasts',
      description: 'Ivory damask Gothic chasubles with metallic cross orphreys and reversible dual-season stoles.',
      img: '/images/chasuble.jpg',
      tone: '#e3d8bd',
      href: '/shop?tradition=liturgical',
      tag: 'CATHEDRAL SACRED'
    }
  ];

  return (
    <div className="home-container">
      {/* A. Hero Section */}
      <section className="hero" aria-label="Welcome hero banner">
        <div className="hero-text-overlay">
          <span className="eyebrow" style={{ color: 'var(--brown)', letterSpacing: '0.2em' }}>
            SACRED ATELIER • AUTUMN/WINTER SACRED EDITION
          </span>
          <p className="tagline">
            FAITH<br />
            THAT LIVES<br />
            <u>THROUGH YOU</u>
          </p>
        </div>

        <h1 className="hero-heading">
          <span className="sr-only">आstha — Traditional Ceremonial Clothing & Sacred Vestments</span>
          <span className="mega" aria-hidden="true">
            <Logo />
          </span>
        </h1>

        <div className="hero-img">
          <img
            src="/images/hero-model.png"
            alt="Sacred ceremonial vestment modeled at आstha atelier"
            fetchPriority="high"
            loading="eager"
            className="hero-model-img"
          />
        </div>

        <div className="hero-cta">
          <Link href="/shop" className="btn">
            <span>SHOP NOW</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/shop?tradition=vedic" className="ul">
            EXPLORE SACRED COLLECTIONS
          </Link>
        </div>

        <Link href="/about" className="ul essence">
          THE ESSENCE OF FAITH
        </Link>
      </section>

      {/* B. Featured Collections Grid */}
      <section className="featured-collections-section" aria-labelledby="heading-collections">
        <div className="wrap">
          <div className="section-head between">
            <div>
              <span className="eyebrow">CURATED TRADITIONS</span>
              <h2 id="heading-collections" className="serif big2">Ceremonial Orders & Collections</h2>
            </div>
            <Link href="/shop" className="ul-s">
              Browse Catalogue <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="collections-grid">
            {featuredCollections.map((col) => (
              <Link href={col.href} key={col.title} className="collection-card">
                <Photo src={col.img} tone={col.tone} className="collection-img" alt={col.title}>
                  <span className="tag-b">{col.tag}</span>
                </Photo>
                <div className="collection-body">
                  <small className="eyebrow">{col.subtitle}</small>
                  <h3 className="serif">{col.title}</h3>
                  <p className="muted sm">{col.description}</p>
                  <span className="ul-s sm mt">
                    Explore Pieces <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* C. Best of आstha */}
      <section className="wrap best" aria-labelledby="heading-best">
        <div className="between end">
          <div>
            <span className="eyebrow">REVERED SIGNATURES</span>
            <h2 id="heading-best" className="h-sans">
              BEST OF <Logo />
            </h2>
          </div>
          <Link href="/shop" className="ul-s">
            VIEW ALL VESTMENTS <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid4">
          {bestProducts.map((p) => (
            <ProductCard key={p.slug} p={p} showAdd />
          ))}
        </div>
      </section>

      {/* D. Brand and Craftsmanship Section */}
      <section className="craftsmanship-section" aria-labelledby="heading-manifesto">
        <div className="wrap craft-container">
          <div className="craft-text">
            <span className="eyebrow">THE ATELIER MANIFESTO</span>
            <h2 id="heading-manifesto" className="serif big2">Textile Sanctity for Sacred Rites</h2>
            <p className="muted lead">
              Vestments are not mere apparel; they are vessels of sanctity and quiet humility. Every piece at आstha is created with deep reverence for canonical tradition and the dignity of the person conducting worship.
            </p>

            <div className="craft-pillars">
              <div className="craft-pillar">
                <Scissors size={20} className="craft-pillar-icon" aria-hidden="true" />
                <div>
                  <h3 className="serif" style={{ fontSize: '18px' }}>Canonical Geometry & Draping</h3>
                  <p className="sm muted">
                    From the 7-strip Vinaya layout of Buddhist Kasaya robes to the 33 buttons of the Roman clerical cassock, every measurement honours sacred precedent.
                  </p>
                </div>
              </div>

              <div className="craft-pillar">
                <Award size={20} className="craft-pillar-icon" aria-hidden="true" />
                <div>
                  <h3 className="serif" style={{ fontSize: '18px' }}>Cruelty-Free & Natural Fibres</h3>
                  <p className="sm muted">
                    We source Ahimsa peace silk harvested post-emergence, handspun indigenous desi cotton, pure organic linen, and natural worsted tropical wool.
                  </p>
                </div>
              </div>

              <div className="craft-pillar">
                <BookOpen size={20} className="craft-pillar-icon" aria-hidden="true" />
                <div>
                  <h3 className="serif" style={{ fontSize: '18px' }}>Artisanal Guild Continuity</h3>
                  <p className="sm muted">
                    Supporting master pit-loom weavers in Varanasi and ecclesiastical tailors dedicated to liturgical embroidery and precision canvas construction.
                  </p>
                </div>
              </div>
            </div>

            <div className="row g12 mt">
              <Link href="/about" className="btn">
                <span>READ OUR STORY</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link href="/care-guide" className="btn ghost">
                CARE GUIDE
              </Link>
            </div>
          </div>

          <div className="craft-images-layout">
            <div className="craft-main-img">
              <Photo
                src="/images/new-collection.png"
                tone="#332922"
                className="craft-feature-photo"
                alt="Sacred textile craftsmanship in Varanasi atelier"
              >
                <div className="craft-badge-overlay">
                  <span className="caps sm">HERITAGE WEAVES</span>
                  <small className="muted">Preserving Sacred Traditions</small>
                </div>
              </Photo>
            </div>
            <div className="craft-detail-thumbnails">
              <Photo
                src="/images/pitambari-detail-1.jpg"
                tone="#c49033"
                className="craft-thumb"
                alt="Pure zari border detail on Ahimsa mulberry silk"
              />
              <Photo
                src="/images/cassock-detail-1.jpg"
                tone="#1f1f1f"
                className="craft-thumb"
                alt="33 cloth covered buttons detail on clerical cassock"
              />
            </div>
          </div>
        </div>
      </section>

      {/* E. Curated Spotlight Banner */}
      <section className="newcol" aria-labelledby="heading-spotlight">
        <div className="newcol-text">
          <span className="eyebrow" style={{ color: 'var(--brown)' }}>
            LITURGICAL & CEREMONIAL FOCUS
          </span>
          <h2 id="heading-spotlight">
            TIMELESS<br />
            TRADITION
          </h2>
          <p>
            Whether preparing for sacramental ordination, Buddhist retreat practice, or sacred temple yajna, our atelier delivers garments cut with precision, comfort, and uncompromising purity.
          </p>
          <div className="row g12">
            <Link href="/shop" className="btn">
              Explore All 7 Pieces
            </Link>
            <Link href="/contact" className="ul">
              Request Custom Fitting
            </Link>
          </div>
        </div>
        <div
          className="newcol-img"
          style={{
            backgroundImage: 'url(/images/father.png)',
            backgroundPosition: 'center top',
            backgroundSize: 'cover',
            minHeight: '420px'
          }}
          role="img"
          aria-label="Roman Catholic priest wearing tailored clerical cassock"
        />
      </section>

      {/* F. FAQ Preview Section */}
      <section className="wrap faq-preview-section" aria-labelledby="heading-faq">
        <div className="section-head between">
          <div>
            <span className="eyebrow">COMMON INQUIRIES</span>
            <h2 id="heading-faq" className="serif big2">Ceremonial Guidance & FAQ</h2>
          </div>
          <Link href="/faq" className="ul-s">
            View All Questions <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="faq-accordion-list">
          {faqs.slice(0, 4).map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={faq.q} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <div className="faq-q-text">
                    <span className="faq-category eyebrow">{faq.category}</span>
                    <h3 className="faq-title serif" style={{ fontSize: '18px' }}>{faq.q}</h3>
                  </div>
                  <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p className="muted">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* G. Atelier Assurance Banner */}
      <section className="wrap assurance-banner-section" aria-label="Sankalpa Guarantee">
        <div className="dark-card">
          <small className="gold caps">SANKALPA GUARANTEE</small>
          <h2 className="serif">Need Ecclesiastical or Ritual Customization?</h2>
          <p>
            Our master tailors in Varanasi and ecclesiastical consultants can review your temple or diocesan requirements for exact length, collar height, or sleeve alterations prior to dispatch.
          </p>
          <div className="row g12 mt">
            <Link href="/contact" className="btn light">
              BOOK ATELIER CONSULTATION
            </Link>
            <Link href="/size-guide" className="ul" style={{ color: '#fff' }}>
              View Sizing Charts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
