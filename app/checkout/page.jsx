import CheckoutClient from './CheckoutClient';

export const metadata = {
  title: 'Checkout & Sacred Commission',
  description: 'Complete your sacred vestment commission with complimentary pan-India insured courier delivery.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
