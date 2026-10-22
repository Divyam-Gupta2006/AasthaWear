import { siteConfig } from '@/lib/siteConfig';
import ShopClient from './ShopClient';

export const metadata = {
  title: 'Shop Sacred Vestments & Ceremonial Apparel',
  description: 'Browse the complete collection of hand-loomed Ahimsa silk Pitambari dhotis, Roman clerical worsted wool cassocks, Buddhist saffron Kasaya robes, and liturgical chasubles.',
  alternates: {
    canonical: '/shop',
  },
  openGraph: {
    title: 'Shop Sacred Vestments & Ceremonial Apparel | आstha',
    description: 'Browse the complete collection of hand-loomed Ahimsa silk Pitambari dhotis, Roman clerical worsted wool cassocks, Buddhist saffron Kasaya robes, and liturgical chasubles.',
    url: `${siteConfig.url}/shop`,
    images: [
      {
        url: `${siteConfig.url}/images/new-collection.png`,
        width: 1200,
        height: 630,
        alt: 'आstha Sacred Vestments Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop Sacred Vestments & Ceremonial Apparel | आstha',
    description: 'Browse our complete collection of ceremonial garments.',
    images: [`${siteConfig.url}/images/new-collection.png`],
  },
};

export default function ShopPage() {
  return <ShopClient />;
}
