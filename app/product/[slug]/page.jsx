import { notFound } from 'next/navigation';
import { products, bySlug } from '@/lib/data';
import { siteConfig } from '@/lib/siteConfig';
import ProductView from './ProductView';

export const generateStaticParams = () => {
  const params = [];
  products.forEach((p) => {
    params.push({ slug: p.slug });
    if (p.aliases) {
      p.aliases.forEach((alias) => params.push({ slug: alias }));
    }
  });
  return params;
};

export async function generateMetadata({ params }) {
  const p = bySlug(params.slug);
  if (!p) {
    return {
      title: 'Vestment Not Found',
      description: 'The requested sacred vestment could not be located in our catalogue.',
      robots: { index: false, follow: false },
    };
  }

  const pageUrl = `${siteConfig.url}/product/${p.slug}`;
  const imageUrl = `${siteConfig.url}${p.img}`;

  return {
    title: `${p.name} — Sacred Ceremonial Clothing`,
    description: `${p.blurb}. ${p.fabricMaterial}. Hand-crafted according to canonical specifications.`,
    alternates: {
      canonical: `/product/${p.slug}`,
    },
    openGraph: {
      title: `${p.name} | आstha Sacred Clothiers`,
      description: `${p.description.slice(0, 160)}...`,
      url: pageUrl,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 1067,
          alt: `${p.name} - ${p.cat}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${p.name} | आstha`,
      description: p.blurb,
      images: [imageUrl],
    },
  };
}

export default function Page({ params }) {
  const p = bySlug(params.slug);
  if (!p) notFound();

  const productUrl = `${siteConfig.url}/product/${p.slug}`;
  const galleryUrls = (p.gallery || [p.img]).map((img) => `${siteConfig.url}${img}`);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: galleryUrls,
    sku: p.slug,
    category: p.cat,
    material: p.fabricMaterial,
    color: p.color,
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'INR',
      price: p.price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shop',
        item: `${siteConfig.url}/shop`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: p.name,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <ProductView p={p} />
    </>
  );
}
