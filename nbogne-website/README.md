# nBogne Website — 2026 Redesign

Cellular-first data transmission layer for Africa's health systems.

## Key Positioning

- **Framing**: Infrastructure gap (not interoperability)
- **Problem**: Systems go blind (not offline-first)
- **Solution**: Cellular-first transmission layer (not stateless exchange)
- **Target**: EMR Vendors → Hospital Networks → Research Orgs → Governments

## Setup

### 1. Formspree Contact Form
The contact form uses Formspree to route submissions to `tchiosekale6@gmail.com`:

1. Go to [formspree.io](https://formspree.io)
2. Sign up/login with `tchiosekale6@gmail.com`
3. Create a new form
4. Update `contact.html` and `js/main.js` with your form ID

**Current placeholder**: `xnnegzqy`

### 2. Add Images
Place in `Images/` folder:
- `Logo.png` — nBogne logo
- `THierry.png` — Thierry Tchio Sekale photo
- `Alma.png` — Alma photo
- `Africa_CDC_partnership.webp` — Africa image
- Advisor photos: `Nana Kofi.png`, `Yaw.png`, `Ahmed-abubakar.png`, `Benjamin.png`, `Samuel.png`, `Naeem.png`
- Credential logos: `Ashesi.png`, `UC-Berkeley.png`, `KPMG.png`

### 3. Calendly
Configured: `https://calendly.com/tchiosekale6/30min`

### 4. Email
- **Displayed**: `tsteve@nbogne.com`
- **Form submissions**: Go to `tchiosekale6@gmail.com` via Formspree

## File Structure

```
website/
├── index.html          # Home — positioning, stats, who we serve
├── solution.html       # Technical — how it works, capabilities, security
├── about.html          # Team, story, platform vision, roadmap
├── contact.html        # Contact form, FAQ
├── css/
│   └── styles.css      # Full stylesheet (DM Serif + DM Sans, dark mode)
├── js/
│   └── main.js         # Mobile nav, form handler, scroll effects
└── Images/             # Add your images here
```

## Design

- **Typography**: DM Serif Display (headers), DM Sans (body)
- **Colors**: Teal (#0d9488 / #14b8a6), Navy (#0b1120), warm neutrals
- **Dark mode**: Full support via `data-theme="dark"` attribute
- **Responsive**: Mobile-first, breakpoints at 600px, 768px, 900px

## Deploy

Static site — works with any host:
- **Vercel**: `vercel`
- **Netlify**: Drag and drop
- **GitHub Pages**: Push to repo, enable Pages
