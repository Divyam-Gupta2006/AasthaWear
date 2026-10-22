import WishlistClient from './WishlistClient';

export const metadata = {
  title: 'Your Saved Vestments Wishlist',
  description: 'View and manage your saved ceremonial garments, Ahimsa silk dhotis, and Roman clerical cassocks.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function WishlistPage() {
  return <WishlistClient />;
}
