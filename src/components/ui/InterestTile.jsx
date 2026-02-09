import { useRef, useState } from 'react'

const InterestTile = ({ icon, title, description, className = '' }) => {
	const tileRef = useRef(null)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [rotation, setRotation] = useState({ x: 0, y: 0 })
	const [isHovered, setIsHovered] = useState(false)
	const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

	const handleMouseMove = (e) => {
		if (!tileRef.current) return

		const rect = tileRef.current.getBoundingClientRect()
		const centerX = rect.left + rect.width / 2
		const centerY = rect.top + rect.height / 2

		// Magnetism - translate toward cursor
		const magnetStrength = 0.15
		setPosition({
			x: (e.clientX - centerX) * magnetStrength,
			y: (e.clientY - centerY) * magnetStrength,
		})

		// 3D tilt - rotate to face cursor
		const maxTilt = 5
		const tiltX = -((e.clientY - centerY) / (rect.height / 2)) * maxTilt
		const tiltY = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt
		setRotation({ x: tiltX, y: tiltY })

		// Shine position
		const x = ((e.clientX - rect.left) / rect.width) * 100
		const y = ((e.clientY - rect.top) / rect.height) * 100
		setMousePos({ x, y })
	}

	const handleMouseEnter = () => setIsHovered(true)

	const handleMouseLeave = () => {
		setIsHovered(false)
		setPosition({ x: 0, y: 0 })
		setRotation({ x: 0, y: 0 })
		setMousePos({ x: 50, y: 50 })
	}

	const tileStyle = {
		transform: `perspective(600px) translate(${position.x}px, ${position.y}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
		transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
	}

	const shineStyle = {
		background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
		opacity: isHovered ? 1 : 0,
	}

	return (
		<div
			ref={tileRef}
			className={`interest-tile relative overflow-hidden ${className}`}
			style={tileStyle}
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{/* Shine overlay */}
			<span
				className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-200"
				style={shineStyle}
			/>
			<div className="relative z-10">
				<div className="interest-tile-icon">{icon}</div>
				<h3 className="interest-tile-title">{title}</h3>
				<p className="interest-tile-description">{description}</p>
			</div>
		</div>
	)
}

export default InterestTile
