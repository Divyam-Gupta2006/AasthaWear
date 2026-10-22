# आstha — Sacred Clothing & Heritage

A premium e-commerce website dedicated to traditional ceremonial clothing, sacred textiles, and heritage-inspired garments.

## Overview

**आstha** is a modern storefront designed to bring traditional ceremonial clothing to the digital world. The website presents a curated collection of garments for Vedic rituals, meditation, and liturgical use, combining heritage-inspired aesthetics with a contemporary shopping experience.


## Features

- **Product Catalogue** — Browse a curated collection of ceremonial garments and sacred textiles.
- **Product Detail Pages** — Explore product descriptions, materials, pricing, and garment details.
- **Shopping Experience** — Dedicated shopping pages and cart-related routes.
- **Responsive Design** — Designed for desktop and mobile browsing.
- **SEO Foundations** — Page metadata, canonical URLs, sitemap, robots.txt, and structured product data.
- **Informational Pages** — About, FAQ, contact, size guide, care guide, shipping, returns, terms, and privacy.
- **Modern Web Architecture** — Built with Next.js and React.

## Product Collection

The current catalogue includes:

| Product | Price |
|---|---:|
| Pitambari Dhoti & Angavastram | ₹6,499 |
| Roman Clerical Wool Cassock | ₹8,999 |
| Saffron Kasaya Meditation Robe | ₹4,299 |
| Gothic Chasuble with Golden Orphrey | ₹12,500 |
| Ayodhya Raw Khadi Set | ₹3,850 |
| Reversible Liturgical Stole | — |
| Kashi Silk Uttariya | — |

*Prices and availability should be verified against the live website.*

## Tech Stack

- **Framework:** Next.js
- **UI Library:** React
- **Language:** JavaScript and/or TypeScript, depending on the project configuration
- **Package Manager:** npm (or the package manager specified by the lockfile)
- **Deployment:** Configured for a production web deployment

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js — use a version compatible with the project's Next.js version
- npm, or the package manager corresponding to the repository lockfile
- Git

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd astha
```

Replace `<YOUR_REPOSITORY_URL>` with the actual Git repository URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

If the project requires environment variables, create a local environment file:

```bash
Copy-Item .env.example .env.local
```

Add the required values to `.env.local` based on the project's actual configuration.

Do not commit `.env.local` or expose API keys, database credentials, or other secrets.

If the project does not yet have an `.env.example` file, create one containing only the required variable names and safe placeholder values.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

These commands assume the standard Next.js scripts are defined in `package.json`.

## Project Structure

A typical Next.js project may use the following structure. The actual repository may differ depending on its routing and component organization.

```text
astha/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── shop/
│   │   └── product/
│   ├── components/
│   └── lib/
├── .gitignore
├── next.config.ts
├── package.json
├── package-lock.json
└── README.md
```

## SEO

The website includes SEO-related foundations such as:

- Page titles and meta descriptions
- Canonical URLs
- Open Graph and Twitter metadata
- Product and breadcrumb structured data
- XML sitemap
- `robots.txt`

SEO configuration should be validated periodically using Google Search Console and structured-data testing tools.

## Development Workflow

1. Create a feature branch for substantial changes.
2. Implement and test the changes locally.
3. Run the production build before merging.
4. Review environment variables and ensure no secrets are committed.
5. Push the changes to the remote repository and deploy using the configured hosting workflow.

## Security

- Keep environment files and credentials out of version control.
- Never place private API keys in client-side code.
- Validate and sanitize user input wherever applicable.
- Verify payment, authentication, and checkout integrations before enabling them in production.

## Contributing

Contributions and improvements are welcome.

1. Fork or clone the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the application.
5. Submit a pull request describing the changes.

## License

No license has been specified yet. All rights remain with the respective copyright holder unless a license is added to this repository.
