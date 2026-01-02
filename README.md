# Matthew McWilliams Portfolio

A personal portfolio website built with React, Vite, and Tailwind CSS featuring an interactive particle background, smooth animations, and a modern glassmorphism dark theme.

## Features

- **Interactive Particle Background** - Canvas-based particle system with mouse repulsion physics, connected particle lines, and click-to-spawn effects
- **Typewriter Animation** - Animated text reveal on the home page hero section
- **3D Project Carousel** - Horizontal snap-scroll gallery with tilt hover effects for showcasing projects
- **Glassmorphism Theme** - Dark theme with purple/blue gradient accents and frosted glass UI elements
- **Mobile Responsive** - Fully responsive layout with hamburger navigation menu for smaller screens
- **Smooth Page Transitions** - Fade-in animations and scroll-based effects throughout

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero section with typewriter intro and navigation buttons |
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
      FadeIn.jsx           # Fade-in animation wrapper
      TypewriterText.jsx   # Typewriter effect component
      InterestTile.jsx     # About page interest tiles
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
