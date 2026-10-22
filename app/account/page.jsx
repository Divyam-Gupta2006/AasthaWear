import AccountClient from './AccountClient';

export const metadata = {
  title: 'Customer Atelier Account & Orders',
  description: 'Manage your commissioned sacred vestments, delivery addresses, and canonical ecclesiastical measurements.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function AccountPage() {
  return <AccountClient />;
}
