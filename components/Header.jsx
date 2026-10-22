'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Heart,
  Search,
  ShoppingBag,
  User,
  Home,
  Store,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Phone,
  BookOpen
} from 'lucide-react';
import { useCart, useWishlist } from './CartProvider';

export const Logo = ({ className = '' }) => (
  <span className={`logo ${className}`}>
    <span style={{ fontFamily: 'var(--f-deva)' }}>आ</span>stha
  </span>
);

export default function Header() {
  const path = usePathname();
  const router = useRouter();
  const { count } = useCart();
  const { wishlistCount } = useWishlist();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const announcements = [
    'COMPLIMENTARY INSURED PAN-INDIA DELIVERY ON ALL SACRED ORDERS',
    'BESPOKE ECCLESIASTICAL SIZING FOR CLERICAL & MONASTIC COMMISSIONS',
    'USE PRIVILEGE CODE "ASTHA10" FOR 10% OFF YOUR SACRED ORDER'
  ];

  // Rotate announcement bar every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
    setCollectionsOpen(false);
  }, [path]);

  const inner = path !== '/' && path !== '/shop' && path !== '/search';

  return (
    <>
      {/* Announcement Bar */}
      <div className="topbar">
        <span className="announcement-text">{announcements[announcementIndex]}</span>
        <div className="topbar-links">
          <Link href="/about" className="topbar-link">Our Heritage</Link>
          <span className="topbar-sep">•</span>
          <Link href="/contact" className="topbar-link">Atelier Assistance</Link>
        </div>
      </div>

      {/* Desktop Header */}
      <header className="nav-d">
        <nav className="nav-links serif-caps">
          <Link href="/" className={path === '/' ? 'active-nav' : ''}>Home</Link>
          <Link href="/shop" className={path === '/shop' ? 'active-nav' : ''}>Shop</Link>
          
          <div
            className="nav-dropdown-wrapper"
            onMouseEnter={() => setCollectionsOpen(true)}
            onMouseLeave={() => setCollectionsOpen(false)}
          >
            <button className="nav-dropdown-trigger serif-caps" aria-expanded={collectionsOpen}>
              Collections <ChevronDown size={14} className={collectionsOpen ? 'rotate-180' : ''} />
            </button>
            {collectionsOpen && (
              <div className="nav-dropdown-menu">
                <Link href="/shop?tradition=vedic" className="dropdown-item">
                  <b>Indian Ceremonial & Vedic</b>
                  <span>Pitambari dhotis, raw khadi & pure Kashi silk uttariyas</span>
                </Link>
                <Link href="/shop?tradition=priests" className="dropdown-item">
                  <b>Catholic Clerical Attire</b>
                  <span>Tailored tropical wool cassocks & parish vestments</span>
                </Link>
                <Link href="/shop?tradition=monks" className="dropdown-item">
                  <b>Buddhist Monastic Apparel</b>
                  <span>Canonical 7-strip saffron Kasaya meditation robes</span>
                </Link>
                <Link href="/shop?tradition=liturgical" className="dropdown-item">
                  <b>Liturgical Cathedral Vestments</b>
                  <span>Gothic damask chasubles & reversible seasonal stoles</span>
                </Link>
              </div>
            )}
          </div>

          <Link href="/about" className={path === '/about' ? 'active-nav' : ''}>About</Link>
          <Link href="/contact" className={path === '/contact' ? 'active-nav' : ''}>Contact</Link>
        </nav>

        <Link href="/" className="center logo-link" aria-label="आstha Homepage">
          <Logo className="logo-lg" />
        </Link>

        <nav className="nav-actions serif-caps right">
          <Link href="/search" className="action-link" aria-label="Search vestments">
            <Search size={18} />
            <span>Search</span>
          </Link>
          <Link href="/account" className="action-link" aria-label="Customer Account">
            <User size={18} />
            <span>Account</span>
          </Link>
          <Link href="/wishlist" className="action-link" aria-label="Saved Wishlist">
            <Heart size={18} fill={wishlistCount > 0 ? 'var(--gold)' : 'none'} color={wishlistCount > 0 ? 'var(--gold)' : 'currentColor'} />
            <span>Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ''}</span>
          </Link>
          <Link href="/cart" className="action-link action-cart" aria-label="Shopping Bag">
            <ShoppingBag size={18} />
            <span>Bag{count > 0 ? ` (${count})` : ''}</span>
          </Link>
        </nav>
      </header>

      {/* Mobile Top Header */}
      <header className="nav-m">
        <div className="row g12">
          <button
            type="button"
            className="icon-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
          {inner && (
            <button
              type="button"
              className="icon-btn"
              onClick={() => router.back()}
              aria-label="Back to previous page"
            >
              <ArrowLeft size={20} />
            </button>
          )}
        </div>

        <Link href="/" className="abs-center" aria-label="आstha Homepage">
          <Logo className="logo-md" />
        </Link>

        <div className="row g8">
          <Link href="/search" className="icon-btn" aria-label="Search vestments">
            <Search size={20} />
          </Link>
          <Link href="/wishlist" className="icon-btn" aria-label="Saved Wishlist">
            <Heart size={20} fill={wishlistCount > 0 ? 'var(--gold)' : 'none'} color={wishlistCount > 0 ? 'var(--gold)' : 'currentColor'} />
            {wishlistCount > 0 && <b className="badge">{wishlistCount}</b>}
          </Link>
          <Link href="/cart" className="icon-btn" aria-label="Shopping Bag">
            <ShoppingBag size={20} />
            {count > 0 && <b className="badge">{count}</b>}
          </Link>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <aside className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header between">
              <Logo className="logo-md" />
              <button
                type="button"
                className="icon-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="drawer-content">
              <nav className="drawer-nav">
                <Link href="/" className="drawer-link">
                  <Home size={18} />
                  <span>Home</span>
                </Link>
                <Link href="/shop" className="drawer-link">
                  <Store size={18} />
                  <span>Shop All Vestments</span>
                </Link>

                <div className="drawer-subgroup">
                  <span className="drawer-subtitle">TRADITIONS & ORDERS</span>
                  <Link href="/shop?tradition=vedic" className="drawer-sublink">
                    Indian Ceremonial & Vedic (Pandits)
                  </Link>
                  <Link href="/shop?tradition=priests" className="drawer-sublink">
                    Catholic Clerical (Cassocks & Fathers)
                  </Link>
                  <Link href="/shop?tradition=monks" className="drawer-sublink">
                    Buddhist Monastic (Saffron Kasaya)
                  </Link>
                  <Link href="/shop?tradition=liturgical" className="drawer-sublink">
                    Liturgical Vestments (Chasubles & Stoles)
                  </Link>
                </div>

                <div className="drawer-subgroup">
                  <span className="drawer-subtitle">STORE SERVICES</span>
                  <Link href="/account" className="drawer-link">
                    <User size={18} />
                    <span>My Account & Orders</span>
                  </Link>
                  <Link href="/track" className="drawer-link">
                    <Sparkles size={18} />
                    <span>Track Consignment</span>
                  </Link>
                  <Link href="/about" className="drawer-link">
                    <BookOpen size={18} />
                    <span>Heritage & Craftsmanship</span>
                  </Link>
                  <Link href="/contact" className="drawer-link">
                    <Phone size={18} />
                    <span>Contact Atelier</span>
                  </Link>
                </div>
              </nav>

              <div className="drawer-footer">
                <p className="eyebrow">ASSISTANCE</p>
                <p className="sm muted">Concierge: atelier@aastha-sacred.in</p>
                <p className="sm muted">Pan-India Complimentary Insured Courier</p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export function TabBar() {
  const path = usePathname();
  const { count } = useCart();
  const { wishlistCount } = useWishlist();

  const tabs = [
    ['/', 'Home', Home, null],
    ['/shop', 'Shop', Store, null],
    ['/search', 'Search', Search, null],
    ['/wishlist', 'Wishlist', Heart, wishlistCount > 0 ? wishlistCount : null],
    ['/cart', 'Bag', ShoppingBag, count > 0 ? count : null]
  ];

  const active = (h) => {
    if (h === '/') return path === '/';
    return path.startsWith(h);
  };

  return (
    <nav className="tabbar" aria-label="Bottom Navigation">
      {tabs.map(([h, l, Icon, badge]) => (
        <Link key={l} href={h} className={active(h) ? 'on' : ''} aria-label={l}>
          <div className="tabbar-icon-wrap">
            <Icon size={20} />
            {badge !== null && <span className="tabbar-badge">{badge}</span>}
          </div>
          <span>{l}</span>
        </Link>
      ))}
    </nav>
  );
}
