import { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavLink = ({ to, children, onClick, className = '' }) => {
	const linkRef = useRef(null)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [isHovered, setIsHovered] = useState(false)
	const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
	const location = useLocation()
	const isActive = location.pathname === to

	const handleMouseMove = (e) => {
		if (!linkRef.current) return

		const rect = linkRef.current.getBoundingClientRect()
		const centerX = rect.left + rect.width / 2
		const centerY = rect.top + rect.height / 2

		// Magnetism - subtle pull toward cursor
		const magnetStrength = 0.15
		const deltaX = (e.clientX - centerX) * magnetStrength
		const deltaY = (e.clientY - centerY) * magnetStrength

		setPosition({ x: deltaX, y: deltaY })

		// Shine position (percentage within button)
		const x = ((e.clientX - rect.left) / rect.width) * 100
		const y = ((e.clientY - rect.top) / rect.height) * 100
		setMousePos({ x, y })
	}

	const handleMouseEnter = () => {
		setIsHovered(true)
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
		setPosition({ x: 0, y: 0 })
		setMousePos({ x: 50, y: 50 })
	}

	const linkStyle = {
		transform: `translate(${position.x}px, ${position.y}px)`,
		transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
	}

	const shineStyle = {
		background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.25) 0%, transparent 50%)`,
		opacity: isHovered ? 1 : 0,
	}

	return (
		<Link
			ref={linkRef}
			to={to}
			onClick={onClick}
			className={`nav-link-interactive relative overflow-hidden ${isActive ? 'nav-link-interactive-active' : ''} ${className}`}
			style={linkStyle}
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{/* Background for active state */}
			<span
				className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-200"
				style={{
					background: 'linear-gradient(135deg, rgba(0, 97, 255, 0.25) 0%, rgba(96, 239, 255, 0.15) 100%)',
					opacity: isActive ? 1 : 0,
				}}
			/>
			{/* Shine effect */}
			<span
				className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-200"
				style={shineStyle}
			/>
			{/* Text */}
			<span className="relative z-10">{children}</span>
		</Link>
	)
}

export default NavLink
