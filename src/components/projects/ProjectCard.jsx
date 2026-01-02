import { useRef, useState } from 'react'

const ProjectCard = ({
  project,
  enableHover = false, // Enable hover tilt effect for front cards
  onClick,
  style,
  rotationAngle = 0, // The card's rotation relative to front (0 = facing front)
  className = '',
}) => {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // Determine if card is showing its back (facing away from viewer)
  const isShowingBack = Math.abs(rotationAngle) > 90

  const handleMouseMove = (e) => {
    if (!cardRef.current || !enableHover || isShowingBack) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const tiltX = ((y - centerY) / centerY) * -12
    const tiltY = ((x - centerX) / centerX) * 12

    setTilt({ x: tiltX, y: tiltY })
  }

  const handleMouseEnter = () => {
    if (!isShowingBack) setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setTilt({ x: 0, y: 0 })
  }

  const handleClick = (e) => {
    e.stopPropagation()
    if (!isShowingBack) onClick?.(project)
  }

  const tiltTransform = enableHover && isHovering && !isShowingBack
    ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
    : ''

  return (
    <div
      ref={cardRef}
      className={`
        absolute
        w-[336px] h-[480px]
        cursor-pointer
        transition-[transform,opacity] duration-500 ease-out
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
      {/* Card container with 3D flip */}
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: tiltTransform,
        }}
      >
        {/* Front face - shown when facing viewer */}
        <div
          className={`
            absolute inset-0
            glass rounded-2xl overflow-hidden
            flex flex-col
            transition-opacity duration-200
            ${enableHover && !isShowingBack ? 'hover:shadow-2xl hover:shadow-primary-blue/30' : ''}
          `}
          style={{
            backfaceVisibility: 'hidden',
            opacity: isShowingBack ? 0 : 1,
            pointerEvents: isShowingBack ? 'none' : 'auto',
          }}
        >
          {/* Header - Project Name */}
          <div className="px-4 py-3 border-b border-white/5">
            <h3 className="text-base font-semibold text-white truncate">
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
                e.target.style.display = 'none'
              }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-primary-purple/20"
              style={{ zIndex: -1 }}
            />
          </div>

          {/* Footer - Description */}
          <div className="flex-1 px-4 py-3 flex flex-col justify-center">
            <p className="text-sm text-white/60 line-clamp-3 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Hover indicator */}
          {enableHover && !isShowingBack && (
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

        {/* Back face - solid color when facing away */}
        <div
          className={`
            absolute inset-0
            rounded-2xl overflow-hidden
            transition-opacity duration-200
          `}
          style={{
            backfaceVisibility: 'hidden',
            opacity: isShowingBack ? 1 : 0,
            pointerEvents: isShowingBack ? 'auto' : 'none',
          }}
        >
          {/* Solid gradient back */}
          <div className="w-full h-full bg-gradient-to-br from-primary-blue/30 via-primary-purple/20 to-primary-blue/30 backdrop-blur-sm border border-white/10 rounded-2xl">
            {/* Subtle pattern on back */}
            <div className="w-full h-full opacity-30" style={{
              backgroundImage: `radial-gradient(circle at 30% 30%, rgba(98, 116, 231, 0.3) 0%, transparent 50%),
                               radial-gradient(circle at 70% 70%, rgba(135, 82, 163, 0.3) 0%, transparent 50%)`,
            }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
