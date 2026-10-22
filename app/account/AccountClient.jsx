'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  Package,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import Photo from '@/components/Photo';
import { inr } from '@/lib/data';

export default function AccountClient() {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'profile' | 'addresses'
  const [orders, setOrders] = useState([]);
  const [userProfile, setUserProfile] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    title: 'Patron / Liturgical Coordinator'
  });

  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      type: 'Parish / Monastery Office',
      name: 'Rev. Fr. Thomas & Aarav Sharma',
      line1: 'St. Paul’s Cathedral Diocesan House, Cathedral Road',
      city: 'Varanasi',
      state: 'Uttar Pradesh',
      pincode: '221002',
      phone: '+91 98765 43210'
    }
  ]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('astha-orders') || '[]');
      if (saved && saved.length > 0) {
        setOrders(saved);
      } else {
        // Sample recent commission for guest context
        setOrders([
          {
            orderId: 'AST-2026-849201',
            date: '14 October 2026',
            status: 'Delivered — Sacred Care Confirmed',
            pricing: { total: 6499 },
            items: [
              {
                slug: 'pitambari-dhoti-angavastram',
                name: 'Pitambari Dhoti & Angavastram',
                size: 'One Size (4.1m + 2.2m)',
                color: 'Ritual saffron',
                qty: 1,
                img: '/images/pitambari.jpg',
                price: 6499
              }
            ]
          }
        ]);
      }
    } catch {}
  }, []);

  return (
    <div className="wrap page account-root">
      <header className="between end account-header">
        <div>
          <span className="eyebrow">CLIENT SERVICES</span>
          <h1 className="serif big">Customer Atelier Account</h1>
          <p className="muted">Manage your sacred vestment commissions, addresses, and specifications.</p>
        </div>
        <div className="account-user-badge">
          <div className="avatar">
            <User size={20} aria-hidden="true" />
          </div>
          <div>
            <b>{userProfile.name}</b>
            <span className="sm muted d-block">{userProfile.email}</span>
          </div>
        </div>
      </header>

      {/* Account Navigation Tabs */}
      <nav className="chips mt" role="tablist" aria-label="Account sections">
        <button
          type="button"
          className={`chip ${activeTab === 'orders' ? 'on' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <Package size={16} aria-hidden="true" />
          <span>Commission History ({orders.length})</span>
        </button>
        <button
          type="button"
          className={`chip ${activeTab === 'addresses' ? 'on' : ''}`}
          onClick={() => setActiveTab('addresses')}
        >
          <MapPin size={16} aria-hidden="true" />
          <span>Delivery Addresses ({savedAddresses.length})</span>
        </button>
        <button
          type="button"
          className={`chip ${activeTab === 'profile' ? 'on' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <User size={16} aria-hidden="true" />
          <span>Profile & Sizing Record</span>
        </button>
      </nav>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <section className="account-tab-panel mt" aria-label="Commission history">
          <h2 className="serif big2 mb">Your Commissions & Orders</h2>
          {orders.length > 0 ? (
            <div className="orders-stack">
              {orders.map((ord) => (
                <div key={ord.orderId} className="order-history-card">
                  <div className="between order-card-header">
                    <div>
                      <span className="eyebrow">COMMISSION #{ord.orderId}</span>
                      <p className="sm muted">Placed on {ord.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="tag-b">{ord.status}</span>
                      <b className="d-block mt-xs">{inr(ord.pricing?.total || 0)}</b>
                    </div>
                  </div>

                  <div className="order-card-items mt">
                    {ord.items?.map((it) => (
                      <div key={it.slug + it.size} className="line">
                        <Photo src={it.img} className="line-img sm-img" alt={it.name} />
                        <div className="grow">
                          <h3 className="serif">{it.name}</h3>
                          <p className="sm muted">
                            {it.color} • {it.size} • Qty {it.qty}
                          </p>
                          <b>{inr(it.price * it.qty)}</b>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="between order-card-footer mt">
                    <Link
                      href={`/track?orderId=${ord.orderId}`}
                      className="ul-s sm"
                    >
                      <span>Track Transit Timeline</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                    <Link href="/contact" className="sm muted">
                      Request Duplicate Invoice
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-results-box">
              <Package size={40} className="gold mb" aria-hidden="true" />
              <h3 className="serif big2">No Commissions Yet</h3>
              <p className="muted">You have not placed any orders under this session yet.</p>
              <Link href="/shop" className="btn mt">
                EXPLORE VESTMENTS
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Addresses Tab */}
      {activeTab === 'addresses' && (
        <section className="account-tab-panel mt" aria-label="Saved addresses">
          <div className="between mb">
            <h2 className="serif big2">Saved Delivery Locations</h2>
            <button
              type="button"
              className="btn sm"
              onClick={() => alert('New address will be saved during your next checkout.')}
            >
              + ADD NEW ADDRESS
            </button>
          </div>

          <div className="addresses-grid">
            {savedAddresses.map((addr) => (
              <div key={addr.id} className="address-card">
                <span className="eyebrow">{addr.type}</span>
                <h3 className="serif mt-xs">{addr.name}</h3>
                <p className="sm muted mt-xs">{addr.line1}</p>
                <p className="sm muted">
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <p className="sm muted">Phone: {addr.phone}</p>
                <span className="tag-b mt-xs">PRIMARY DEFAULT</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Profile & Sizing Tab */}
      {activeTab === 'profile' && (
        <section className="account-tab-panel mt" aria-label="Profile and sizing record">
          <h2 className="serif big2 mb">Profile & Sartorial Specifications</h2>
          <div className="profile-card">
            <div className="two">
              <div>
                <span className="eyebrow">NAME</span>
                <p><b>{userProfile.name}</b></p>
              </div>
              <div>
                <span className="eyebrow">EMAIL</span>
                <p><b>{userProfile.email}</b></p>
              </div>
            </div>
            <div className="two mt">
              <div>
                <span className="eyebrow">MOBILE CONTACT</span>
                <p><b>{userProfile.phone}</b></p>
              </div>
              <div>
                <span className="eyebrow">SARTORIAL ROLE</span>
                <p><b>{userProfile.title}</b></p>
              </div>
            </div>

            <hr className="my-md" />

            <span className="eyebrow">ECCLESIASTICAL / VEDIC SIZING RECORD</span>
            <p className="sm muted mt-xs">
              Saved measurements for swift re-ordering of Roman cassocks, albs, and tailored dhoti sets.
            </p>
            <div className="two mt-xs">
              <div className="spec-box-sm">
                <small className="muted caps">STANDARD CHEST SIZE</small>
                <p><b>40 Regular (40R)</b></p>
              </div>
              <div className="spec-box-sm">
                <small className="muted caps">DHOTI LENGTH PREFERENCE</small>
                <p><b>4.1 Metres (Standard Temple Wrap)</b></p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

