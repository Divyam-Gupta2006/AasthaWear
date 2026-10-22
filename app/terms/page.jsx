import Link from 'next/link';
import { siteConfig } from '@/lib/siteConfig';

export const metadata = {
  title: 'Terms & Conditions',
  description: 'Operating guidelines, sacred commission terms, and ecclesiastical tailoring standards.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms & Conditions | आstha Sacred Clothiers',
    description: 'Operating guidelines, sacred commission terms, and ecclesiastical tailoring standards.',
    url: `${siteConfig.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="wrap page policy-root">
      <header>
        <span className="eyebrow">LEGAL & ETHICAL PROTOCOLS</span>
        <h1 className="serif big">Terms & Conditions</h1>
        <p className="muted lead">
          These terms govern your commissioning and purchase of ceremonial apparel and liturgical vestments from आstha Sacred Clothiers Pvt. Ltd.
        </p>
      </header>

      <div className="policy-content mt">
        <section className="policy-section">
          <h2 className="serif big2">1. The Nature of Sacred Commissions</h2>
          <p className="muted mt-xs">
            Every garment displayed on our portal represents handcrafted artisanal textiles—ranging from pit-loom woven Ahimsa mulberry silk to hand-embroidered liturgical damask. Minor natural slubs, subtle dye nuances, and artisanal irregularities in handloom weaves or herbal vegetable dyes are hallmarks of authentic traditional handcraft and are not considered manufacturing defects.
          </p>
        </section>

        <section className="policy-section mt-lg">
          <h2 className="serif big2">2. Pricing & Taxes</h2>
          <p className="muted mt-xs">
            All prices displayed across our platform are in Indian Rupees (INR) and are inclusive of Goods and Services Tax (GST). We reserve the right to amend pricing prior to order confirmation in the event of major raw material commodity adjustments.
          </p>
        </section>

        <section className="policy-section mt-lg">
          <h2 className="serif big2">3. Orders, Production & Dispatch</h2>
          <p className="muted mt-xs">
            Standard inventory items typically dispatch within 2–3 business days. For customized ecclesiastical vestments requiring specific ordination alterations, dispatch schedules will be confirmed upon review by our tailoring master.
          </p>
        </section>

        <section className="policy-section mt-lg">
          <h2 className="serif big2">4. Governing Law & Jurisdiction</h2>
          <p className="muted mt-xs">
            These terms are governed by and construed in accordance with the laws of the Republic of India. Any disputes arising in connection with orders shall be subject to the exclusive jurisdiction of the competent courts in Varanasi, Uttar Pradesh.
          </p>
        </section>
      </div>
    </div>
  );
}
