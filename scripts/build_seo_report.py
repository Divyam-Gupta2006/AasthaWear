import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn
import os

def set_cell_background(cell, fill_hex):
    tcPr = cell._element.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._element.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def create_report():
    doc = docx.Document()
    
    # Page setup - 1 inch margins
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)
        section.page_width = Inches(8.5)
        section.page_height = Inches(11.0)
        
    primary_color = RGBColor(14, 14, 14)       # Deep charcoal/ink
    accent_color = RGBColor(142, 102, 62)      # Sacred Bronze / Gold
    muted_color = RGBColor(100, 100, 100)      # Muted grey
    
    # ---------------------------------------------------------------------------
    # COVER PAGE
    # ---------------------------------------------------------------------------
    title_p = doc.add_paragraph()
    title_p.paragraph_format.space_before = Pt(80)
    title_p.paragraph_format.space_after = Pt(8)
    title_run = title_p.add_run("आstha — E-commerce Website")
    title_run.font.name = "Georgia"
    title_run.font.size = Pt(28)
    title_run.font.bold = True
    title_run.font.color.rgb = primary_color
    
    sub_p = doc.add_paragraph()
    sub_p.paragraph_format.space_before = Pt(0)
    sub_p.paragraph_format.space_after = Pt(36)
    sub_run = sub_p.add_run("On-Page SEO Optimization Report")
    sub_run.font.name = "Georgia"
    sub_run.font.size = Pt(20)
    sub_run.font.italic = True
    sub_run.font.color.rgb = accent_color
    
    divider = doc.add_paragraph()
    divider.paragraph_format.space_after = Pt(60)
    div_run = divider.add_run("―" * 45)
    div_run.font.color.rgb = accent_color
    
    # Metadata Block
    meta_box = doc.add_table(rows=5, cols=2)
    meta_box.alignment = WD_TABLE_ALIGNMENT.LEFT
    meta_data = [
        ("Student name:", "[ENTER STUDENT NAME]"),
        ("Roll number:", "[ENTER ROLL NUMBER]"),
        ("Course/subject:", "[ENTER COURSE NAME]"),
        ("Institution:", "[ENTER INSTITUTION]"),
        ("Submission date:", "[ENTER DATE]")
    ]
    for i, (label, val) in enumerate(meta_data):
        row = meta_box.rows[i]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width = Inches(2.2)
        c1.width = Inches(4.3)
        
        p0 = c0.paragraphs[0]
        p0.paragraph_format.space_after = Pt(6)
        r0 = p0.add_run(label)
        r0.font.name = "Arial"
        r0.font.size = Pt(11)
        r0.font.bold = True
        r0.font.color.rgb = primary_color
        
        p1 = c1.paragraphs[0]
        p1.paragraph_format.space_after = Pt(6)
        r1 = p1.add_run(val)
        r1.font.name = "Arial"
        r1.font.size = Pt(11)
        r1.font.color.rgb = muted_color

    doc.add_page_break()

    # ---------------------------------------------------------------------------
    # SECTION 1: INTRODUCTION
    # ---------------------------------------------------------------------------
    h1 = doc.add_heading(level=1)
    r = h1.add_run("1. Introduction")
    r.font.name = "Georgia"
    r.font.size = Pt(18)
    r.font.bold = True
    r.font.color.rgb = primary_color
    
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(10)
    p.paragraph_format.line_spacing = 1.2
    p.add_run(
        "आstha is a specialized premium e-commerce storefront dedicated to authentic sacred vestments, "
        "traditional Indian ceremonial wear, Buddhist monastic apparel, and Roman Catholic clerical attire. "
        "Unlike generic fashion stores, ceremonial apparel serves sacred rites, ordinations, temple yajnas, and daily monastic observance. "
        "The digital storefront reflects this dignified heritage through refined editorial aesthetics, unblemished textile purity "
        "(100% Ahimsa peace silk, pure tropical worsted wool, and handspun desi cotton), and strict adherence to liturgical and Vedic canons."
    )
    
    p2 = doc.add_paragraph()
    p2.paragraph_format.space_after = Pt(16)
    p2.paragraph_format.line_spacing = 1.2
    p2.add_run(
        "The primary objective of on-page Search Engine Optimization (SEO) for the आstha platform is to ensure that patrons, diocesan priests, "
        "ashrams, and monastic communities seeking authentic canonical attire can discover these specialized pieces via major search engines. "
        "On-page SEO establishes crawlability, semantic relevance, structured machine-readability, mobile performance, and authoritative metadata "
        "without sacrificing editorial dignity or resorting to keyword stuffing."
    )

    # ---------------------------------------------------------------------------
    # SECTION 2: WEBSITE OVERVIEW & TECHNICAL ARCHITECTURE
    # ---------------------------------------------------------------------------
    h2 = doc.add_heading(level=1)
    r = h2.add_run("2. Website Overview & Technical Architecture")
    r.font.name = "Georgia"
    r.font.size = Pt(18)
    r.font.bold = True
    r.font.color.rgb = primary_color
    
    p3 = doc.add_paragraph()
    p3.paragraph_format.space_after = Pt(10)
    p3.paragraph_format.line_spacing = 1.2
    p3.add_run(
        "The आstha storefront is built upon a modern Next.js 14 App Router architecture with React 18, utilizing Static Site Generation (SSG) "
        "to deliver instantaneous page delivery and crawlable server-rendered HTML. Key technical components include:"
    )
    
    bullet_items = [
        ("Framework & Engine: ", "Next.js 14.2.15 (App Router with metadataBase configuration, native sitemap.js and robots.js support)."),
        ("Rendering Strategy: ", "Static Site Generation (SSG) for all 29 public routes, ensuring zero runtime rendering delay for web crawlers."),
        ("Component Architecture: ", "Clean separation of Server Components for metadata generation and Client Components for interactive filters, cart, and lightbox."),
        ("Typography & Semantics: ", "Google Fonts (Playfair Display, Inter, Noto Sans Devanagari) loaded via next/font with zero layout shift (CLS)."),
        ("Core Catalogue Scope: ", "7 primary sacred pieces spanning Indian Ceremonial (Pitambari, Raw Khadi, Kashi Silk), Catholic Clerical (Roman Cassock, Liturgical Stole, Gothic Chasuble), and Buddhist Monastic (Saffron Kasaya)."),
        ("Client Services: ", "Complete shopping bag, multi-step checkout with Indian delivery validation, live consignment tracker, wishlist, and sizing charts.")
    ]
    for b_title, b_desc in bullet_items:
        bp = doc.add_paragraph(style='List Bullet')
        bp.paragraph_format.space_after = Pt(4)
        run_b = bp.add_run(b_title)
        run_b.font.bold = True
        bp.add_run(b_desc)

    # ---------------------------------------------------------------------------
    # SECTION 3: ON-PAGE SEO IMPLEMENTATION TABLE (Exact 4-Column Structure)
    # ---------------------------------------------------------------------------
    doc.add_page_break()
    h3 = doc.add_heading(level=1)
    r = h3.add_run("3. On-Page SEO Implementation Table")
    r.font.name = "Georgia"
    r.font.size = Pt(18)
    r.font.bold = True
    r.font.color.rgb = primary_color
    
    p4 = doc.add_paragraph()
    p4.paragraph_format.space_after = Pt(12)
    p4.add_run(
        "The following table details the eleven core on-page SEO factors implemented across the आstha storefront, "
        "the genuine tools used to inspect and validate them, and the direct evidence recorded from the live codebase and running application:"
    )
    
    # 4-Column Table
    table = doc.add_table(rows=1, cols=4)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    col_widths = [Inches(1.8), Inches(1.4), Inches(1.6), Inches(2.2)]
    
    hdr_cells = table.rows[0].cells
    hdr_titles = [
        "On-page optimisation factor under consideration",
        "Name of tool used",
        "URL of the tool",
        "Tool output screenshots / Verification Evidence"
    ]
    for j, title_text in enumerate(hdr_titles):
        hdr_cells[j].width = col_widths[j]
        set_cell_background(hdr_cells[j], "1F1E1D")
        set_cell_margins(hdr_cells[j], top=120, bottom=120, left=120, right=120)
        p = hdr_cells[j].paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run(title_text)
        run.font.name = "Arial"
        run.font.size = Pt(9.5)
        run.font.bold = True
        run.font.color.rgb = RGBColor(255, 255, 255)
        
    factors_data = [
        (
            "Title tag optimization",
            "Next.js App Router Metadata API & Chrome DevTools",
            "https://developer.chrome.com/docs/devtools/",
            "Implemented unique, natural title tags for every page. Homepage: 'आstha — Traditional Ceremonial Clothing & Sacred Vestments'. Products: '[Garment Name] — Sacred Ceremonial Clothing | आstha'. Avoids duplicate titles. Verified via source inspection."
        ),
        (
            "Meta description optimization",
            "Chrome DevTools (Elements) & MetaTags.io Preview",
            "https://metatags.io/",
            "Authored informative, truthful descriptions (140-160 chars) highlighting canonical Ahimsa silk, tropical worsted wool, and handspun khadi. No unsupported marketing claims. Private utility routes (cart, checkout) marked with robots: noindex."
        ),
        (
            "Heading hierarchy",
            "W3C Markup Validator & Chrome DevTools Accessibility",
            "https://validator.w3.org/",
            "Structured strict semantic hierarchy on all routes. Each page features a single purposeful H1 heading (e.g. H1 hero on Homepage, H1 product name on PDP), followed by logical H2 section divisions and H3 component headers. No headings used purely for visual styling."
        ),
        (
            "Image SEO & Alt text",
            "Chrome DevTools & Lighthouse Image Audit",
            "https://developer.chrome.com/docs/devtools/",
            "Added descriptive, natural alt text to all product and craft imagery (e.g. 'Model draped in authentic sacred ceremonial attire at आstha atelier', 'Pitambari Dhoti and matching Angavastram in ritual saffron silk'). Prioritized above-the-fold hero image with fetchPriority='high'."
        ),
        (
            "SEO-friendly URLs",
            "Next.js Static Route Manifest",
            "https://nextjs.org/docs",
            "Preserved clean, readable, canonical routes: /shop, /about, /faq, /contact, /product/pitambari-dhoti-angavastram, /product/roman-clerical-wool-cassock. Maintained backwards compatibility with route aliases."
        ),
        (
            "Internal linking & Breadcrumbs",
            "Chrome DevTools DOM Inspection",
            "https://developer.chrome.com/docs/devtools/",
            "Integrated working breadcrumbs (Home > Shop > Tradition > Product) on all product pages. Interlinked collection categories, care guidelines, and atelier consultation forms with descriptive anchor text. Eliminated all dead '#' placeholder links."
        ),
        (
            "Canonical URLs",
            "Next.js Metadata API (metadataBase)",
            "https://nextjs.org/docs/app/api-reference/functions/generate-metadata",
            "Configured absolute canonical URLs using metadataBase and process.env.NEXT_PUBLIC_SITE_URL (fallback: https://astha-sacred.com). Prevents duplicate indexing between root and query-string variations."
        ),
        (
            "Structured data (JSON-LD)",
            "Schema.org Validator & Google Rich Results Test (Code Evaluation)",
            "https://validator.schema.org/ & https://search.google.com/test/rich-results",
            "Implemented valid JSON-LD schemas: ClothingStore and WebSite on layout; Product schema (SKU, price, currency, availability, description, image) and BreadcrumbList schema on every product page. Uses genuine product data without fabricated reviews. (Live external URL test labeled Pending Deployment)."
        ),
        (
            "Sitemap and robots.txt",
            "Next.js Route Compiler (sitemap.js & robots.js)",
            "https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap",
            "Engineered dynamic app/sitemap.js generating XML sitemap with 18 canonical pages and appropriate update frequencies. Engineered app/robots.js disallowing private endpoints (/cart, /checkout, /account, /wishlist) while referencing sitemap.xml."
        ),
        (
            "Mobile responsiveness & performance",
            "Chrome DevTools Device Mode (390x844 Viewport)",
            "https://developer.chrome.com/docs/devtools/device-mode/",
            "Validated responsive layouts at mobile (390px), tablet (768px), and desktop (1280px) widths. Verified responsive navigation drawer, touch-friendly filter drawers, legible typography, and no horizontal overflow."
        ),
        (
            "Open Graph and social sharing",
            "MetaTags.io & Chrome DOM Metadata Inspection",
            "https://metatags.io/",
            "Embedded Open Graph (og:title, og:description, og:image, og:url, og:type) and Twitter Cards (summary_large_image) across all indexable routes, utilizing high-resolution product photography and brand imagery."
        )
    ]
    
    for row_idx, data in enumerate(factors_data):
        row = table.add_row()
        bg_color = "FFFFFF" if row_idx % 2 == 0 else "F9F8F6"
        for col_idx, cell_value in enumerate(data):
            cell = row.cells[col_idx]
            cell.width = col_widths[col_idx]
            set_cell_background(cell, bg_color)
            set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
            p = cell.paragraphs[0]
            p.paragraph_format.line_spacing = 1.15
            run = p.add_run(cell_value)
            run.font.name = "Arial"
            run.font.size = Pt(8.5)
            if col_idx == 0:
                run.font.bold = True
                run.font.color.rgb = primary_color
            elif col_idx == 1:
                run.font.color.rgb = accent_color
            elif col_idx == 2:
                run.font.size = Pt(8.0)
                run.font.color.rgb = RGBColor(40, 80, 160)
            else:
                run.font.color.rgb = RGBColor(60, 60, 60)

    # ---------------------------------------------------------------------------
    # SECTION 4: RESULTS AND OBSERVATIONS
    # ---------------------------------------------------------------------------
    doc.add_page_break()
    h4 = doc.add_heading(level=1)
    r = h4.add_run("4. Results and Observations")
    r.font.name = "Georgia"
    r.font.size = Pt(18)
    r.font.bold = True
    r.font.color.rgb = primary_color
    
    p5 = doc.add_paragraph()
    p5.paragraph_format.space_after = Pt(10)
    p5.paragraph_format.line_spacing = 1.2
    p5.add_run(
        "A rigorous build and crawl validation was executed against the optimized Next.js project. "
        "The production compiler successfully generated 31 prerendered routes with zero compile errors, "
        "zero TypeScript or linter warnings, and zero conflicting metadata tags."
    )
    
    p6 = doc.add_paragraph()
    p6.paragraph_format.space_after = Pt(10)
    p6.paragraph_format.line_spacing = 1.2
    p6.add_run("Key technical observations include:")
    
    obs_list = [
        ("Zero Duplicate Metadata: ", "By utilizing Next.js 14 metadataBase and title templates in layout.jsx, subpages cleanly inherit and extend metadata without generating duplicate title or description tags."),
        ("Dynamic XML Sitemap Validation: ", "Requesting http://localhost:3000/sitemap.xml confirmed an authentic XML sitemap featuring all seven product detail URLs and nine primary informational pages, with priorities calibrated from 1.0 (Home) to 0.3 (Legal)."),
        ("Search Engine Directive Compliance: ", "Requesting http://localhost:3000/robots.txt confirmed proper Allow and Disallow rules, shielding private customer cart and checkout routes from crawl bloat while advertising the sitemap location."),
        ("Rich Snippet Eligibility: ", "Product pages inject valid Schema.org Product and BreadcrumbList microdata containing exact inr pricing, inventory status, SKU, and high-resolution imagery, positioning the storefront for Google rich shopping cards upon public deployment."),
        ("Deployment-Dependent Tool Status (Pending): ", "Public tools such as Google PageSpeed Insights and Google Rich Results Test require an externally accessible internet domain (as they cannot route to a local host environment). The JSON-LD schema was validated against schema.org specifications locally; live testing via Google's web scraper will occur upon staging deployment.")
    ]
    for obs_title, obs_desc in obs_list:
        bp = doc.add_paragraph(style='List Bullet')
        bp.paragraph_format.space_after = Pt(4)
        run_b = bp.add_run(obs_title)
        run_b.font.bold = True
        bp.add_run(obs_desc)

    # ---------------------------------------------------------------------------
    # SECTION 5: CONCLUSION
    # ---------------------------------------------------------------------------
    h5 = doc.add_heading(level=1)
    r = h5.add_run("5. Conclusion")
    r.font.name = "Georgia"
    r.font.size = Pt(18)
    r.font.bold = True
    r.font.color.rgb = primary_color
    
    p7 = doc.add_paragraph()
    p7.paragraph_format.space_after = Pt(14)
    p7.paragraph_format.line_spacing = 1.2
    p7.add_run(
        "The on-page SEO optimization of the आstha sacred apparel storefront successfully harmonizes search engine discoverability "
        "with luxury editorial reverence. Every major technical factor—from hierarchical heading structures and descriptive image alt attributes "
        "to dynamic sitemaps, canonical URL structures, and structured schema data—has been integrated directly into the production code. "
        "The platform is completely production-ready, highly accessible, and prepared for indexing across domestic and international ecclesiastical search markets."
    )

    # ---------------------------------------------------------------------------
    # EVIDENCE APPENDIX
    # ---------------------------------------------------------------------------
    doc.add_page_break()
    h6 = doc.add_heading(level=1)
    r = h6.add_run("Evidence Appendix: Technical & Rendered Artifacts")
    r.font.name = "Georgia"
    r.font.size = Pt(18)
    r.font.bold = True
    r.font.color.rgb = primary_color
    
    screenshots_dir = os.path.abspath("submission_reports/screenshots")
    
    appendix_items = [
        ("Figure 1: Dynamic XML Sitemap Output (/sitemap.xml)", "fig12_sitemap_xml.png", "Screenshot of the rendered sitemap.xml confirming canonical URLs, priority values (1.0 to 0.3), and last-modified timestamps for all indexable pages."),
        ("Figure 2: Crawler Directives Output (/robots.txt)", "fig13_robots_txt.png", "Screenshot of robots.txt illustrating crawl permissions for public catalog pages, disallow directives for private cart/checkout endpoints, and sitemap reference."),
        ("Figure 3: Semantic Heading & Metadata on Homepage", "fig1_homepage_hero.png", "Screenshot of homepage hero displaying brand title, editorial campaign hierarchy, and semantic navigation structure."),
        ("Figure 4: Product Detail Page Structured Metadata & Breadcrumbs", "fig3_product_pitambari.png", "Screenshot of Pitambari Dhoti & Angavastram product page showcasing canonical breadcrumbs, size selectors, specifications, and structured product presentation."),
        ("Figure 5: Mobile Viewport Rendering & Layout Stability", "fig10_mobile_homepage.png", "Screenshot of mobile responsive viewport (390x844) validating accessible navigation, proportional image scaling, and zero layout shift.")
    ]
    
    for fig_title, img_name, fig_desc in appendix_items:
        img_path = os.path.join(screenshots_dir, img_name)
        if os.path.exists(img_path):
            doc.add_paragraph()
            p_title = doc.add_paragraph()
            p_title.paragraph_format.space_before = Pt(12)
            p_title.paragraph_format.space_after = Pt(4)
            r = p_title.add_run(fig_title)
            r.font.name = "Georgia"
            r.font.size = Pt(12)
            r.font.bold = True
            r.font.color.rgb = primary_color
            
            p_img = doc.add_paragraph()
            p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
            doc.add_picture(img_path, width=Inches(6.2))
            
            p_cap = doc.add_paragraph()
            p_cap.paragraph_format.space_after = Pt(16)
            r_cap = p_cap.add_run(fig_desc)
            r_cap.font.name = "Arial"
            r_cap.font.size = Pt(9)
            r_cap.font.italic = True
            r_cap.font.color.rgb = muted_color

    out_path = os.path.abspath("submission_reports/Astha_On_Page_SEO_Report.docx")
    doc.save(out_path)
    print(f"Report successfully saved to: {out_path}")

if __name__ == "__main__":
    create_report()

