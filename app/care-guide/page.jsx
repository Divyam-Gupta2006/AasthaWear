import Link from 'next/link';
import { Sparkles, Sun, Droplets, ShieldCheck, Wind } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

export const metadata = {
  title: 'Ceremonial Garment Care & Textile Preservation Guide',
  description: 'Expert care handbook for maintaining Ahimsa mulberry silk, metallic gold zari borders, tropical worsted wool cassocks, and handspun khadi cotton.',
  alternates: {
    canonical: '/care-guide',
  },
  openGraph: {
    title: 'Ceremonial Garment Care & Textile Preservation Guide | आstha',
    description: 'Expert care handbook for maintaining Ahimsa mulberry silk, metallic gold zari borders, tropical worsted wool cassocks, and handspun khadi cotton.',
    url: `${siteConfig.url}/care-guide`,
  },
};

export default function CareGuidePage() {
  return (
    <div className="wrap page policy-root">
      <header>
        <span className="eyebrow">PRESERVING SACRED CLOTH</span>
        <h1 className="serif big">Vestment Care & Preservation Guide</h1>
        <p className="muted lead">
          Traditional ceremonial apparel is woven to endure for generations when honoured with mindful, sacred maintenance.
        </p>
      </header>

      <div className="care-guide-grid mt">
        {/* Ahimsa Silk */}
        <section className="care-card">
          <span className="eyebrow">1. 100% AHIMSA MULBERRY SILK (PITAMBARI & UTTARIYA)</span>
          <h2 className="serif big2 mt-xs">Preserving Pure Silk & Zari Borders</h2>
          <div className="care-rules mt">
            <p className="sm muted"><b>Washing:</b> Professional dry clean recommended for the initial wear to set the pure metallic zari. For subsequent hand washing, use cold water and natural soapnuts (reetha) or pH-neutral silk detergent. Never wring or squeeze.</p>
            <p className="sm muted mt-xs"><b>Drying:</b> Roll in a clean white towel to absorb excess moisture, then dry flat in ambient indoor shade. Never expose to harsh tropical noon sun.</p>
            <p className="sm muted mt-xs"><b>Ironing:</b> Press on the reverse side using medium-low silk temperature. Always use a thin cotton pressing cloth between the iron and the gold zari border.</p>
            <p className="sm muted mt-xs"><b>Storage:</b> Wrap in the complimentary unbleached muslin bag. Change folds every 3–4 months to prevent permanent creasing along zari lines. Use dried neem leaves or cedar blocks instead of chemical mothballs.</p>
          </div>
        </section>

        {/* Tropical Wool Cassock */}
        <section className="care-card mt">
          <span className="eyebrow">2. PURE TROPICAL WOOL (ROMAN CLERICAL CASSOCKS)</span>
          <h2 className="serif big2 mt-xs">Maintaining Structure & 33 Cloth Buttons</h2>
          <div className="care-rules mt">
            <p className="sm muted"><b>Cleaning:</b> Specialist dry clean only. Wool fibers are naturally antimicrobial and odor-resistant; airing out your cassock on a wooden hanger after liturgical duties is usually sufficient between dry cleans.</p>
            <p className="sm muted mt-xs"><b>Steaming:</b> Use a handheld garment steamer from a 4-inch distance to release transport creases and restore back pleats.</p>
            <p className="sm muted mt-xs"><b>Hanging:</b> Always store on the contoured wide-shoulder wooden hanger provided to maintain canvas collar and shoulder integrity.</p>
          </div>
        </section>

        {/* Handspun Khadi */}
        <section className="care-card mt">
          <span className="eyebrow">3. DESI HANDSPUN KHADI COTTON (AYODHYA SET)</span>
          <h2 className="serif big2 mt-xs">Caring for Natural Unbleached Cotton</h2>
          <div className="care-rules mt">
            <p className="sm muted"><b>Washing:</b> Hand wash or machine wash on gentle cycle with cold water. Genuine handspun khadi softens and becomes increasingly comfortable with every subsequent wash.</p>
            <p className="sm muted mt-xs"><b>Drying & Ironing:</b> Line dry in partial shade. Press with a high steam setting while the fabric remains slightly damp for crisp sacerdotal presentation.</p>
          </div>
        </section>

        {/* Liturgical Damask & Stoles */}
        <section className="care-card mt">
          <span className="eyebrow">4. DAMASK JACQUARD & METALLIC ORPHREY EMBROIDERY</span>
          <h2 className="serif big2 mt-xs">Preserving Chasubles & Liturgical Stoles</h2>
          <div className="care-rules mt">
            <p className="sm muted"><b>Storage:</b> Never fold across raised metallic bullion cross embroideries. Store chasubles hanging in full-length ventilated garment covers. Roll reversible stoles around protective velvet tubes.</p>
            <p className="sm muted mt-xs"><b>Spot Cleaning:</b> Dab gently with a damp microfiber cloth moistened with distilled water. Never scrub embroidery threads.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
