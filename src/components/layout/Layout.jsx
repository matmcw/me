import Navbar from './Navbar'
import ParticleBackground from './ParticleBackground'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen relative">
      {/* Particle Background - Always visible on all pages */}
      <ParticleBackground />

      {/* Navbar */}
      <Navbar />

      {/* Main Content - Add top padding to account for fixed header */}
      <main className="relative z-10 pt-24 min-h-screen">
        {children}
      </main>
    </div>
  )
}

export default Layout
