'use client';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import Photo from '@/components/Photo';
import { useWishlist, useCart } from '@/components/CartProvider';
import { products, inr } from '@/lib/data';

export default function WishlistClient() {
  const { wishlist, toggleWishlist, wishlistCount } = useWishlist();
  const { add } = useCart();

  const savedProducts = products.filter((p) => wishlist.includes(p.slug));

  const handleMoveToBag = (p) => {
    add(p.slug, p.defaultSize || p.sizes?.[0], p.color, 1);
  };

  return (
    <div className="wrap page wishlist-root">
      <header className="between end wishlist-header">
        <div>
          <span className="eyebrow">SAVED COMMISSIONS</span>
          <h1 className="serif big">Your Saved Wishlist</h1>
          <p className="muted">Ceremonial vestments saved for future consideration.</p>
        </div>
        <span className="muted sm caps">
          {wishlistCount} {wishlistCount === 1 ? 'PIECE' : 'PIECES'}
        </span>
      </header>

      {savedProducts.length > 0 ? (
        <section className="grid4 mt" aria-label="Wishlist items">
          {savedProducts.map((p) => (
            <div key={p.slug} className="card wishlist-card">
              <Link href={`/product/${p.slug}`}>
                <Photo src={p.img} tone={p.tone} className="card-img" alt={p.name}>
                  {p.badge && <span className="tag-b">{p.badge}</span>}
                  <button
                    type="button"
                    className="heart heart-active"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(p.slug);
                    }}
                    aria-label={`Remove ${p.name} from wishlist`}
                  >
                    <Heart size={18} fill="var(--gold)" color="var(--gold)" />
                  </button>
                </Photo>
              </Link>

              <div className="card-body">
                <small className="eyebrow">{p.cat}</small>
                <h2 className="serif" style={{ fontSize: '18px' }}>
                  <Link href={`/product/${p.slug}`}>{p.name}</Link>
                </h2>
                <p className="muted sm">{p.blurb}</p>
                <div className="between mt-xs">
                  <b>{inr(p.price)}</b>
                  <span className="muted sm">{p.stockStatus}</span>
                </div>

                <div className="row g8 mt">
                  <button
                    type="button"
                    className="btn full sm"
                    onClick={() => handleMoveToBag(p)}
                  >
                    + ADD TO BAG
                  </button>
                  <button
                    type="button"
                    className="icon-btn remove-wish-btn"
                    onClick={() => toggleWishlist(p.slug)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div className="empty-results-box">
          <Heart size={44} className="gold mb" aria-hidden="true" />
          <h2 className="serif big2">Your Wishlist is Empty</h2>
          <p className="muted max-w-sm">
            You have not saved any vestments yet. Browse our collections and click the heart icon on any piece to save it here.
          </p>
          <Link href="/shop" className="btn mt">
            <span>EXPLORE CATALOGUE</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}

