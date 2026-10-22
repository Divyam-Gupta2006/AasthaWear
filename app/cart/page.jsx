import CartClient from './CartClient';

export const metadata = {
  title: 'Your Shopping Bag',
  description: 'Review your selected ceremonial garments, Vedic dhotis, and liturgical vestments before proceeding to secure checkout.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function CartPage() {
  return <CartClient />;
}
