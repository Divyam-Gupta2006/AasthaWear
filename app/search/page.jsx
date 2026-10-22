import { siteConfig } from '@/lib/siteConfig';
import SearchClient from './SearchClient';

export const metadata = {
  title: 'Search Sacred Vestments Archive',
  description: 'Search our archive of traditional Indian ceremonial wear, Catholic clerical attire, Buddhist monastic robes, and liturgical accessories.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchPage() {
  return <SearchClient />;
}
