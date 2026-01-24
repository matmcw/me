import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const MagneticButton = ({
	children,
	to,
	href,
	onClick,
	className = '',
	...props
}) => {
	const buttonRef = useRef(null)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [isHovered, setIsHovered] = useState(false)
	const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
	const [borderProgress, setBorderProgress] = useState(0)
	const animationRef = useRef(null)

	// Reset border progress when hover ends
	useEffect(() => {
		if (!isHovered) {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
				animationRef.current = null
			}
			setBorderProgress(0)
		}
	}, [isHovered])

	const handleMouseMove = (e) => {
		if (!buttonRef.current) return

		const rect = buttonRef.current.getBoundingClientRect()
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
		setBorderProgress(0)

		// Animate border drawing
		const startTime = performance.now()
		const duration = 280

		const animate = (currentTime) => {
			const elapsed = currentTime - startTime
			const progress = Math.min(elapsed / duration, 1)
			setBorderProgress(progress)

			if (progress < 1) {
				animationRef.current = requestAnimationFrame(animate)
			}
		}

		animationRef.current = requestAnimationFrame(animate)
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
		setPosition({ x: 0, y: 0 })
		setMousePos({ x: 50, y: 50 })
	}

	const buttonStyle = {
		transform: `translate(${position.x}px, ${position.y}px) scale(${isHovered ? 1.05 : 1})`,
		transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
	}

	const shineStyle = {
		background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)`,
		opacity: isHovered ? 1 : 0,
	}

	// Calculate border gradient - starts from top-left corner
	// 315deg (or -45deg) points to top-left from center
	const getBorderGradient = () => {
		if (borderProgress === 0) {
			return 'transparent'
		}

		const perimeterProgress = borderProgress * 100

		return `conic-gradient(from 287.5deg at 50% 50%,
			#0061FF 0%,
			#60EFFF ${perimeterProgress * 0.5}%,
			#0061FF ${perimeterProgress}%,
			transparent ${perimeterProgress}%)`
	}

	const content = (
		<>
			{/* Gradient border layer - masked to only show border */}
			<span
				className="absolute inset-0 rounded-xl pointer-events-none"
				style={{
					background: getBorderGradient(),
					WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
					WebkitMaskComposite: 'xor',
					mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
					maskComposite: 'exclude',
					padding: '2px',
				}}
			/>
			{/* Inner background - solid black with subtle gradient overlay */}
			<span
				className="absolute inset-[2px] rounded-[10px] pointer-events-none"
				style={{ background: '#000000' }}
			/>
			<span
				className="absolute inset-[2px] rounded-[10px] pointer-events-none"
				style={{
					background: 'linear-gradient(135deg, rgba(0, 97, 255, 0.12) 0%, rgba(96, 239, 255, 0.12) 100%)',
				}}
			/>
			{/* Static white border (always visible) */}
			<span className="absolute inset-0 rounded-xl border-2 border-white/30 pointer-events-none" />
			{/* Shine effect */}
			<span
				className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-200"
				style={shineStyle}
			/>
			{/* Text - white for readability */}
			<span className="relative z-10 text-white font-semibold">
				{children}
			</span>
		</>
	)

	const commonProps = {
		ref: buttonRef,
		className: `magnetic-btn relative inline-flex items-center justify-center font-medium text-base px-8 py-4 rounded-xl cursor-pointer overflow-hidden ${className}`,
		style: buttonStyle,
		onMouseMove: handleMouseMove,
		onMouseEnter: handleMouseEnter,
		onMouseLeave: handleMouseLeave,
		...props,
	}

	if (to) {
		return (
			<Link to={to} {...commonProps}>
				{content}
			</Link>
		)
	}

	if (href) {
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
				{content}
			</a>
		)
	}

	return (
		<button onClick={onClick} {...commonProps}>
			{content}
		</button>
	)
}

export default MagneticButton
