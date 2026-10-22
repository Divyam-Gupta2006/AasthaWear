import Link from 'next/link';
import { Ruler, ShieldCheck, Check } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

export const metadata = {
  title: 'Size & Measurement Guide — Cassocks, Dhotis & Monastic Robes',
  description: 'Canonical measurement charts for Roman Clerical Cassocks (38R–46R), traditional 8-cubit Dhoti wraps, Buddhist Kasaya robes, and Kurta sets.',
  alternates: {
    canonical: '/size-guide',
  },
  openGraph: {
    title: 'Size & Measurement Guide — Cassocks, Dhotis & Monastic Robes | आstha',
    description: 'Canonical measurement charts for Roman Clerical Cassocks (38R–46R), traditional 8-cubit Dhoti wraps, Buddhist Kasaya robes, and Kurta sets.',
    url: `${siteConfig.url}/size-guide`,
  },
};

export default function SizeGuidePage() {
  return (
    <div className="wrap page policy-root">
      <header>
        <span className="eyebrow">SARTORIAL CANON</span>
        <h1 className="serif big">Size & Measurement Guide</h1>
        <p className="muted lead">
          Detailed measurement charts to ensure canonical floor clearance, comfortable ritual movement, and statuesque liturgical presence.
        </p>
      </header>

      {/* Cassock Sizing Table */}
      <section className="size-guide-section mt">
        <h2 className="serif big2">1. Roman Clerical Cassock Sizing (Inches)</h2>
        <p className="sm muted">Measure over a clerical shirt around the fullest part of your chest.</p>
        <div className="table-wrapper mt-xs">
          <table className="size-table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Chest Circumference</th>
                <th>Neck / Collar Circumference</th>
                <th>Standard Back Length</th>
                <th>Sleeve Length</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>38R</b></td>
                <td>37–39 in (94–99 cm)</td>
                <td>15.5–16.0 in (39–41 cm)</td>
                <td>56 in (142 cm)</td>
                <td>24.5 in (62 cm)</td>
              </tr>
              <tr>
                <td><b>40R</b></td>
                <td>39–41 in (99–104 cm)</td>
                <td>16.0–16.5 in (41–42 cm)</td>
                <td>57 in (145 cm)</td>
                <td>25.0 in (63.5 cm)</td>
              </tr>
              <tr>
                <td><b>42R</b></td>
                <td>41–43 in (104–109 cm)</td>
                <td>16.5–17.0 in (42–43 cm)</td>
                <td>58 in (147 cm)</td>
                <td>25.5 in (65 cm)</td>
              </tr>
              <tr>
                <td><b>44R</b></td>
                <td>43–45 in (109–114 cm)</td>
                <td>17.0–17.5 in (43–44.5 cm)</td>
                <td>59 in (150 cm)</td>
                <td>26.0 in (66 cm)</td>
              </tr>
              <tr>
                <td><b>46R</b></td>
                <td>45–47 in (114–119 cm)</td>
                <td>17.5–18.0 in (44.5–46 cm)</td>
                <td>60 in (152 cm)</td>
                <td>26.5 in (67 cm)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="sm muted mt-xs">
          * Note: Standard Regular (R) length is designed to clear the floor by 2 inches (5 cm) for heights between 5&apos;8&quot; and 6&apos;0&quot;. If you need Tall (T) or Short (S), mention this in order notes.
        </p>
      </section>

      {/* Vedic Dhoti & Angavastram Dimensions */}
      <section className="size-guide-section mt-lg">
        <h2 className="serif big2">2. Indian Ceremonial Dhotis & Sacred Drapes</h2>
        <div className="two mt-xs">
          <div className="spec-box-sm">
            <h3 className="sm caps" style={{ fontSize: '13px' }}>PITAMBARI DHOTI & ANGAVASTRAM SET</h3>
            <p className="sm muted mt-xs">
              <b>Dhoti Cut:</b> 4.1 metres length × 48 inches width. Traditional 8-cubit (Ashta-Vastram) canonical wrap. Suitable for Panchakacham (South Indian) or traditional pleated Dhoti wrap (North/Vedic tradition) for waists from 28 to 44 inches.
            </p>
            <p className="sm muted mt-xs">
              <b>Angavastram:</b> 2.2 metres length × 36 inches width. Sits securely across the shoulder.
            </p>
          </div>

          <div className="spec-box-sm">
            <h3 className="sm caps" style={{ fontSize: '13px' }}>KASHI SILK UTTARIYA</h3>
            <p className="sm muted mt-xs">
              <b>Stole Dimensions:</b> 2.4 metres length × 35.5 inches width. Universal sacred wrap for priests, grooms, and ceremonial patrons.
            </p>
          </div>
        </div>
      </section>

      {/* Monastic Kasaya Dimensions */}
      <section className="size-guide-section mt-lg">
        <h2 className="serif big2">3. Buddhist Kasaya Civara Dimensions</h2>
        <div className="spec-box-sm mt-xs">
          <h3 className="sm caps" style={{ fontSize: '13px' }}>STANDARD VINAYA 7-STRIP MEDITATION ROBE</h3>
          <p className="sm muted mt-xs">
            <b>Dimensions:</b> 280 cm (110 inches) length × 180 cm (71 inches) width. Cut generously to allow full wrapping of the body and chest for both single-shoulder (at-ease) and double-shoulder (entering monastery or alms round) canonical positions. Fits heights from 5&apos;3&quot; to 6&apos;3&quot;.
          </p>
        </div>
      </section>

      {/* Ayodhya Khadi Set */}
      <section className="size-guide-section mt-lg">
        <h2 className="serif big2">4. Ayodhya Raw Khadi Kurta & Lower Sizing</h2>
        <div className="table-wrapper mt-xs">
          <table className="size-table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Chest Size</th>
                <th>Kurta Length</th>
                <th>Shoulder Width</th>
                <th>Pyjama Waist (Adjustable)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>S (38)</b></td>
                <td>38 in (96 cm)</td>
                <td>40 in (101 cm)</td>
                <td>17.5 in</td>
                <td>28–36 in</td>
              </tr>
              <tr>
                <td><b>M (40)</b></td>
                <td>40 in (101 cm)</td>
                <td>42 in (106 cm)</td>
                <td>18.5 in</td>
                <td>30–38 in</td>
              </tr>
              <tr>
                <td><b>L (42)</b></td>
                <td>42 in (106 cm)</td>
                <td>44 in (112 cm)</td>
                <td>19.5 in</td>
                <td>32–40 in</td>
              </tr>
              <tr>
                <td><b>XL (44)</b></td>
                <td>44 in (112 cm)</td>
                <td>45 in (114 cm)</td>
                <td>20.5 in</td>
                <td>34–42 in</td>
              </tr>
              <tr>
                <td><b>XXL (46)</b></td>
                <td>46 in (117 cm)</td>
                <td>46 in (117 cm)</td>
                <td>21.5 in</td>
                <td>36–44 in</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="box consultation-box mt-lg">
        <b className="sm">Unsure about your exact dimensions?</b>
        <p className="sm muted">
          Our tailoring master can guide you over a phone consultation or review your diocesan measurements before we cut your garment.
        </p>
        <Link href="/contact" className="ul-s sm mt-xs">
          Book Atelier Sizing Consultation →
        </Link>
      </div>
    </div>
  );
}
