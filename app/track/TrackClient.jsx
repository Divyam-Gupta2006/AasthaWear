'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { inr } from '@/lib/data';

function TrackContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('orderId') || '';

  const [orderQuery, setOrderQuery] = useState(initialId);
  const [searched, setSearched] = useState(Boolean(initialId));
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    if (initialId) {
      handleLookup(initialId);
    }
  }, [initialId]);

  const handleLookup = (idToLookup) => {
    const target = (idToLookup || orderQuery).trim().toUpperCase();
    if (!target) return;

    // Check localStorage first
    try {
      const orders = JSON.parse(localStorage.getItem('astha-orders') || '[]');
      const match = orders.find((o) => o.orderId.toUpperCase() === target);
      if (match) {
        setOrderInfo(match);
        setSearched(true);
        return;
      }
    } catch {}

    // Mock tracked consignment for preview
    setOrderInfo({
      orderId: target.startsWith('AST-') ? target : `AST-2026-${target}`,
      date: '20 October 2026',
      status: 'In Transit — Courier Partner BlueDart Air',
      trackingNumber: 'BLUEDART-IND-884920194',
      origin: 'Varanasi Central Atelier, Uttar Pradesh',
      destination: 'Parish & Client Address',
      estimatedDelivery: '25 October 2026',
      timeline: [
        {
          step: 'Commission Confirmed',
          desc: 'Order specifications and fabric authenticity registered.',
          date: '20 Oct, 09:30 AM',
          done: true
        },
        {
          step: 'Hand-Inspection & Steam Finishing',
          desc: 'Artisanal check for unblemished purity, pressing and folding.',
          date: '21 Oct, 03:15 PM',
          done: true
        },
        {
          step: 'Sealed in Protective Muslin Pouch',
          desc: 'Sealed inside moisture-resistant transit casing with tamper seal.',
          date: '22 Oct, 11:00 AM',
          done: true
        },
        {
          step: 'Dispatched via Air Express',
          desc: 'Departed Varanasi sorting hub en route to delivery station.',
          date: '22 Oct, 06:45 PM',
          done: true
        },
        {
          step: 'Out for Delivery',
          desc: 'Scheduled with dedicated courier executive.',
          date: 'Expected 25 Oct',
          done: false
        }
      ]
    });
    setSearched(true);
  };

  return (
    <div className="wrap page track-root">
      <header className="track-header">
        <span className="eyebrow">LOGISTICS & CONSIGNMENT</span>
        <h1 className="serif big">Track Your Sacred Order</h1>
        <p className="muted lead">
          Enter your Commission ID (e.g. AST-2026-849201) provided in your confirmation email or receipt.
        </p>
      </header>

      {/* Lookup Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLookup();
        }}
        className="track-form mt"
      >
        <div className="searchbar">
          <Search size={22} className="search-icon" aria-hidden="true" />
          <input
            type="text"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            placeholder="Enter Order ID (e.g. AST-2026-849201)..."
            aria-label="Order ID to track"
          />
          <button type="submit" className="btn sm">
            TRACK ORDER
          </button>
        </div>
      </form>

      {/* Track Result Display */}
      {searched && orderInfo && (
        <section className="track-results-card mt" aria-label="Tracking progress">
          <div className="between track-card-head">
            <div>
              <span className="eyebrow">CONSIGNMENT IDENTIFIER</span>
              <h2 className="serif big2">#{orderInfo.orderId}</h2>
              <p className="sm muted">Order Date: {orderInfo.date}</p>
            </div>
            <div className="text-right">
              <span className="tag-b green-tag">IN TRANSIT</span>
              <p className="sm muted mt-xs">
                Est. Delivery: <b>{orderInfo.estimatedDelivery || '3–5 Business Days'}</b>
              </p>
            </div>
          </div>

          <div className="track-transit-summary two mt">
            <div className="transit-meta-box">
              <span className="eyebrow">ORIGIN ATELIER</span>
              <p><b>{orderInfo.origin || 'Varanasi Master Weavers Atelier, UP'}</b></p>
            </div>
            <div className="transit-meta-box">
              <span className="eyebrow">AIRWAY BILL / CARRIER</span>
              <p><b>{orderInfo.trackingNumber || 'IND-SECURE-AIR-77491'} (Insured)</b></p>
            </div>
          </div>

          {/* Timeline */}
          <div className="track-timeline mt">
            <h3 className="serif big2 mb">Consignment Progression</h3>
            <div className="timeline-steps">
              {(orderInfo.timeline || [
                {
                  step: 'Commission Confirmed',
                  desc: 'Order specifications registered at atelier.',
                  date: 'Completed',
                  done: true
                },
                {
                  step: 'Hand Inspection & Sizing',
                  desc: 'Inspected for flawless textile purity.',
                  date: 'Completed',
                  done: true
                },
                {
                  step: 'Dispatched via Insured Express Courier',
                  desc: 'Handed to courier partner for transit.',
                  date: 'In Transit',
                  done: true
                },
                {
                  step: 'Out for Delivery to Client',
                  desc: 'Final doorstep delivery.',
                  date: 'Upcoming',
                  done: false
                }
              ]).map((st) => (
                <div key={st.step} className={`timeline-item ${st.done ? 'done' : 'pending'}`}>
                  <div className="timeline-marker">
                    {st.done ? <CheckCircle2 size={18} color="var(--gold)" aria-hidden="true" /> : <Clock size={16} aria-hidden="true" />}
                  </div>
                  <div className="timeline-content">
                    <div className="between">
                      <b className="timeline-title">{st.step}</b>
                      <span className="sm muted">{st.date}</span>
                    </div>
                    <p className="sm muted mt-xs">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="track-help-footer mt between">
            <span className="sm muted">
              Require delivery instructions for your monastery or cathedral gate?
            </span>
            <Link href="/contact" className="ul-s sm">
              Contact Dispatch Desk →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

export default function TrackClient() {
  return (
    <Suspense fallback={<div className="wrap page"><p className="muted">Loading tracking portal...</p></div>}>
      <TrackContent />
    </Suspense>
  );
}

