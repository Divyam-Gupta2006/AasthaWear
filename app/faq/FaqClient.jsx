'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MessageCircle, ArrowRight } from 'lucide-react';
import { faqs } from '@/lib/data';

const fullFaqs = [
  ...faqs,
  {
    category: 'Ordering & Custom Sizing',
    q: 'How do I choose the correct chest size for a Roman Clerical Cassock?',
    a: 'Measure over a shirt around the fullest part of your chest, keeping the tape horizontal. Our sizes (38R, 40R, 42R, etc.) correspond to actual chest circumference in inches. Regular length (R) provides standard canonical floor clearance (approx. 2 inches above the shoe heel) for priests between 5 ft 8 in and 6 ft. For petite or tall tailoring, leave a note during checkout.'
  },
  {
    category: 'Fabrics & Ahimsa Purity',
    q: 'Is pure gold zari used on the Pitambari and Uttariya borders?',
    a: 'Our Pitambari and Kashi silk pieces feature tested electro-plated silver-gilt and metallic golden thread zari crafted on Varanasi pit-looms. It will retain its rich sacred luster for generations when preserved inside our complimentary muslin storage pouches.'
  },
  {
    category: 'Catholic Liturgy & Canon',
    q: 'Can our parish order custom chasuble colors for feast days?',
    a: 'Yes. Beyond ivory and gold damask, we craft Marian blue, Pentecost red, and solemn violet vestments with embroidered orphreys for diocesan and cathedral orders. Contact our atelier desk for church commissions.'
  },
  {
    category: 'Care & Maintenance',
    q: 'Can the Ayodhya Raw Khadi Set be machine washed?',
    a: 'Yes, handspun khadi cotton is naturally resilient. Use a gentle cold wash cycle with mild detergent. Khadi softens and gains a beautiful natural drape with every subsequent wash.'
  }
];

export default function FaqClient() {
  const [openIndex, setOpenIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Ordering & Custom Sizing', 'Fabrics & Ahimsa Purity', 'Catholic Liturgy & Canon', 'Shipping & Delivery', 'Returns & Exchanges'];

  const displayedFaqs = selectedCategory === 'All'
    ? fullFaqs
    : fullFaqs.filter((f) => f.category === selectedCategory);

  return (
    <div className="wrap page faq-root">
      <header className="faq-header">
        <span className="eyebrow">HELP & CLARIFICATIONS</span>
        <h1 className="serif big">Frequently Asked Questions</h1>
        <p className="muted lead">
          Everything you need to know regarding canonical design, non-violent silk, ecclesiastical measurements, and insured pan-India delivery.
        </p>
      </header>

      {/* Category Filter Chips */}
      <nav className="chips mt" role="tablist" aria-label="FAQ categories">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`chip ${selectedCategory === c ? 'on' : ''}`}
            onClick={() => setSelectedCategory(c)}
          >
            {c}
          </button>
        ))}
      </nav>

      {/* FAQ Accordion List */}
      <section className="faq-accordion-list mt" aria-label="Questions and answers">
        {displayedFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={faq.q} className={`faq-item ${isOpen ? 'open' : ''}`}>
              <button
                type="button"
                className="faq-question-btn"
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                aria-expanded={isOpen}
              >
                <div className="faq-q-text">
                  <span className="faq-category eyebrow">{faq.category}</span>
                  <h2 className="faq-title serif" style={{ fontSize: '18px' }}>{faq.q}</h2>
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
      </section>

      {/* Still Have Questions CTA */}
      <div className="box consultation-box mt-lg">
        <div className="boxrow">
          <span className="ic">
            <MessageCircle size={22} aria-hidden="true" />
          </span>
          <div>
            <h3 className="serif big2">Have a Specific Rite or Liturgical Inquiry?</h3>
            <p className="muted sm mt-xs">
              If your question is not addressed here, our atelier tailoring team in Varanasi and ecclesiastical consultants are happy to assist.
            </p>
            <Link href="/contact" className="btn sm mt">
              <span>SPEAK WITH OUR CONCIERGE</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

