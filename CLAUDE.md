# Portfolio Website - Project Instructions

## Project Overview

A personal portfolio website for **Matthew McWilliams** built with React and Vite. The site is fully static (no backend) for GitHub Pages hosting. Features a dark theme with purple/blue glassmorphism aesthetic, interactive particle background, and a polished 3D carousel showcase for projects.

**Project Size**: Large - requires detailed planning, version control, and comprehensive documentation.

---

## Tech Stack

- **Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS (or CSS Modules if better suited)
- **Build Output**: Static files for GitHub Pages deployment
- **No external backend** - all data is local/static

---

## Design System

### Color Palette
Based on the particle effect reference, use these as the foundation:
- **Primary Blue**: `#6274e7`
- **Primary Purple**: `#8752a3`
- **Background Dark**: `#0b0f1a`, `#070913`, `#05060f`
- **Glass overlay**: `rgba(255, 255, 255, 0.06)` with blur
- **Text**: White/light gray for contrast

### Typography
- Use a modern, techy font (e.g., Inter, JetBrains Mono, or similar)
- Clean, minimal, professional aesthetic
- Monospace elements where appropriate for developer feel

### Background
Apply this gradient on all pages:
```css
background: radial-gradient(1200px 800px at 20% 15%, rgba(98, 116, 231, 0.55), transparent 60%),
            radial-gradient(1000px 700px at 80% 25%, rgba(135, 82, 163, 0.55), transparent 60%),
            radial-gradient(900px 650px at 50% 85%, rgba(98, 116, 231, 0.35), transparent 60%),
            linear-gradient(135deg, #0b0f1a 0%, #070913 40%, #05060f 100%);
```

With frosted glass overlay:
```css
background: rgba(255, 255, 255, 0.06);
backdrop-filter: blur(18px) saturate(140%);
```

---

## Particle Background System

Implement the interactive particle canvas on **every page**. Reference implementation from `bg-effect.html`:

### Particle Specifications
- **Count**: ~80 particles
- **Size range**: 1-3px radius
- **Colors**: Interpolate between `#6274e7` and `#8752a3`
- **Link distance**: 150px (draw lines between nearby particles)
- **Link opacity**: 0.4, fading with distance
- **Dot opacity**: 0.5

### Mouse Interaction
- **Repulse distance**: 260px
- **Repulse strength**: 850
- Particles push away from cursor smoothly
- **Click**: Spawns 4 burst particles at click location

### Technical Requirements
- Use HTML Canvas for performance
- Handle window resize with device pixel ratio
- Particles wrap around screen edges
- Gentle color drift animation over time
- Cap velocity to prevent explosion (`maxV = 2600`)

---

## Site Structure

### Header/Navbar (All Pages)
- **Left side**: "Matthew McWilliams" as styled text logo (links to home)
- **Right side**: Navigation buttons
- **Behavior**: Static (scrolls with page)
- **Nav links**: Home, About, My Stuff, Contact
- **Button style**: Styled buttons with simple hover effect (color change, subtle glow, or similar)
- **Mobile**: Hamburger menu
- **CRITICAL**: Content must NEVER overlap the header - ensure proper spacing/z-index

### Page 1: Welcome/Home
**Route**: `/` or `/home`

**Content**:
- Large centered text: "Hey,\nI'm Matthew."
- Typewriter animation effect:
  - Characters appear one at a time at typing speed (quick but deliberate, ~50-80ms per character)
  - Cursor (blinking pipe `|`) appears AFTER text, NOT during typing
  - Cursor only starts blinking after typing completes
  - Mimics real computer terminal behavior

**After Animation**:
- Brief pause (~500ms)
- Buttons fade in AND slide up from below
- Buttons match navbar navigation (About, My Stuff, Contact)

### Page 2: About Me
**Route**: `/about`

**Content**:
1. **Bio Section**:
   - Paragraph with placeholder text about Matthew
   - Professional but approachable tone

2. **Interest Tiles** (7 total):
   - Programming
   - Gaming
   - Travel
   - 3D Printing
   - AI
   - Metal/Rock (music)
   - Rubik's Cubes

   Each tile has:
   - Relevant icon
   - Title
   - Brief description

   **Layout**: Visually appealing grid or masonry - designer discretion

3. **GitHub Link**:
   - Display differently from interest tiles (special callout, icon button, or bio section placement)
   - Links to: `https://github.com/matmcw`

### Page 3: My Stuff (Projects) - MOST IMPORTANT PAGE
**Route**: `/projects` or `/my-stuff`

This is the **flagship page** - must be the most polished with smooth, clean animations.

#### 3D Carousel Implementation

