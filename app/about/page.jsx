import Link from 'next/link';
import { ArrowRight, ShieldCheck, Award, Heart, Sparkles } from 'lucide-react';
import Photo from '@/components/Photo';
import { Logo } from '@/components/Header';
import { siteConfig } from '@/lib/siteConfig';

export const metadata = {
  title: 'Our Story & Weaving Heritage',
  description: 'The philosophy of sacred textile craftsmanship, preserving Vedic weaving guilds and Roman ecclesiastical sartorial dignity.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'Our Story & Weaving Heritage | आstha Sacred Clothiers',
    description: 'The philosophy of sacred textile craftsmanship, preserving Vedic weaving guilds and Roman ecclesiastical sartorial dignity.',
    url: `${siteConfig.url}/about`,
    images: [{ url: `${siteConfig.url}/images/new-collection.png`, width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return (
    <div className="wrap page about-root">
      {/* Hero Editorial */}
      <section className="about-hero">
        <span className="eyebrow">THE ATELIER HERITAGE</span>
        <h1 className="serif big">Faith that lives through you.</h1>
        <p className="lead muted">
          Founded with a sole, uncompromising purpose: to restore genuine reverence, canonical exactitude, and artisanal purity to ceremonial and liturgical garments.
        </p>
      </section>

      {/* Campaign Feature Image */}
      <div className="about-image-banner mt">
        <Photo
          src="/images/new-collection.png"
          tone="#2a2219"
          className="about-hero-photo"
          alt="आstha textile craftsmen and sacred vestments"
        >
          <div className="about-overlay-text">
            <span className="serif-caps">Varanasi • Kashi • Rome</span>
            <p className="sm muted">Preserving Sacred Textile Guilds Across Traditions</p>
          </div>
        </Photo>
      </div>

      {/* Manifesto Section */}
      <section className="about-section mt-lg">
        <div className="two craft-split">
          <div>
            <span className="eyebrow">OUR PHILOSOPHY</span>
            <h2 className="serif big2">A Garment as an Instrument of Reverence</h2>
            <p className="muted mt">
              In religious traditions spanning millennia—whether performing a Vedic yajna beside the sacred fire, standing at the altar for the Holy Sacrifice of the Mass, or sitting in prolonged Vipassana meditation—the cloth one wears is never neutral. It either honours the rite or diminishes it.
            </p>
            <p className="muted mt">
              Mass manufacturing and synthetic polymers have flooded ceremonial apparel with cheap rayon blends, non-canonical cuts, and exploitative labour. <b>आstha</b> was created as a sanctuary from this compromise.
            </p>
          </div>

          <div>
            <span className="eyebrow">CANONICAL EXACTITUDE</span>
            <h2 className="serif big2">Every Thread Guided by Tradition</h2>
            <p className="muted mt">
              We do not innovate for the sake of novelty. Our Roman clerical cassocks adhere strictly to the 33-button single-breasted form and standing rabat collar. Our Buddhist Kasaya meditation robes follow the canonical 7-strip paddy patchwork mandated by ancient Vinaya monastic rules. Our Vedic dhotis are woven exclusively from cruelty-free Ahimsa silk, ensuring non-harm for temple sanctum entry.
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="about-pillars-section mt-lg" aria-label="Our core principles">
        <h2 className="serif big2 center-t mb">The Three Sacraments of Our Craft</h2>
        <div className="grid4 g2 mt">
          <div className="pillar-box">
            <Award size={28} className="gold mb-xs" aria-hidden="true" />
            <h3 className="serif">1. Ahimsa & Natural Fibres</h3>
            <p className="sm muted mt-xs">
              We insist on 100% peace mulberry silk, unbleached handspun desi khadi cotton, certified organic linen, and superfine breathable worsted tropical wool. No petrochemical synthetics near sacred flames.
            </p>
          </div>

          <div className="pillar-box">
            <ShieldCheck size={28} className="gold mb-xs" aria-hidden="true" />
            <h3 className="serif">2. Artisanal Weavers Guilds</h3>
            <p className="sm muted mt-xs">
              Every ceremonial dhoti, uttariya, and chasuble supports multi-generational pit-loom weaver families in Varanasi and master vestment tailors who maintain traditional ecclesiastical stitching.
            </p>
          </div>

          <div className="pillar-box">
            <Sparkles size={28} className="gold mb-xs" aria-hidden="true" />
            <h3 className="serif">3. Bespoke Atelier Sizing</h3>
            <p className="sm muted mt-xs">
              Understanding that clerical and monastic life demands day-long comfort and precise liturgical clearance, our atelier provides personal sizing adjustments for priests, monks, and ceremonial patrons.
            </p>
          </div>

          <div className="pillar-box">
            <Heart size={28} className="gold mb-xs" aria-hidden="true" />
            <h3 className="serif">4. Sacred Transparency</h3>
            <p className="sm muted mt-xs">
              We communicate openly about fabric composition, origins, and care. No exaggerated claims, no fabricated certificates—only honest textile purity.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta-section mt-lg center-t">
        <div className="dark-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="serif big2">Experience Sacred Dignity</h2>
          <p className="muted" style={{ margin: '12px auto', maxWidth: '580px' }}>
            Explore our curated catalog of ceremonial garments, or contact our atelier for ordination and custom liturgical sizing.
          </p>
          <div className="row g12" style={{ justifyContent: 'center' }}>
            <Link href="/shop" className="btn light">
              BROWSE CATALOGUE
            </Link>
            <Link href="/contact" className="ul" style={{ color: '#fff' }}>
              CONTACT ATELIER
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
