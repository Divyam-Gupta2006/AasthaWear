import Link from 'next/link';
import { RotateCcw, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

export const metadata = {
  title: 'Returns & Refunds Policy',
  description: '14-day considered return policy for unworn sacred vestments, and ceremonial sanctity guidelines.',
  alternates: {
    canonical: '/returns',
  },
  openGraph: {
    title: 'Returns & Refunds Policy | आstha',
    description: '14-day considered return policy for unworn sacred vestments, and ceremonial sanctity guidelines.',
    url: `${siteConfig.url}/returns`,
  },
};

export default function ReturnsPage() {
  return (
    <div className="wrap page policy-root">
      <header>
        <span className="eyebrow">CLIENT SERVICES</span>
        <h1 className="serif big">Returns, Refunds & Cancellation Policy</h1>
        <p className="muted lead">
          We respect that ceremonial vestments require exact fit and dignity. Our return policy is designed to honour both customer satisfaction and ritual sanctity.
        </p>
      </header>

      <div className="policy-content mt">
        <section className="policy-section">
          <h2 className="serif big2">1. 14-Day Considered Return Window</h2>
          <p className="muted mt-xs">
            Unworn, unaltered ceremonial garments may be returned or exchanged within <b>14 days</b> of delivery. To be eligible for a return:
          </p>
          <ul className="care-list mt-xs">
            <li className="sm muted">• The garment must remain unworn, unwashed, and unperfumed.</li>
            <li className="sm muted">• The original security tag and Silk Mark / pure wool identification seals must remain intact.</li>
            <li className="sm muted">• The piece must be returned with all original accessories (e.g. matching stoles, muslin storage bags, and spare buttons).</li>
          </ul>
        </section>

        <section className="policy-section mt-lg">
          <h2 className="serif big2">2. Sacred Sanctity & Non-Returnable Items</h2>
          <p className="muted mt-xs">
            In accordance with sacred ritual hygiene and liturgical traditions:
          </p>
          <ul className="care-list mt-xs">
            <li className="sm muted">• Garments that have been worn during consecrated worship, pujas, Eucharistic celebrations, or monastic retreats cannot be accepted for return.</li>
            <li className="sm muted">• Pieces tailored with custom ordination embroideries, personalized cassock hem lengths, or custom chest alterations are final sale, though we offer complimentary alteration assistance.</li>
          </ul>
        </section>

        <section className="policy-section mt-lg">
          <h2 className="serif big2">3. Return Process & Complimentary Pickup</h2>
          <p className="muted mt-xs">
            To initiate a return or exchange:
          </p>
          <ol className="inclusions-list mt-xs">
            <li className="sm muted">1. Email <b>returns@aastha-sacred.in</b> with your Order ID and reason for return.</li>
            <li className="sm muted">2. Our team will arrange a complimentary insured courier pickup from your location within 48 hours.</li>
            <li className="sm muted">3. Upon receipt and atelier inspection (usually 2 business days), a full refund will be processed to your original payment method (or UPI account) within 5–7 banking days.</li>
          </ol>
        </section>

        <section className="policy-section mt-lg">
          <h2 className="serif big2">4. Order Cancellations</h2>
          <p className="muted mt-xs">
            Standard catalogue orders may be cancelled free of charge within 24 hours of placement prior to dispatch. Once an item has been dispatched with an active courier tracking number, it must be received and returned under our standard 14-day policy.
          </p>
        </section>

        <div className="box consultation-box mt-lg">
          <b className="sm">Need assistance with size exchange or hem adjustment?</b>
          <p className="sm muted">
            Instead of a return, our tailoring desk can assist with resizing your garment.
          </p>
          <Link href="/contact" className="ul-s sm mt-xs">
            Contact Alterations Concierge →
          </Link>
        </div>
      </div>
    </div>
  );
}
