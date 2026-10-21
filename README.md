# LittleVacancy.com

A Next.js 16 travel blog focused on weekend getaways and short trips across North America.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Content:** MDX files (no CMS needed)
- **Language:** TypeScript
- **Deployment:** GitHub Actions → Hostinger

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/littlevacancy.git
cd littlevacancy

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
littlevacancy/
├── content/                # MDX content files
│   ├── articles/          # Travel guides (.mdx)
│   ├── authors/           # Author profiles (.json)
│   ├── categories/        # Trip categories (.json)
│   ├── destinations/      # Destination info (.json)
│   └── hub-cities/        # Departure cities (.json)
├── src/
│   ├── app/               # Next.js App Router pages
│   ├── components/        # React components
│   ├── lib/               # Utilities & content loader
│   └── types/             # TypeScript types
└── public/                # Static assets
```

## Adding Content

### Create a New Article

Create a new `.mdx` file in `content/articles/`:

```mdx
---
title: "Your Article Title"
excerpt: "Short description for cards and SEO"
featuredImage: "https://images.unsplash.com/..."
featuredImageAlt: "Image description"
categorySlug: "weekend-getaways"
destinationSlug: "savannah-ga"
authorSlug: "sarah-chen"
audience: "couples"  # or "family" or "both"
duration: "2-3 days"
publishedAt: "2024-03-15"
tags: ["romantic", "historic"]
faqs:
  - question: "Best time to visit?"
    answer: "Spring and fall offer the best weather."
---

## Getting There

Your content here...

## Where to Stay

More content...
```

### Add a Destination

Create a `.json` file in `content/destinations/`:

```json
{
  "id": "savannah-ga",
  "name": "Savannah",
  "region": "Southeast",
  "country": "USA",
  "description": "Historic charm meets Southern hospitality",
  "featuredImage": "https://images.unsplash.com/...",
  "highlights": ["Historic District", "Forsyth Park"],
  "bestTimeToVisit": "March-May, October-November",
  "averageTripCost": "$400-600 per person"
}
```

### Add a Category

Create a `.json` file in `content/categories/`:

```json
{
  "id": "weekend-getaways",
  "name": "Weekend Getaways",
  "description": "Perfect 2-day escapes",
  "icon": "🌴"
}
```

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#1B3D2F` | Forest Green - Headers, CTAs |
| Secondary | `#E8DDD4` | Warm Sand - Backgrounds |
| Accent | `#E07B54` | Sunset Coral - Links, CTAs |

### Typography

- **Display:** Fraunces (serif)
- **Body:** Plus Jakarta Sans (sans-serif)

## Deployment

### GitHub Actions (Hostinger)

1. Push to GitHub
2. Go to Settings → Secrets → Actions
3. Add secrets:
   - `FTP_HOST`
   - `FTP_USERNAME`
   - `FTP_PASSWORD`
   - `SITE_URL`

4. Push to `main` to trigger deployment

### Manual Build

```bash
npm run build
npm start
```

## SEO Features

- Dynamic sitemap (`/sitemap.xml`)
- Robots.txt configuration
- JSON-LD structured data (Article, FAQ, Breadcrumb)
- OpenGraph and Twitter meta tags

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

Private - All rights reserved.
