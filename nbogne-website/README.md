# nBogne Website

Clean, professional website for nBogne.

## Setup

1. Add your images (see below)
2. Set up your Calendly link (currently `https://calendly.com/nbogne/30min`)
3. Deploy to your hosting

## Required Images

### Logo & Favicon
- `images/logo.png` — Your nBogne logo (recommend: 180x40 or similar)
- `images/favicon.png` — 32x32 favicon

### Team Photos (About page)
Place in `images/team/`:
- `thierry.jpg` — Thierry Tchio Sekale (recommend: 400x400, square)
- `delvin.jpg` — Delvin Marimo
- `nana-kofi.jpg` — Nana Kofi Quakyi
- `yaw.jpg` — Yaw Asare-Aboagye
- `emmanuel.jpg` — Emmanuel Mills
- `benjamin.jpg` — Benjamin Kyeremeh Oppong
- `samuel.jpg` — Samuel Darko
- `naeem.jpg` — Naeem Zafar

### Company Logos (About page - credentials)
Place in `images/logos/`:
- `ashesi.png` — Ashesi University logo (recommend: height 28px)
- `berkeley.png` — UC Berkeley logo
- `kpmg.png` — KPMG logo
- `amazon.png` — Amazon logo
- `siemens.png` — Siemens logo

## Calendly Setup

1. Create a Calendly account if you don't have one
2. Create a 30-minute meeting type
3. Replace `https://calendly.com/nbogne/30min` in all HTML files with your actual Calendly link

Search for `calendly.com/nbogne` to find all instances.

## Contact Form

The form uses Formspree. Current endpoint: `https://formspree.io/f/xnnegzqy`

To use your own:
1. Create a free Formspree account
2. Create a new form
3. Replace the action URL in `contact.html`

## File Structure

```
nbogne-website/
├── index.html          # Home page
├── solution.html       # How it works
├── about.html          # Team & story
├── contact.html        # Contact form
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # Minimal JavaScript
└── images/
    ├── logo.png
    ├── favicon.png
    ├── team/
    │   ├── thierry.jpg
    │   ├── delvin.jpg
    │   └── ...
    └── logos/
        ├── ashesi.png
        ├── berkeley.png
        └── ...
```

## Colors Used

```css
--color-primary: #1a2b3c;      /* Deep navy - headings */
--color-secondary: #0f766e;    /* Teal - buttons, accents */
--color-text: #1e293b;         /* Body text */
--color-text-light: #475569;   /* Secondary text */
```

## Deployment

This is a static site. Deploy to:
- **Vercel**: `vercel`
- **Netlify**: Drag and drop folder
- **GitHub Pages**: Push to repo, enable Pages
- **Any static host**: Upload files

## Notes

- No external CSS frameworks (Tailwind, Bootstrap)
- Single CSS file for simplicity
- Minimal JavaScript (~80 lines)
- Mobile responsive
- Calendly popup integration ready
- Formspree form integration ready
