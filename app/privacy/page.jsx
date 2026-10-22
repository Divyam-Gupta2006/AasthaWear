import Link from 'next/link';
import { siteConfig } from '@/lib/siteConfig';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How आstha protects client data, liturgical confidentiality, and transaction privacy.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | आstha Sacred Clothiers',
    description: 'How आstha protects client data, liturgical confidentiality, and transaction privacy.',
    url: `${siteConfig.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="wrap page policy-root">
      <header>
        <span className="eyebrow">LEGAL & ETHICAL PROTOCOLS</span>
        <h1 className="serif big">Privacy Policy</h1>
        <p className="muted lead">
          At आstha, we hold your personal details, clerical affiliations, and measurement records in the highest regard of confidentiality and trust.
        </p>
      </header>

      <div className="policy-content mt">
        <section className="policy-section">
          <h2 className="serif big2">1. Information We Collect</h2>
          <p className="muted mt-xs">
            We collect information required exclusively to fulfill your sacred commissions:
          </p>
          <ul className="care-list mt-xs">
            <li className="sm muted">• <b>Contact Information:</b> Name, clerical designation, email address, and mobile phone number for courier tracking.</li>
            <li className="sm muted">• <b>Delivery Particulars:</b> Street address, institution/diocese/parish name, city, state, and PIN code.</li>
            <li className="sm muted">• <b>Sartorial Measurements:</b> Chest circumference, height, sleeve, and hem length specifications.</li>
            <li className="sm muted">• <b>Payment Security:</b> Payment transactions are processed directly by RBI-authorized payment gateways through 256-bit SSL encryption. We never store debit/credit card numbers or UPI MPINs on our servers.</li>
          </ul>
        </section>

        <section className="policy-section mt-lg">
          <h2 className="serif big2">2. How Your Data is Protected</h2>
          <p className="muted mt-xs">
            We will never sell, rent, monetize, or exchange your personal information with external marketing aggregators. Information is shared strictly with trusted logistics partners (e.g. BlueDart, Delhivery) solely to facilitate delivery.
          </p>
        </section>

        <section className="policy-section mt-lg">
          <h2 className="serif big2">3. Client Rights</h2>
          <p className="muted mt-xs">
            You may request an export of your saved sizing data, addresses, or order history, or request full account deletion at any time by contacting <b>privacy@aastha-sacred.in</b>.
          </p>
        </section>
      </div>
    </div>
  );
}
