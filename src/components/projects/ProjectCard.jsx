import { useRef, useState } from 'react'

const ProjectCard = ({
  project,
  isCenter,
  onClick,
  style,
  className = '',
}) => {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isCenter) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate tilt angles (max ±15 degrees)
    const tiltX = ((y - centerY) / centerY) * -15
    const tiltY = ((x - centerX) / centerX) * 15

    setTilt({ x: tiltX, y: tiltY })
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setTilt({ x: 0, y: 0 })
  }

  const handleClick = (e) => {
    e.stopPropagation()
    onClick?.(project)
  }

  // Calculate the tilt transform for center card hover effect
  const tiltTransform = isCenter && isHovering
    ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
    : ''

  return (
    <div
      ref={cardRef}
      className={`
        absolute
        w-[380px] h-[570px]
        cursor-pointer
        transition-all duration-500 ease-out
        ${className}
      `}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Inner card with tilt effect */}
      <div
        className={`
          w-full h-full
          glass rounded-2xl overflow-hidden
          flex flex-col
          transition-all duration-300 ease-out
          ${isCenter ? 'hover:shadow-2xl hover:shadow-primary-blue/30' : ''}
        `}
        style={{
          transform: tiltTransform,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Header - Project Name */}
        <div className="px-5 py-4 border-b border-white/5">
          <h3 className="text-lg font-semibold text-white truncate">
            {project.name}
          </h3>
        </div>

        {/* Image Section - 1:1 Square */}
        <div className="relative w-full aspect-square bg-dark-200 overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to gradient if image fails to load
              e.target.style.display = 'none'
            }}
          />
          {/* Fallback gradient background */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-primary-purple/20"
            style={{ zIndex: -1 }}
          />
        </div>

        {/* Footer - Description */}
        <div className="flex-1 px-5 py-4 flex flex-col justify-center">
          <p className="text-sm text-white/60 line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Hover indicator for center card */}
        {isCenter && (
          <div className="absolute inset-0 rounded-2xl pointer-events-none">
            <div
              className={`
                absolute inset-0 rounded-2xl
                border-2 border-primary-blue/0
                transition-all duration-300
                ${isHovering ? 'border-primary-blue/50' : ''}
              `}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectCard
