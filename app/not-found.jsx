import Link from 'next/link';
import { ArrowRight, Search, Store } from 'lucide-react';
import { Logo } from '@/components/Header';

export const metadata = {
  title: 'Page Not Found — आstha Sacred Clothiers',
  description: 'The requested ceremonial page or vestment could not be located in our archive.'
};

export default function NotFound() {
  return (
    <div className="wrap page not-found-root center-t">
      <div className="not-found-card">
        <span className="eyebrow">CANONICAL ARCHIVE • 404</span>
        <h1 className="serif big">This Vestment or Page Does Not Exist</h1>
        <p className="lead muted" style={{ margin: '14px auto', maxWidth: '540px' }}>
          The link you followed may have been updated, relocated, or is no longer part of our active sacred catalogue.
        </p>

        <div className="row g12 mt" style={{ justifyContent: 'center' }}>
          <Link href="/shop" className="btn">
            <Store size={18} />
            <span>EXPLORE ALL VESTMENTS</span>
          </Link>
          <Link href="/search" className="btn ghost">
            <Search size={18} />
            <span>SEARCH THE ARCHIVE</span>
          </Link>
        </div>

        <div className="not-found-suggestions mt-lg">
          <small className="caps muted">POPULAR CEREMONIAL COMMISSIONS</small>
          <div className="chips wrapchips mt-xs" style={{ justifyContent: 'center' }}>
            <Link href="/product/pitambari-dhoti-angavastram" className="sugg">
              Pitambari Ahimsa Silk Dhoti
            </Link>
            <Link href="/product/roman-clerical-wool-cassock" className="sugg">
              Roman Clerical Wool Cassock
            </Link>
            <Link href="/product/saffron-kasaya-meditation-robe" className="sugg">
              Saffron Kasaya Meditation Robe
            </Link>
            <Link href="/product/gothic-chasuble-golden-orphrey" className="sugg">
              Gothic Chasuble with Cross Orphrey
            </Link>
          </div>
        </div>

        <p className="sm muted mt-lg">
          Need assistance locating a specific diocesan vestment?{' '}
          <Link href="/contact" className="ul-s sm">
            Contact Atelier Concierge →
          </Link>
        </p>
      </div>
    </div>
  );
}

