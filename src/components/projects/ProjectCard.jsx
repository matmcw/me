import { useRef, useState } from 'react'

const ProjectCard = ({
	project,
	enableHover = false,
	onClick,
	style,
	rotationAngle = 0,
	className = '',
	cardWidth = 336,
	cardHeight = 480,
}) => {
	const cardRef = useRef(null)
	const [tilt, setTilt] = useState({ x: 0, y: 0 })
	const [isHovering, setIsHovering] = useState(false)

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
			className={`absolute cursor-pointer transition-[transform,opacity] duration-500 ease-out ${className}`}
			style={{
				width: `${cardWidth}px`,
				height: `${cardHeight}px`,
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
				className="relative w-full h-full preserve-3d"
				style={{
					transform: tiltTransform,
					transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
				}}
			>
				{/* Front face */}
				<div
					className="absolute inset-0 project-card flex flex-col backface-hidden transition-opacity duration-200 overflow-hidden"
					style={{
						opacity: isShowingBack ? 0 : 1,
						pointerEvents: isShowingBack ? 'none' : 'auto',
						boxShadow: enableHover && isHovering && !isShowingBack
							? '0 4px 30px rgba(0, 97, 255, 0.35), 0 0 15px rgba(96, 239, 255, 0.15)'
							: 'none',
						transition: 'opacity 0.2s, box-shadow 0.2s ease-out',
					}}
				>
					{/* Header */}
					<div className="project-card-header">
						<h3 className="project-card-title">{project.name}</h3>
					</div>

					{/* Image Section */}
					<div className="project-card-image">
						<img
							src={import.meta.env.BASE_URL + project.image.slice(1)}
							alt={project.name}
							className="w-full h-full object-cover"
							onError={(e) => {
								e.target.style.display = 'none'
							}}
						/>
						<div className="project-card-image-overlay" />
					</div>

					{/* Footer */}
					<div className="project-card-footer">
						<p className="project-card-description">{project.description}</p>
					</div>

					{/* Hover indicator */}
					{enableHover && !isShowingBack && (
						<div className={`project-card-hover-border ${isHovering ? 'active' : ''}`} />
					)}
				</div>

				{/* Back face */}
				<div
					className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden transition-opacity duration-200"
					style={{
						opacity: isShowingBack ? 1 : 0,
						pointerEvents: isShowingBack ? 'auto' : 'none',
					}}
				>
					<div className="project-card-back">
						<div className="project-card-back-pattern" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProjectCard
