import { useEffect, useRef } from 'react'
import Aurora from './Aurora'

const ParticleBackground = () => {
	const canvasRef = useRef(null)
	const mouseRef = useRef({ x: 0, y: 0 })
	const particlesRef = useRef([])
	const animationRef = useRef(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		let W = window.innerWidth
		let H = window.innerHeight

		// Color palette endpoints - Blue to Cyan
		const colorA = { r: 0x00, g: 0x61, b: 0xFF } // #0061FF
		const colorB = { r: 0x60, g: 0xEF, b: 0xFF } // #60EFFF

		// Settings
		const settings = {
			count: 80,
			minSize: 1,
			maxSize: 3,
			speed: 40,
			linkDistance: 150,
			linkOpacity: 0.4,
			dotOpacity: 0.5,
			repulseDistance: 200,
			repulseStrength: 800,
			particleRepulseDistance: 50,
			particleRepulseStrength: 30,
		}

		// Utility functions
		const lerp = (a, b, t) => a + (b - a) * t
		const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
		const rand = (min, max) => min + Math.random() * (max - min)

		const colorBetween = (t) => {
			const r = Math.round(lerp(colorA.r, colorB.r, t))
			const g = Math.round(lerp(colorA.g, colorB.g, t))
			const b = Math.round(lerp(colorA.b, colorB.b, t))
			return `rgb(${r},${g},${b})`
		}

		const navbarHeight = 80 // 5rem = 80px

		const resize = () => {
			const dpr = Math.max(1, window.devicePixelRatio || 1)
			W = window.innerWidth
			H = window.innerHeight - navbarHeight
			canvas.width = Math.floor(W * dpr)
			canvas.height = Math.floor(H * dpr)
			canvas.style.width = W + 'px'
			canvas.style.height = H + 'px'
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
		}

		const spawnParticle = (x = rand(0, W), y = rand(0, H), burst = false) => {
			const angle = rand(0, Math.PI * 2)
			const baseSpeed = settings.speed * (burst ? rand(0.6, 1.2) : rand(0.3, 1))
			particlesRef.current.push({
				x,
				y,
				vx: Math.cos(angle) * baseSpeed,
				vy: Math.sin(angle) * baseSpeed,
				baseSpeed,
				r: rand(settings.minSize, settings.maxSize),
				t: Math.random(),
			})
		}

		// Initialize particles
		particlesRef.current = []
		for (let i = 0; i < settings.count; i++) {
			spawnParticle()
		}

		let last = performance.now()

		const step = (now) => {
			const dt = Math.min(0.05, (now - last) / 1000)
			last = now

			ctx.clearRect(0, 0, W, H)

			const particles = particlesRef.current
			const mouse = mouseRef.current

			// Update particles
			for (let i = 0; i < particles.length; i++) {
				const p = particles[i]

				// Mouse repulsion
				const dx = p.x - mouse.x
				const dy = p.y - mouse.y
				const dist = Math.hypot(dx, dy) || 1

				if (dist < settings.repulseDistance) {
					const force = (1 - dist / settings.repulseDistance) * settings.repulseStrength
					p.vx += (dx / dist) * force * dt
					p.vy += (dy / dist) * force * dt
				}

				// Particle-to-particle repulsion (prevents clumping)
				for (let j = i + 1; j < particles.length; j++) {
					const other = particles[j]
					const pdx = p.x - other.x
					const pdy = p.y - other.y
					const pDist = Math.hypot(pdx, pdy) || 1

					if (pDist < settings.particleRepulseDistance) {
						const pForce = (1 - pDist / settings.particleRepulseDistance) * settings.particleRepulseStrength
						const fx = (pdx / pDist) * pForce * dt
						const fy = (pdy / pDist) * pForce * dt
						p.vx += fx
						p.vy += fy
						other.vx -= fx
						other.vy -= fy
					}
				}

				// Move
				p.x += p.vx * dt
				p.y += p.vy * dt

				// Speed management
				const currentSpeed = Math.hypot(p.vx, p.vy)

				if (currentSpeed > p.baseSpeed * 1.1) {
					const dampFactor = 0.97
					p.vx *= dampFactor
					p.vy *= dampFactor
				} else if (currentSpeed < p.baseSpeed * 0.9 && currentSpeed > 0.1) {
					const accelFactor = 1.02
					p.vx *= accelFactor
					p.vy *= accelFactor
				} else if (currentSpeed < 0.1) {
					const newAngle = rand(0, Math.PI * 2)
					p.vx = Math.cos(newAngle) * p.baseSpeed
					p.vy = Math.sin(newAngle) * p.baseSpeed
				}

				// Clamp max velocity
				const maxV = 200
				p.vx = clamp(p.vx, -maxV, maxV)
				p.vy = clamp(p.vy, -maxV, maxV)

				// Wrap around edges
				if (p.x < -10) p.x = W + 10
				if (p.x > W + 10) p.x = -10
				if (p.y < -10) p.y = H + 10
				if (p.y > H + 10) p.y = -10

				// Color drift
				p.t += Math.sin(now / 1000 + p.x * 0.001 + p.y * 0.001) * 0.002
				p.t = clamp(p.t, 0, 1)
			}

			// Draw links
			for (let i = 0; i < particles.length; i++) {
				const a = particles[i]
				for (let j = i + 1; j < particles.length; j++) {
					const b = particles[j]
					const dx = a.x - b.x
					const dy = a.y - b.y
					const d = Math.hypot(dx, dy)

					if (d <= settings.linkDistance) {
						const alpha = settings.linkOpacity * (1 - d / settings.linkDistance)
						ctx.globalAlpha = alpha
						ctx.strokeStyle = 'rgba(255,255,255,0.9)'
						ctx.lineWidth = 1
						ctx.beginPath()
						ctx.moveTo(a.x, a.y)
						ctx.lineTo(b.x, b.y)
						ctx.stroke()
					}
				}
			}

			// Draw particles
			for (const p of particles) {
				ctx.globalAlpha = settings.dotOpacity
				ctx.fillStyle = colorBetween(p.t)
				ctx.beginPath()
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
				ctx.fill()
			}

			ctx.globalAlpha = 1
			animationRef.current = requestAnimationFrame(step)
		}

		// Event handlers
		const handleMouseMove = (e) => {
			mouseRef.current = { x: e.clientX, y: e.clientY }
		}

		const handleClick = (e) => {
			for (let i = 0; i < 4; i++) {
				spawnParticle(e.clientX, e.clientY, true)
			}
		}

		const handleResize = () => {
			resize()
		}

		// Set up
		resize()
		window.addEventListener('resize', handleResize)
		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('click', handleClick)
		animationRef.current = requestAnimationFrame(step)

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize)
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('click', handleClick)
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
			}
		}
	}, [])

	return (
		<div className="fixed left-0 right-0 bottom-0 z-0 pointer-events-none overflow-hidden" style={{ top: '5rem' }}>
			{/* Aurora background - behind everything */}
			<Aurora
				colorStops={['#0061FF', '#60EFFF', '#0061FF']}
				amplitude={0.4}
				blend={0.8}
				speed={0.3}
			/>
			{/* Particles canvas - on top of Aurora */}
			<canvas
				ref={canvasRef}
				className="absolute inset-0 pointer-events-auto"
				style={{ display: 'block' }}
			/>
		</div>
	)
}

export default ParticleBackground
