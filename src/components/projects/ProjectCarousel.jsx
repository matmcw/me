import { useState, useEffect, useRef, useCallback } from 'react'
import ProjectCard from './ProjectCard'

const ProjectCarousel = ({ projects }) => {
  const [rotation, setRotation] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)
  const lastScrollY = useRef(0)
  const scrollAccumulator = useRef(0)
  const dragStart = useRef({ x: 0, y: 0 })
  const dragAccumulator = useRef(0)

  const cardCount = projects.length
  const anglePerCard = 360 / cardCount
  const scrollThreshold = 80 // Pixels of scroll before rotating

  // Get the index of the center card based on current rotation
  const getCenterIndex = useCallback(() => {
    // Normalize rotation to 0-360 range
    let normalizedRotation = ((rotation % 360) + 360) % 360
    // Find which card index is closest to front
    const index = Math.round(normalizedRotation / anglePerCard) % cardCount
    return index
  }, [rotation, anglePerCard, cardCount])

  // Snap to nearest card
  const snapToCard = useCallback((targetIndex = null) => {
    setIsAnimating(true)

    let targetRotation
    if (targetIndex !== null) {
      // Snap to specific index
      targetRotation = targetIndex * anglePerCard
    } else {
      // Snap to nearest
      const currentIndex = getCenterIndex()
      targetRotation = currentIndex * anglePerCard
    }

    // Handle wrap-around for smooth animation
    const currentNormalized = ((rotation % 360) + 360) % 360
    let diff = targetRotation - currentNormalized

    // Take the shortest path
    if (diff > 180) diff -= 360
    if (diff < -180) diff += 360

    setRotation(rotation + diff)

    setTimeout(() => setIsAnimating(false), 500)
  }, [rotation, anglePerCard, getCenterIndex])

  // Handle wheel scroll
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e) => {
      e.preventDefault()

      if (isAnimating) return

      scrollAccumulator.current += e.deltaY

      if (Math.abs(scrollAccumulator.current) >= scrollThreshold) {
        const direction = scrollAccumulator.current > 0 ? 1 : -1
        const currentIndex = getCenterIndex()
        const newIndex = (currentIndex + direction + cardCount) % cardCount

        snapToCard(newIndex)
        scrollAccumulator.current = 0
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [isAnimating, getCenterIndex, snapToCard, cardCount])

  // Handle touch/drag for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true)
    const touch = e.touches ? e.touches[0] : e
    dragStart.current = { x: touch.clientX, y: touch.clientY }
    dragAccumulator.current = 0
  }

  const handleTouchMove = (e) => {
    if (!isDragging || isAnimating) return

    const touch = e.touches ? e.touches[0] : e
    const deltaX = touch.clientX - dragStart.current.x
    dragAccumulator.current = deltaX
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    if (Math.abs(dragAccumulator.current) > 50) {
      const direction = dragAccumulator.current > 0 ? -1 : 1
      const currentIndex = getCenterIndex()
      const newIndex = (currentIndex + direction + cardCount) % cardCount
      snapToCard(newIndex)
    } else {
      snapToCard()
    }

    dragAccumulator.current = 0
  }

  // Handle card click
  const handleCardClick = (project, index) => {
    const centerIndex = getCenterIndex()

    if (index === centerIndex) {
      // Navigate to project URL
      window.open(project.url, '_blank')
    } else {
      // Rotate to this card
      snapToCard(index)
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

    // 3D positioning
    const radius = 500 // Distance from center (increased for bigger cards)
    const angleRad = (offsetAngle * Math.PI) / 180

    // Calculate position
    const x = Math.sin(angleRad) * radius
    const z = Math.cos(angleRad) * radius - radius // Offset so center card is at z=0

    // Scale based on z-depth
    const maxZ = radius
    const minScale = 0.5
    const scale = minScale + (1 - minScale) * ((z + radius) / (2 * radius))

    // Opacity based on position (fade edges)
    const absAngle = Math.abs(offsetAngle)
    const opacity = absAngle > 90 ? 0 : 1 - (absAngle / 90) * 0.6

    // Y rotation (cards form a circle, facing outward from carousel center)
    const rotateY = offsetAngle

    // Z-index based on depth
    const zIndex = Math.round((z + radius) * 10)

    return {
      transform: `
        translateX(calc(-50% + ${x}px))
        translateZ(${z}px)
        scale(${scale})
        rotateY(${rotateY}deg)
      `,
      opacity,
      zIndex,
    }
  }

  // Check if card is in center position
  const isCenterCard = (index) => {
    return index === getCenterIndex()
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[650px] overflow-hidden"
      style={{ perspective: '1400px' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={isDragging ? handleTouchMove : undefined}
      onMouseUp={handleTouchEnd}
      onMouseLeave={isDragging ? handleTouchEnd : undefined}
    >
      {/* Carousel container */}
      <div
        className="absolute left-1/2 top-[42%] -translate-y-1/2"
        style={{
          transformStyle: 'preserve-3d',
          transition: isAnimating ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            isCenter={isCenterCard(index)}
            onClick={() => handleCardClick(project, index)}
            style={getCardStyle(index)}
          />
        ))}
      </div>

      {/* Navigation hints */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 text-sm">
        <span>Scroll or swipe to browse</span>
      </div>

      {/* Card indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => snapToCard(index)}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${isCenterCard(index)
                ? 'bg-primary-blue w-6'
                : 'bg-white/30 hover:bg-white/50'
              }
            `}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectCarousel
