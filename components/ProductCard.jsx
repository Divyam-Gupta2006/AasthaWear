'use client';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import Photo from './Photo';
import { inr } from '@/lib/data';
import { useWishlist, useCart } from './CartProvider';

export default function ProductCard({ p, showAdd = false }) {
  const { isSaved, toggleWishlist } = useWishlist();
  const { add } = useCart();
  const saved = isSaved(p.slug);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(p.slug);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    add(p.slug, p.defaultSize || p.sizes?.[0], p.color, 1);
  };

  return (
    <Link href={`/product/${p.slug}`} className="card" aria-label={`View ${p.name}`}>
      <Photo src={p.img} tone={p.tone} className="card-img" alt={p.name}>
        {p.badge && <span className="tag-b">{p.badge}</span>}
        <button
          type="button"
          className={`heart ${saved ? 'heart-active' : ''}`}
          onClick={handleWishlist}
          aria-label={saved ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
        >
          <Heart size={18} fill={saved ? 'var(--gold)' : 'none'} color={saved ? 'var(--gold)' : '#000'} />
        </button>
        {showAdd && (
          <button type="button" className="add-btn" onClick={handleQuickAdd} aria-label={`Add ${p.name} to bag`}>
            + QUICK ADD TO BAG
          </button>
        )}
      </Photo>
      <div className="card-body">
        <small className="eyebrow">{p.cat}</small>
        <h3 className="serif">{p.name}</h3>
        <p className="muted">{p.blurb}</p>
        <div className="between">
          <b>{inr(p.price)}</b>
          <span className="muted sm">{p.note || 'Complimentary Shipping'}</span>
        </div>
      </div>
    </Link>
  );
}
