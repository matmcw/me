import { useRef, useState } from 'react'

const InterestTile = ({ icon, title, description, className = '' }) => {
	const tileRef = useRef(null)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [rotation, setRotation] = useState({ x: 0, y: 0 })
	const [isHovered, setIsHovered] = useState(false)

	const handleMouseMove = (e) => {
		if (!tileRef.current) return

		const rect = tileRef.current.getBoundingClientRect()
		const centerX = rect.left + rect.width / 2
		const centerY = rect.top + rect.height / 2

		// Magnetism - translate toward cursor
		const magnetStrength = 0.1
		setPosition({
			x: (e.clientX - centerX) * magnetStrength,
			y: (e.clientY - centerY) * magnetStrength,
		})

		// 3D tilt - rotate to face cursor (positive Z = comes toward you)
		const maxTilt = 8
		const tiltX = -((e.clientY - centerY) / (rect.height / 2)) * maxTilt
		const tiltY = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt
		setRotation({ x: tiltX, y: tiltY })

	}

	const handleMouseEnter = () => setIsHovered(true)

	const handleMouseLeave = () => {
		setIsHovered(false)
		setPosition({ x: 0, y: 0 })
		setRotation({ x: 0, y: 0 })
	}

	const tileStyle = {
		transform: `perspective(600px) translate(${position.x}px, ${position.y}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
		transition: isHovered ? 'transform 0.1s ease-out, box-shadow 0.2s ease-out' : 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
		boxShadow: isHovered ? '0 4px 30px rgba(0, 97, 255, 0.35), 0 0 15px rgba(96, 239, 255, 0.15)' : 'none',
	}

	return (
		<div
			ref={tileRef}
			className={`interest-tile relative ${className}`}
			style={tileStyle}
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className="relative z-10">
				<div className="interest-tile-icon">{icon}</div>
				<h3 className="interest-tile-title">{title}</h3>
				<p className="interest-tile-description">{description}</p>
			</div>
		</div>
	)
}

export default InterestTile
