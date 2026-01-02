import { useState, useEffect, useRef, useCallback } from 'react'
import ProjectCard from './ProjectCard'

const ProjectCarousel = ({ projects }) => {
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)
  const dragStart = useRef({ x: 0, y: 0 })
  const dragAccumulator = useRef(0)

  // Create exactly 10 cards (duplicate first 2 if needed)
  const cards = projects.length >= 10
    ? projects.slice(0, 10)
    : [...projects, ...projects.slice(0, 10 - projects.length)]
  const cardCount = 10
  const anglePerCard = 36 // 360/10 = 36° between each card
  const scrollThreshold = 60
  const radius = 520 // About half screen width, 20% larger

  // Get the index of the center card based on current rotation
  const getCenterIndex = useCallback(() => {
    let normalizedRotation = ((rotation % 360) + 360) % 360
    const index = Math.round(normalizedRotation / anglePerCard) % cardCount
    return index
  }, [rotation, anglePerCard, cardCount])

  const targetRotationRef = useRef(0) // Track where we're heading
  const snapTimeoutRef = useRef(null)

  // Rotate to a specific target (smooth, can be updated mid-animation)
  const rotateTo = useCallback((targetSteps) => {
    // Calculate target rotation based on steps from current target
    const newTarget = targetRotationRef.current + targetSteps * anglePerCard
    targetRotationRef.current = newTarget
    setRotation(newTarget)

    // Clear existing snap timeout
    if (snapTimeoutRef.current) {
      clearTimeout(snapTimeoutRef.current)
    }

    // After scrolling stops, snap to nearest card
    snapTimeoutRef.current = setTimeout(() => {
      const snappedRotation = Math.round(targetRotationRef.current / anglePerCard) * anglePerCard
      targetRotationRef.current = snappedRotation
      setRotation(snappedRotation)
    }, 500)
  }, [anglePerCard])

  // Handle wheel scroll - works anywhere on the page
  useEffect(() => {
    const handleWheel = (e) => {
      // Only handle if we're on the projects page (carousel is mounted)
      e.preventDefault()

      if (Math.abs(e.deltaY) > scrollThreshold / 2) {
        const direction = e.deltaY > 0 ? 1 : -1
        rotateTo(direction)
      }
    }

    // Listen on document so scrolling works anywhere
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

    // Calculate how many cards to move based on drag distance
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
      // Calculate shortest path to this card
      let diff = index - centerIndex
      if (diff > cardCount / 2) diff -= cardCount
      if (diff < -cardCount / 2) diff += cardCount
      rotateTo(diff)
    }
  }

  // Calculate card position and style
  const getCardStyle = (index) => {
    const normalizedRotation = ((rotation % 360) + 360) % 360
    const cardAngle = index * anglePerCard
    let offsetAngle = cardAngle - normalizedRotation

    // Normalize to -180 to 180
    while (offsetAngle > 180) offsetAngle -= 360
    while (offsetAngle < -180) offsetAngle += 360

    const angleRad = (offsetAngle * Math.PI) / 180

    // Position on circle
    const x = Math.sin(angleRad) * radius
    const z = Math.cos(angleRad) * radius - radius

    // Scale - front cards full size, back cards smaller
    const depthFactor = (z + radius) / (2 * radius)
    const scale = 0.7 + depthFactor * 0.3

    // Opacity - front 5 cards visible, back 5 faded
    const absAngle = Math.abs(offsetAngle)
    const isFrontFacing = absAngle <= 90
    const opacity = isFrontFacing ? 0.6 + depthFactor * 0.4 : 0.35

    // Z-index based on depth
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

  // Check if card is one of the front 3 (center or adjacent)
  const isFrontThree = (offsetAngle) => Math.abs(offsetAngle) <= 40

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: '1200px' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={isDragging ? handleTouchMove : undefined}
      onMouseUp={handleTouchEnd}
      onMouseLeave={isDragging ? handleTouchEnd : undefined}
    >
      {/* Carousel container - centered */}
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
            />
          )
        })}
      </div>

    </div>
  )
}

export default ProjectCarousel
