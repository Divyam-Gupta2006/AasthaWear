'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { bySlug } from '@/lib/data';

const CartCtx = createContext(null);
const WishlistCtx = createContext(null);
const ToastCtx = createContext(null);

const seedCart = [
  { slug: 'pitambari-dhoti-angavastram', size: 'One Size (4.1m Dhoti + 2.2m Angavastram)', color: 'Ritual saffron', qty: 1 }
];

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('astha-cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      } else {
        setItems(seedCart);
      }

      const savedWishlist = localStorage.getItem('astha-wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch {
      setItems(seedCart);
    }
    setMounted(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('astha-cart', JSON.stringify(items));
    } catch {}
  }, [items, mounted]);

  // Save wishlist to localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('astha-wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist, mounted]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast((cur) => (cur === message ? null : cur));
    }, 2800);
  };

  const add = (slug, size, color, qty = 1) => {
    const p = bySlug(slug);
    if (!p) return;
    const itemSize = size || p.defaultSize || p.sizes?.[0] || 'Standard';
    const itemColor = color || p.color;

    setItems((cur) => {
      const i = cur.findIndex((x) => x.slug === slug && x.size === itemSize && x.color === itemColor);
      if (i > -1) {
        return cur.map((x, k) => (k === i ? { ...x, qty: x.qty + qty } : x));
      }
      return [...cur, { slug, size: itemSize, color: itemColor, qty }];
    });
    showToast(`Added "${p.name}" to your bag.`);
  };

  const change = (i, d) => {
    setItems((c) =>
      c
        .map((x, k) => (k === i ? { ...x, qty: Math.max(1, x.qty + d) } : x))
        .filter((x) => x.qty > 0)
    );
  };

  const remove = (i) => {
    const item = items[i];
    const p = item ? bySlug(item.slug) : null;
    setItems((c) => c.filter((_, k) => k !== i));
    if (p) showToast(`Removed "${p.name}" from your bag.`);
  };

  const clear = () => setItems([]);

  const applyPromo = (code) => {
    const clean = (code || '').trim().toUpperCase();
    if (!clean) return { success: false, message: 'Please enter a voucher code.' };
    if (clean === 'ASTHA10' || clean === 'SACRED10') {
      setPromoCode(clean);
      setDiscount(0.1); // 10% discount
      showToast('Offer code ASTHA10 applied: 10% off your sacred order.');
      return { success: true, message: '10% sacred privilege discount applied.' };
    }
    if (clean === 'ATELIER500') {
      setPromoCode(clean);
      setDiscount(500); // Flat ₹500
      showToast('Offer code ATELIER500 applied: ₹500 courtesy concession.');
      return { success: true, message: '₹500 courtesy concession applied.' };
    }
    return { success: false, message: 'Invalid or expired code. Try "ASTHA10".' };
  };

  const removePromo = () => {
    setPromoCode('');
    setDiscount(0);
    showToast('Promo code removed.');
  };

  // Wishlist methods
  const isSaved = (slug) => wishlist.includes(slug);
  const toggleWishlist = (slug) => {
    const p = bySlug(slug);
    setWishlist((cur) => {
      if (cur.includes(slug)) {
        if (p) showToast(`Removed "${p.name}" from saved list.`);
        return cur.filter((x) => x !== slug);
      } else {
        if (p) showToast(`Saved "${p.name}" to your wishlist.`);
        return [...cur, slug];
      }
    });
  };

  const lines = items
    .map((x) => ({ ...x, p: bySlug(x.slug) }))
    .filter((x) => Boolean(x.p));

  const count = lines.reduce((a, x) => a + x.qty, 0);
  const subtotal = lines.reduce((a, x) => a + x.qty * x.p.price, 0);
  const discountAmount = discount > 0 && discount < 1 ? Math.round(subtotal * discount) : discount;
  const shippingCost = shippingMethod === 'express' ? 450 : 0;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  return (
    <ToastCtx.Provider value={{ toast, showToast }}>
      <WishlistCtx.Provider value={{ wishlist, isSaved, toggleWishlist, wishlistCount: wishlist.length }}>
        <CartCtx.Provider
          value={{
            lines,
            count,
            subtotal,
            discount: discountAmount,
            promoCode,
            applyPromo,
            removePromo,
            shippingMethod,
            setShippingMethod,
            shippingCost,
            total,
            add,
            change,
            remove,
            clear
          }}
        >
          {children}
          {toast && (
            <div className="luxury-toast" role="status" aria-live="polite">
              <span>{toast}</span>
            </div>
          )}
        </CartCtx.Provider>
      </WishlistCtx.Provider>
    </ToastCtx.Provider>
  );
}

export const useCart = () => useContext(CartCtx);
export const useWishlist = () => useContext(WishlistCtx);
export const useToast = () => useContext(ToastCtx);
