import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
	{ path: '/', label: 'Home' },
	{ path: '/about', label: 'About' },
	{ path: '/projects', label: 'My Stuff' },
	{ path: '/contact', label: 'Contact' },
]

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const location = useLocation()

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
	const closeMenu = () => setIsMenuOpen(false)

	return (
		<header className="fixed top-0 left-0 right-0 z-50">
			<nav className="glass">
				<div className="w-full px-8 md:px-12 lg:px-16 py-4">
					<div className="flex items-center justify-between">
						{/* Logo */}
						<Link to="/" className="logo" onClick={closeMenu}>
							<span className="logo-text">Matthew McWilliams</span>
						</Link>

						{/* Desktop Navigation */}
						<div className="hidden md:flex items-center gap-2">
							{navLinks.map((link) => (
								<Link
									key={link.path}
									to={link.path}
									className={`nav-link ${location.pathname === link.path ? 'nav-link-active' : ''}`}
								>
									{link.label}
								</Link>
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
						<div className="flex flex-col gap-2 pb-4">
							{navLinks.map((link) => (
								<Link
									key={link.path}
									to={link.path}
									onClick={closeMenu}
									className={`nav-link-mobile ${location.pathname === link.path ? 'nav-link-active' : ''}`}
								>
									{link.label}
								</Link>
							))}
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Navbar
