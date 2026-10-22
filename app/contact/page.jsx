import { siteConfig } from '@/lib/siteConfig';
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Atelier & Bespoke Ecclesiastical Sizing',
  description: 'Consult with our Varanasi master weavers and clerical tailors for ordination vestments, temple ceremonies, custom measurements, and diocesan commissions.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Atelier & Bespoke Ecclesiastical Sizing | आstha',
    description: 'Direct inquiry desk for ordination vestments, temple ceremonies, and custom sacred drapery.',
    url: `${siteConfig.url}/contact`,
    images: [{ url: `${siteConfig.url}/images/father.png`, width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
