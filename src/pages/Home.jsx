import { useState } from 'react'
import { DecryptedText, MagneticButton, FadeIn } from '../components/ui'

const Home = () => {
	const [animationComplete, setAnimationComplete] = useState(false)

	return (
		<div className="page-centered">
			<div className="text-center">
				{/* Main heading with decrypted text effect - moves up when buttons appear */}
				<h1
					className={`
						font-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold
						transition-all duration-700 ease-out
						${animationComplete ? 'mb-8 -translate-y-4' : 'mb-12 translate-y-0'}
					`}
				>
					<DecryptedText
						text={"Hey,\nI'm Matthew."}
						speed={60}
						maxIterations={15}
						sequential={true}
						revealDirection="start"
						animateOn="view"
						onComplete={() => setAnimationComplete(true)}
						className="text-white"
						encryptedClassName="text-white/50"
					/>
				</h1>

				{/* Buttons that fade in when animation completes */}
				<FadeIn
					show={animationComplete}
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
