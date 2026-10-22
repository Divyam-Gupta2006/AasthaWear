import { Playfair_Display, Inter, Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import Header, { TabBar } from '@/components/Header';
import Footer from '@/components/Footer';
import { siteConfig } from '@/lib/siteConfig';

const serif = Playfair_Display({
  subsets: ['latin'],
  variable: '--f-serif',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--f-sans',
  display: 'swap',
});

const deva = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['700'],
  variable: '--f-deva',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'आstha — Traditional Ceremonial Clothing & Sacred Vestments',
    template: '%s | आstha',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: 'आstha Atelier Guild' }],
  creator: 'आstha Sacred Clothiers',
  publisher: 'आstha Sacred Clothiers Pvt. Ltd.',
  keywords: [
    'Pitambari dhoti',
    'Ahimsa silk angavastram',
    'Roman clerical cassock',
    'Catholic vestments',
    'Buddhist Kasaya robe',
    'Monastic apparel',
    'Liturgical chasuble',
    'Reversible stole',
    'Ayodhya khadi kurta',
    'Kashi silk uttariya',
    'Vedic ritual attire',
    'Ceremonial clothing India'
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'आstha — Traditional Ceremonial Clothing & Sacred Vestments',
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'आstha Sacred Clothiers — Ceremonial & Liturgical Vestments',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'आstha — Traditional Ceremonial Clothing & Sacred Vestments',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/hero-model.png`,
  image: `${siteConfig.url}/images/hero-model.png`,
  description: siteConfig.description,
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Net Banking',
  priceRange: '₹₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.pincode,
    addressCountry: siteConfig.address.country,
  },
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.url}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
      </head>
      <body className={`${serif.variable} ${sans.variable} ${deva.variable}`}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <TabBar />
        </CartProvider>
      </body>
    </html>
  );
}
