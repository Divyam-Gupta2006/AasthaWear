import Link from 'next/link';
import { Truck, ShieldCheck, Clock, MapPin, PackageCheck, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

export const metadata = {
  title: 'Shipping & Insured Delivery Policy',
  description: 'Pan-India complimentary insured delivery, dispatch windows, and protective sacred garment packaging.',
  alternates: {
    canonical: '/shipping',
  },
  openGraph: {
    title: 'Shipping & Insured Delivery Policy | आstha',
    description: 'Complimentary insured pan-India delivery on all sacred vestments and ceremonial robes.',
    url: `${siteConfig.url}/shipping`,
  },
};

export default function ShippingPage() {
  return (
    <div className="wrap page policy-root">
      <header>
        <span className="eyebrow">CLIENT SERVICES</span>
        <h1 className="serif big">Shipping & Insured Delivery Policy</h1>
        <p className="muted lead">
          Every sacred vestment is hand-inspected, steam-pressed, and encased in breathable cotton protectors before being dispatched via insured express courier.
        </p>
      </header>

      <div className="policy-content mt">
        <section className="policy-section">
          <h2 className="serif big2">1. Domestic Delivery Across India</h2>
          <p className="muted mt-xs">
            We offer <b>complimentary insured delivery</b> on all domestic orders across India. Whether your delivery address is an urban cathedral, a regional ashram, or a remote Buddhist monastery, our logistics partners (BlueDart, Delhivery, and India Post Speed Post) ensure secure handover.
          </p>
          <div className="timeline-steps mt">
            <div className="timeline-item done">
              <div className="timeline-marker"><Clock size={16} aria-hidden="true" /></div>
              <div className="timeline-content">
                <b>Atelier Preparation & Sizing</b>
                <p className="sm muted">2–3 business days for final inspection, pressing, and sleeve/hem adjustments.</p>
              </div>
            </div>
            <div className="timeline-item done">
              <div className="timeline-marker"><Truck size={16} aria-hidden="true" /></div>
              <div className="timeline-content">
                <b>Standard Transit Window</b>
                <p className="sm muted">5–7 business days to metro cities; 7–9 business days for northeastern states and hill territories.</p>
              </div>
            </div>
            <div className="timeline-item done">
              <div className="timeline-marker"><PackageCheck size={16} aria-hidden="true" /></div>
              <div className="timeline-content">
                <b>Atelier Express Priority Courier (₹450)</b>
                <p className="sm muted">Dispatched within 24 hours via air express, arriving in 2–3 business days.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="policy-section mt-lg">
          <h2 className="serif big2">2. Transit Insurance & Protective Packaging</h2>
          <p className="muted mt-xs">
            Every shipment dispatched by आstha is 100% insured against loss, transit damage, or weather exposure. In the rare event a parcel arrives with breached security seals or water ingress, take a photograph and notify us immediately at <b>atelier@aastha-sacred.in</b> for an immediate replacement commission.
          </p>
          <p className="muted mt-xs">
            Packaging includes complimentary breathable unbleached muslin garment covers, scented sandalwood protection, and sturdy multi-ply corrugated cartons.
          </p>
        </section>

        <section className="policy-section mt-lg">
          <h2 className="serif big2">3. International Diocesan & Monastic Shipping</h2>
          <p className="muted mt-xs">
            We routinely deliver ecclesiastical and Vedic commissions to clients in Europe, North America, Southeast Asia, and Australia via DHL Express. International duties, import VAT, and regional taxes are the responsibility of the consignee. Contact our atelier desk for international shipping estimates.
          </p>
        </section>

        <div className="box consultation-box mt-lg">
          <b className="sm">Need urgent delivery for an upcoming sacred ordination or puja?</b>
          <p className="sm muted">
            Contact our concierge desk directly at +91 98765 43210 or email us with your required delivery date.
          </p>
          <Link href="/contact" className="ul-s sm mt-xs">
            Request Expedited Commission →
          </Link>
        </div>
      </div>
    </div>
  );
}
