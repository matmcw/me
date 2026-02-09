import { useState, useEffect, useRef, useCallback } from 'react'
import ProjectCard from './ProjectCard'

const ProjectCarousel = ({ projects }) => {
	const [rotation, setRotation] = useState(0)
	const [isDragging, setIsDragging] = useState(false)
	const containerRef = useRef(null)
	const dragStart = useRef({ x: 0, y: 0 })
	const dragAccumulator = useRef(0)

	// Dynamic sizing based on available space
	const [dimensions, setDimensions] = useState({
		cardHeight: 480,
		cardWidth: 336,
		radius: 520,
		perspective: 1200,
	})

	useEffect(() => {
		const updateDimensions = () => {
			if (!containerRef.current) return
			const containerHeight = containerRef.current.clientHeight
			const containerWidth = containerRef.current.clientWidth

			const rawCardHeight = containerHeight * 0.82
			const cardHeight = Math.max(400, Math.min(720, rawCardHeight))
			let cardWidth = cardHeight * 0.7

			const maxWidth = containerWidth * 0.35
			if (cardWidth > maxWidth) {
				cardWidth = maxWidth
			}
			const finalCardHeight = cardWidth / 0.7

			const radius = cardWidth * 1.55
			const perspective = radius * 2.3

			setDimensions({
				cardHeight: finalCardHeight,
				cardWidth,
				radius,
				perspective,
			})
		}

		updateDimensions()

		const observer = new ResizeObserver(updateDimensions)
		if (containerRef.current) {
			observer.observe(containerRef.current)
		}

		return () => observer.disconnect()
	}, [])

	// Create exactly 10 cards (duplicate first 2 if needed)
	const cards = projects.length >= 10
		? projects.slice(0, 10)
		: [...projects, ...projects.slice(0, 10 - projects.length)]
	const cardCount = 10
	const anglePerCard = 36 // 360/10 = 36° between each card
	const scrollThreshold = 60

	// Get the index of the center card based on current rotation
	const getCenterIndex = useCallback(() => {
		let normalizedRotation = ((rotation % 360) + 360) % 360
		const index = Math.round(normalizedRotation / anglePerCard) % cardCount
		return index
	}, [rotation, anglePerCard, cardCount])

	const targetRotationRef = useRef(0)
	const snapTimeoutRef = useRef(null)

	// Rotate to a specific target (smooth, can be updated mid-animation)
	const rotateTo = useCallback((targetSteps) => {
		const newTarget = targetRotationRef.current + targetSteps * anglePerCard
		targetRotationRef.current = newTarget
		setRotation(newTarget)

		if (snapTimeoutRef.current) {
			clearTimeout(snapTimeoutRef.current)
		}

		snapTimeoutRef.current = setTimeout(() => {
			const snappedRotation = Math.round(targetRotationRef.current / anglePerCard) * anglePerCard
			targetRotationRef.current = snappedRotation
			setRotation(snappedRotation)
		}, 500)
	}, [anglePerCard])

	// Handle wheel scroll - works anywhere on the page
	useEffect(() => {
		const handleWheel = (e) => {
			e.preventDefault()

			if (Math.abs(e.deltaY) > scrollThreshold / 2) {
				const direction = e.deltaY > 0 ? 1 : -1
				rotateTo(direction)
			}
		}

		document.addEventListener('wheel', handleWheel, { passive: false })
		return () => {
			document.removeEventListener('wheel', handleWheel)
			if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current)
		}
	}, [rotateTo])

	// Touch/drag handlers
	const handleTouchStart = (e) => {
		setIsDragging(true)
		const touch = e.touches ? e.touches[0] : e
		dragStart.current = { x: touch.clientX, y: touch.clientY }
		dragAccumulator.current = 0
	}

	const handleTouchMove = (e) => {
		if (!isDragging) return
		const touch = e.touches ? e.touches[0] : e
		const deltaX = touch.clientX - dragStart.current.x
		dragAccumulator.current = deltaX
	}

	const handleTouchEnd = () => {
		if (!isDragging) return
		setIsDragging(false)

		const dragThreshold = 80
		const steps = Math.round(dragAccumulator.current / -dragThreshold)

		if (steps !== 0) {
			rotateTo(steps)
		}

		dragAccumulator.current = 0
	}

	// Handle card click
	const handleCardClick = (project, index) => {
		const centerIndex = getCenterIndex()

		if (index === centerIndex) {
			window.open(project.url, '_blank')
		} else {
			let diff = index - centerIndex
			if (diff > cardCount / 2) diff -= cardCount
			if (diff < -cardCount / 2) diff += cardCount
			rotateTo(diff)
		}
	}

	// Calculate card position and style
	const getCardStyle = (index) => {
		const { radius } = dimensions
		const normalizedRotation = ((rotation % 360) + 360) % 360
		const cardAngle = index * anglePerCard
		let offsetAngle = cardAngle - normalizedRotation

		while (offsetAngle > 180) offsetAngle -= 360
		while (offsetAngle < -180) offsetAngle += 360

		const angleRad = (offsetAngle * Math.PI) / 180

		const x = Math.sin(angleRad) * radius
		const z = Math.cos(angleRad) * radius - radius

		const depthFactor = (z + radius) / (2 * radius)
		const scale = 0.7 + depthFactor * 0.3

		const absAngle = Math.abs(offsetAngle)
		const isFrontFacing = absAngle <= 90
		const opacity = isFrontFacing ? 0.6 + depthFactor * 0.4 : 0.35

		const zIndex = Math.round((z + radius) * 10)

		return {
			style: {
				transform: `
					translate(calc(-50% + ${x}px), -50%)
					translateZ(${z}px)
					scale(${scale})
					rotateY(${offsetAngle}deg)
				`,
				opacity,
				zIndex,
			},
			offsetAngle,
		}
	}

	const isFrontThree = (offsetAngle) => Math.abs(offsetAngle) <= 40

	return (
		<div
			ref={containerRef}
			className="relative w-full h-full flex items-center justify-center"
			style={{ perspective: `${dimensions.perspective}px` }}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
			onMouseDown={handleTouchStart}
			onMouseMove={isDragging ? handleTouchMove : undefined}
			onMouseUp={handleTouchEnd}
			onMouseLeave={isDragging ? handleTouchEnd : undefined}
		>
			<div
				className="relative"
				style={{
					transformStyle: 'preserve-3d',
				}}
			>
				{cards.map((project, index) => {
					const { style, offsetAngle } = getCardStyle(index)
					return (
						<ProjectCard
							key={`${project.id}-${index}`}
							project={project}
							enableHover={isFrontThree(offsetAngle)}
							onClick={() => handleCardClick(project, index)}
							style={style}
							rotationAngle={offsetAngle}
							cardWidth={dimensions.cardWidth}
							cardHeight={dimensions.cardHeight}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default ProjectCarousel
