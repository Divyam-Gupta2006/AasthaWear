import subprocess
import os
import time

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
SCREENSHOTS_DIR = os.path.abspath("submission_reports/screenshots")
PROFILE_DIR = os.path.abspath("submission_reports/temp_profile")
BASE_URL = "http://localhost:3000"

os.makedirs(SCREENSHOTS_DIR, exist_ok=True)
os.makedirs(PROFILE_DIR, exist_ok=True)

targets = [
    # (filename, url_path, width, height, description)
    ("fig1_homepage_hero.png", "/", 1280, 820, "Homepage main hero, branding and navigation"),
    ("fig2_shop_catalogue.png", "/shop", 1280, 840, "Shop page with tradition filters and product grid"),
    ("fig3_product_pitambari.png", "/product/pitambari-dhoti-angavastram", 1280, 860, "Pitambari Dhoti product detail page with specifications"),
    ("fig4_product_cassock.png", "/product/roman-clerical-wool-cassock", 1280, 860, "Roman Clerical Cassock with sizing and canonical tailoring details"),
    ("fig5_shopping_cart.png", "/cart", 1280, 800, "Shopping bag with line item calculations and order summary"),
    ("fig6_checkout_page.png", "/checkout", 1280, 840, "Checkout page with Indian delivery address validation and payment options"),
    ("fig7_about_page.png", "/about", 1280, 820, "About page detailing sacred textile craftsmanship manifesto"),
    ("fig8_contact_page.png", "/contact", 1280, 820, "Contact Atelier inquiry form and concierge desks"),
    ("fig9_faq_page.png", "/faq", 1280, 820, "Frequently Asked Questions with categorized canonical guidance"),
    ("fig10_mobile_homepage.png", "/", 390, 844, "Mobile responsive view of homepage with sticky navigation"),
    ("fig11_mobile_shop.png", "/shop", 390, 844, "Mobile responsive view of shop catalogue and active filter chips"),
    ("fig12_sitemap_xml.png", "/sitemap.xml", 1280, 720, "Rendered dynamic sitemap.xml with canonical URLs and priorities"),
    ("fig13_robots_txt.png", "/robots.txt", 1280, 600, "Rendered robots.txt with disallow directives and sitemap reference")
]

for filename, path, w, h, desc in targets:
    out_file = os.path.join(SCREENSHOTS_DIR, filename)
    url = f"{BASE_URL}{path}"
    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        f"--user-data-dir={PROFILE_DIR}",
        f"--window-size={w},{h}",
        f"--screenshot={out_file}",
        url
    ]
    print(f"Capturing: {filename} ({w}x{h}) from {url}...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(out_file) and os.path.getsize(out_file) > 0:
        print(f" -> SUCCESS: {filename} ({os.path.getsize(out_file)} bytes)")
    else:
        print(f" -> FAILED: {filename}. Stderr: {res.stderr}")

print("All captures completed.")

