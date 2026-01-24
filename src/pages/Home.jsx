import { useState } from 'react'
import { TypewriterText, MagneticButton, FadeIn } from '../components/ui'

const Home = () => {
	const [typingComplete, setTypingComplete] = useState(false)

	return (
		<div className="page-centered">
			<div className="text-center">
				{/* Main heading with typewriter effect - moves up when buttons appear */}
				<h1
					className={`
						font-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold
						transition-all duration-700 ease-out
						${typingComplete ? 'mb-8 -translate-y-4' : 'mb-12 translate-y-0'}
					`}
				>
					<TypewriterText
						text={"Hey,\nI'm Matthew."}
						speed={65}
						newlinePause={300}
						delay={500}
						onComplete={() => setTypingComplete(true)}
						className="block"
						cursorClassName="h-[0.9em]"
					/>
				</h1>

				{/* Buttons that fade in when typing completes */}
				<FadeIn
					show={typingComplete}
					delay={0}
					duration={600}
					direction="up"
					className="flex flex-wrap items-center justify-center gap-8 -mt-2"
				>
					<MagneticButton to="/about">
						About Me
					</MagneticButton>
					<MagneticButton to="/projects">
						My Stuff
					</MagneticButton>
					<MagneticButton to="/contact">
						Contact
					</MagneticButton>
				</FadeIn>
			</div>
		</div>
	)
}

export default Home
