import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from '../ui'

const navLinks = [
	{ path: '/', label: 'Home' },
	{ path: '/about', label: 'About' },
	{ path: '/projects', label: 'My Stuff' },
	{ path: '/contact', label: 'Contact' },
]

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isVisible, setIsVisible] = useState(true)
	const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 })
	const [isLogoHovered, setIsLogoHovered] = useState(false)
	const logoRef = useRef(null)

	useEffect(() => {
		const handleScroll = () => {
			setIsVisible(window.scrollY < 50)
		}

		window.addEventListener('scroll', handleScroll)
		handleScroll()

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
	const closeMenu = () => setIsMenuOpen(false)

	const handleLogoMouseMove = (e) => {
		if (!logoRef.current) return
		const rect = logoRef.current.getBoundingClientRect()
		const centerX = rect.left + rect.width / 2
		const centerY = rect.top + rect.height / 2
		const magnetStrength = 0.15
		setLogoPosition({
			x: (e.clientX - centerX) * magnetStrength,
			y: (e.clientY - centerY) * magnetStrength,
		})
	}

	const handleLogoMouseEnter = () => setIsLogoHovered(true)
	const handleLogoMouseLeave = () => {
		setIsLogoHovered(false)
		setLogoPosition({ x: 0, y: 0 })
	}

	return (
		<header className={`absolute top-0 left-0 right-0 z-50 p-3 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
			<nav className="navbar-card">
				<div className="w-full px-6 md:px-8 py-3">
					<div className="flex items-center justify-between">
						{/* Logo */}
						<Link
							ref={logoRef}
							to="/"
							className="logo"
							onClick={closeMenu}
							onMouseMove={handleLogoMouseMove}
							onMouseEnter={handleLogoMouseEnter}
							onMouseLeave={handleLogoMouseLeave}
							style={{
								transform: `translate(${logoPosition.x}px, ${logoPosition.y}px)`,
								transition: isLogoHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
							}}
						>
							<span className="logo-text">Matthew McWilliams</span>
						</Link>

						{/* Desktop Navigation */}
						<div className="hidden md:flex items-center gap-2">
							{navLinks.map((link) => (
								<NavLink
									key={link.path}
									to={link.path}
								>
									{link.label}
								</NavLink>
							))}
						</div>

						{/* Mobile Menu Button */}
						<button
							className="hamburger md:hidden"
							onClick={toggleMenu}
							aria-label="Toggle menu"
						>
							<div className="w-6 h-5 relative flex flex-col justify-between">
								<span className={`hamburger-line ${isMenuOpen ? 'open-top' : ''}`} />
								<span className={`hamburger-line ${isMenuOpen ? 'open-middle' : ''}`} />
								<span className={`hamburger-line ${isMenuOpen ? 'open-bottom' : ''}`} />
							</div>
						</button>
					</div>

					{/* Mobile Menu */}
					<div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 mt-4' : 'max-h-0'}`}>
						<div className="flex flex-col gap-2 pb-2">
							{navLinks.map((link) => (
								<NavLink
									key={link.path}
									to={link.path}
									onClick={closeMenu}
									className="nav-link-mobile-interactive"
								>
									{link.label}
								</NavLink>
							))}
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Navbar
