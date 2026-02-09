# nBogne Website (Updated)

Updated website with new strategic positioning based on Samuel Darko conversation insights.

## Key Changes

### Messaging Updates
- **Hero**: "Win bids in connectivity-challenged markets" (vendor-focused)
- **Value Prop**: "Your EHR + nBogne = Competitive Advantage"
- **Target Customers**: Research Orgs → Hospital Chains → EMR Vendors → Governments
- **Platform Vision**: "Health is the first vertical" - expansion to law enforcement, voter registers, e-gov
- **Technical Scope**: 5-15 KB records only, medical images → future (mesh/LEO)

### Customer Focus Shift
- From: End-user pain (patients, clinicians)
- To: Client pain (vendors losing bids, $600/month Starlink, ministries going blind)

## Setup

### 1. Formspree Contact Form
The contact form uses Formspree. To route submissions to `tchiosekale6@gmail.com`:

1. Go to [formspree.io](https://formspree.io)
2. Sign up/login with `tchiosekale6@gmail.com`
3. Create a new form
4. Copy the form ID (e.g., `xnnegzqy`)
5. Update `contact.html` line ~82: `action="https://formspree.io/f/YOUR_FORM_ID"`
6. Update `js/main.js` line ~77: same URL

**Current placeholder**: `xnnegzqy` (update this)

### 2. Add Images
Place in `Images/` folder:
- `Logo.png` — Your nBogne logo
- `THierry.png` — Thierry Tchio Sekale photo
- `Alma.png` — Alma photo
- `Africa_CDC_partnership.webp` — Africa image
- Advisor photos: `Nana Kofi.png`, `Yaw.png`, `Ahmed-abubakar.png`, `Benjamin.png`, `Samuel.png`, `Naeem.png`
- Credential logos: `Ashesi.png`, `UC-Berkeley.png`, `KPMG.png`

### 3. Calendly
Already configured to use: `https://calendly.com/tchiosekale6/30min`

### 4. Email Display
- **Displayed**: `tsteve@nbogne.com`
- **Form submissions**: Go to `tchiosekale6@gmail.com` (via Formspree)

## File Structure

```
nbogne-website/
├── index.html          # Home page (updated messaging)
├── solution.html       # How it works (technical scope, partnership model)
├── about.html          # Team & story (platform vision)
├── contact.html        # Contact form (partnership focus)
├── css/
│   └── styles.css      # All styles (unchanged)
├── js/
│   └── main.js         # JavaScript (form handling)
└── Images/             # Add your images here
```

## Deployment

Static site - deploy to:
- **Vercel**: `vercel`
- **Netlify**: Drag and drop
- **GitHub Pages**: Push to repo, enable Pages
- **Any static host**: Upload files