**Visual Layout**:
- 5 cards visible at once
- Center card: Faces directly toward viewport (full visibility)
- Inner side cards (2): Rotated away, partially visible
- Edge cards (2): Nearly edge-on, appear as thin lines due to perspective

**Card Design** (2:3 aspect ratio, taller if needed for description):
- **Header section**: Project name (top)
- **Image section**: 1:1 square, project preview image (DO NOT overlap text on image)
- **Footer section**: Project description

**Carousel Behavior**:
- **Scroll**: Rotates carousel (scroll up = rotate left, scroll down = rotate right)
- **Snap**: Snaps to each card position
- **Infinite loop**: Seamlessly wraps from last to first project
- **Touch/swipe**: Mobile-friendly swipe gestures

**Card Hover Effect**:
- 3D tilt based on cursor position
- Hovering bottom-right lifts that corner slightly
- Smooth, subtle perspective transform

**Click Behavior**:
- Clicking non-center card: Rotates that card to center (no navigation)
- Clicking center card: Navigates to project URL
- Project URL priority: Live demo link if exists, otherwise GitHub link

#### Project Data Structure
Store in `src/data/projects.json`:

```json
[
  {
    "id": "unique-id",
    "name": "Project Name",
    "description": "Brief description of the project",
    "image": "/images/projects/project-name.png",
    "url": "https://project-demo-url.com"
  }
]
```

**Image Requirements**:
- Format: PNG or JPG (PNG preferred)
- Aspect ratio: 1:1 (square)
- Location: `public/images/projects/`

**Placeholder Projects**: Include 8 dummy projects with placeholder images for initial setup.

### Page 4: Contact
**Route**: `/contact`

**Content** (simple display, no form):
- Email: `matmcw@proton.me`
- GitHub: `https://github.com/matmcw`

Style consistently with site aesthetic. Can use icons alongside text.

---

## Responsive Design

### Desktop
- Full navigation bar with text buttons
- 5-card carousel view
- Standard tile grid for About page

### Mobile
- Hamburger menu for navigation
- Carousel becomes swipe-friendly
- Tiles stack appropriately
- All interactions touch-optimized

---

## Browser Tab / Metadata

- **Title**: "Matthew McWilliams"
- **Favicon**: Custom icon (create simple icon matching site aesthetic)
- **No SEO requirements** - skip meta descriptions

---

## File Structure

```
Portfolio/
├── public/
│   ├── favicon.svg (or .ico)
│   └── images/
│       └── projects/
│           ├── placeholder-1.png
│           ├── placeholder-2.png
│           └── ... (8 placeholder images)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ParticleBackground.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── TypewriterText.jsx
│   │   │   └── InterestTile.jsx
│   │   └── projects/
│   │       ├── ProjectCarousel.jsx
│   │       └── ProjectCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── data/
│   │   └── projects.json
│   ├── styles/
│   │   └── (global styles, tailwind config, etc.)
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js (if using Tailwind)
└── CLAUDE.md
```

---

## Implementation Priority

1. **Setup**: Vite + React project, routing, base structure
2. **Particle Background**: Port from `bg-effect.html` to React component
3. **Layout**: Header, navigation, page wrapper with proper spacing
4. **Home Page**: Typewriter animation with button reveal
5. **Projects Page**: 3D carousel (most complex, most important)
6. **About Page**: Bio section, interest tiles, GitHub link
7. **Contact Page**: Simple contact info display
8. **Mobile Responsiveness**: Hamburger menu, touch interactions
9. **Polish**: Animations, transitions, final styling touches

---

## Animation Guidelines

- All animations should be smooth (use CSS transitions or Framer Motion)
- Avoid jarring or abrupt movements
- Carousel should feel fluid and responsive
- Typewriter effect should feel natural, like actual typing
- Button hover effects should be subtle but noticeable

---

## GitHub Pages Deployment

Ensure Vite is configured for static output:

```js
// vite.config.js
export default defineConfig({
  base: '/', // or '/repo-name/' if not using custom domain
  build: {
    outDir: 'dist'
  }
})
```

Build command: `npm run build`
Output: `dist/` folder contains static files for deployment

---

## Adding New Projects

To add a new project:

1. Add square image (1:1, PNG/JPG) to `public/images/projects/`
2. Edit `src/data/projects.json`:
```json
{
  "id": "new-project",
  "name": "New Project Name",
  "description": "Description of the project",
  "image": "/images/projects/new-project.png",
  "url": "https://link-to-project.com"
}
```
3. Rebuild and deploy

---

## Reference Files

- `bg-effect.html` - Original particle effect implementation (port to React)

---

## Notes

- This is a large project requiring version control (git commits for meaningful changes)
- Prioritize the Projects page carousel - it's the centerpiece
- Keep code clean and maintainable
- Test all animations for smoothness
- Ensure header never overlaps with content
