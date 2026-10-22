import { siteConfig } from '@/lib/siteConfig';
import FaqClient from './FaqClient';

export const metadata = {
  title: 'Frequently Asked Questions — Canonical Sizing & Fabrics',
  description: 'Detailed guidance on Ahimsa peace silk purity, Roman clerical cassock measurements, custom ordination tailoring, and insured pan-India delivery.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions — Canonical Sizing & Fabrics | आstha',
    description: 'Detailed guidance on Ahimsa peace silk purity, Roman clerical cassock measurements, custom ordination tailoring, and insured pan-India delivery.',
    url: `${siteConfig.url}/faq`,
    images: [{ url: `${siteConfig.url}/images/kasaya.jpg`, width: 1200, height: 630 }],
  },
};

export default function FaqPage() {
  return <FaqClient />;
}
