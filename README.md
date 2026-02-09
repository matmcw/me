# Matthew McWilliams Portfolio

A personal portfolio website built with React, Vite, and Tailwind CSS featuring an interactive particle background, smooth animations, and a modern glassmorphism dark theme.

## Features

- **Interactive Aurora Background** - Canvas-based particle system with aurora overlay, mouse repulsion physics, connected particle lines, and click-to-spawn effects
- **DecryptedText Animation** - Scramble-reveal text animation on the home page hero section with hover re-animation
- **3D Project Carousel** - Horizontal snap-scroll gallery with magnetism, 3D tilt, and glow hover effects for showcasing projects
- **MagneticButton / NavLink** - Interactive buttons and nav links with cursor magnetism, animated border, and shine effects
- **Glassmorphism Theme** - Dark theme with blue-cyan gradient accents (Orbitron font) and frosted glass UI elements
- **Mobile Responsive** - Fully responsive layout with hamburger navigation menu for smaller screens
- **Smooth Page Transitions** - Fade-in animations and scroll-based effects throughout

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero section with DecryptedText intro and navigation buttons |
| About | `/about` | Personal bio and interests |
| Projects | `/projects` | Interactive carousel showcase of work |
| Contact | `/contact` | Contact information and links |

## Tech Stack

- **React 18** - UI component library
- **Vite 6** - Build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **React Router 6** - Client-side routing

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### Development

```bash
# Start the dev server
npm run dev
```

The site will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

The static output will be generated in the `dist/` directory.

## Project Structure

```
src/
  components/
    layout/
      Layout.jsx           # Main layout wrapper
      Navbar.jsx           # Navigation with mobile menu
      ParticleBackground.jsx  # Canvas particle system
    projects/
      ProjectCard.jsx      # Individual project card
      ProjectCarousel.jsx  # Horizontal scroll carousel
    ui/
      Button.jsx           # Styled button component
      MagneticButton.jsx   # Interactive button with magnetism and animated border
      NavLink.jsx          # Navbar links with magnetism and shine
      DecryptedText.jsx    # Scramble-reveal text animation
      FadeIn.jsx           # Fade-in animation wrapper
      InterestTile.jsx     # About page interest tiles (magnetism + tilt + glow)
  data/
    projects.json          # Project data
  pages/
    Home.jsx
    About.jsx
    Projects.jsx
    Contact.jsx
  styles/
    index.css              # Tailwind imports and custom styles
```

## Deployment

This site is designed for static hosting on GitHub Pages or similar platforms. The build output is a fully static site with client-side routing.

For GitHub Pages with a custom domain or root path, ensure `vite.config.js` has the correct `base` value.

## License

MIT
