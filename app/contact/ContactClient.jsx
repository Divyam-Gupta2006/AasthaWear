'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export default function ContactClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tradition, setTradition] = useState('Indian Ceremonial (Vedic)');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name or clerical title.');
      return;
    }
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!message.trim() || message.length < 10) {
      setError('Please provide at least a short inquiry message.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <div className="wrap page contact-root">
      <header className="contact-header">
        <span className="eyebrow">CONCIERGE & ATELIER CONSULTATIONS</span>
        <h1 className="serif big">Speak with the Atelier</h1>
        <p className="muted lead">
          Whether you need ordination vestment sizing, temple ritual commissions, monastic habit guidance, or fabric swatches, our specialists are at your disposal.
        </p>
      </header>

      <div className="contact-grid mt">
        {/* Contact Form */}
        <section className="contact-form-box" aria-label="Atelier inquiry form">
          <h2 className="serif big2 mb">Direct Atelier Inquiry</h2>

          {submitted ? (
            <div className="contact-success-card">
              <CheckCircle2 size={44} color="var(--gold)" className="mb" aria-hidden="true" />
              <h3 className="serif big2">Inquiry Received with Reverence</h3>
              <p className="muted mt-xs">
                Thank you, <b>{name}</b>. An atelier consultant specializing in <b>{tradition}</b> has received your dispatch and will reply to <b>{email}</b> within 24 business hours.
              </p>
              <button
                type="button"
                className="btn mt"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setPhone('');
                  setMessage('');
                }}
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="co-form">
              {error && (
                <div className="promo-feedback error sm">
                  <AlertCircle size={16} aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              <div className="two">
                <label className="field">
                  <span className="sm">Full Name / Clerical Title *</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Fr. Thomas SJ or Acharya Sharma"
                    aria-required="true"
                  />
                </label>

                <label className="field">
                  <span className="sm">Email Address *</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.in"
                    aria-required="true"
                  />
                </label>
              </div>

              <div className="two mt-xs">
                <label className="field">
                  <span className="sm">Phone / WhatsApp (Optional)</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </label>

                <label className="field">
                  <span className="sm">Tradition of Interest</span>
                  <select
                    value={tradition}
                    onChange={(e) => setTradition(e.target.value)}
                    className="state-select"
                    aria-label="Tradition of interest"
                  >
                    <option value="Indian Ceremonial (Vedic)">Indian Ceremonial (Vedic / Pandit)</option>
                    <option value="Catholic Clerical (Cassocks & Albs)">Catholic Clerical (Cassocks & Albs)</option>
                    <option value="Liturgical Vestments (Chasubles & Stoles)">Liturgical Vestments (Chasubles & Stoles)</option>
                    <option value="Buddhist Monastic (Kasaya Robes)">Buddhist Monastic (Kasaya Robes)</option>
                    <option value="Other Custom Sacred Commission">Other Custom Sacred Commission</option>
                  </select>
                </label>
              </div>

              <label className="field mt-xs">
                <span className="sm">Your Sacred Commission or Question *</span>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please specify chest measurements, ritual dates, fabric preferences, or parish delivery requirements..."
                  className="contact-textarea"
                  aria-required="true"
                />
              </label>

              <button type="submit" className="btn full between mt">
                <span>SUBMIT DISPATCH TO ATELIER</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </form>
          )}
        </section>

        {/* Contact Info Sidebar */}
        <aside className="contact-sidebar" aria-label="Atelier contact information">
          <div className="contact-info-card">
            <h2 className="serif big2 mb">Atelier Desks</h2>

            <div className="contact-row">
              <Mail size={18} className="gold" aria-hidden="true" />
              <div>
                <b className="sm">Direct Correspondence</b>
                <p className="sm muted">atelier@aastha-sacred.in</p>
                <p className="sm muted">ecclesiastical@aastha-sacred.in</p>
              </div>
            </div>

            <div className="contact-row mt">
              <Phone size={18} className="gold" aria-hidden="true" />
              <div>
                <b className="sm">Telephone & WhatsApp</b>
                <p className="sm muted">+91 542 250 8921 (Varanasi Guild)</p>
                <p className="sm muted">+91 98765 43210 (Mobile Concierge)</p>
              </div>
            </div>

            <div className="contact-row mt">
              <Clock size={18} className="gold" aria-hidden="true" />
              <div>
                <b className="sm">Atelier Working Hours</b>
                <p className="sm muted">Monday – Saturday: 09:30 – 18:30 IST</p>
                <p className="sm muted">Sunday & Sacred Feasts: Quiet Observance</p>
              </div>
            </div>

            <div className="contact-row mt">
              <MapPin size={18} className="gold" aria-hidden="true" />
              <div>
                <b className="sm">Atelier & Weaving Presence</b>
                <p className="sm muted">
                  <b>Kashi Weavers Guild:</b> Assi Ghat Road, Shivala, Varanasi, UP - 221005
                </p>
                <p className="sm muted mt-xs">
                  <b>Ecclesiastical Sartoria:</b> St. Joseph Diocesan Center, Bengaluru, KA
                </p>
              </div>
            </div>
          </div>

          <div className="box mt">
            <b className="sm">Planning an Ordination or Monastery Commission?</b>
            <p className="sm muted">
              We recommend submitting orders at least 15 days in advance of ordination dates or temple consecrations to allow ample time for custom alterations and sacred inspection.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

