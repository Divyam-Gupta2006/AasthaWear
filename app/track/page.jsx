import TrackClient from './TrackClient';

export const metadata = {
  title: 'Track Your Sacred Consignment',
  description: 'Real-time consignment tracking for commissioned vestments and ceremonial apparel with step-by-step dispatch milestones.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function TrackPage() {
  return <TrackClient />;
}
