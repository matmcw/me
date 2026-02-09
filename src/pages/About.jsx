import { InterestTile, FadeIn, MagneticButton } from '../components/ui'
import { CodeXml, Gamepad2, Plane, Printer, BrainCircuit, Headphones, Puzzle } from 'lucide-react'

const interests = [
	{
		icon: <CodeXml size={36} />,
		title: 'Programming',
		description: 'Building simple webpages, solving problems, and just having fun.',
	},
	{
		icon: <Gamepad2 size={36} />,
		title: 'Gaming',
		description: 'Exploring virtual worlds, stories, and objectives. I play a bit of everything.',
	},
	{
		icon: <Plane size={36} />,
		title: 'Travel',
		description: 'Discovering new places, cultures, and experiences around the world.',
	},
	{
		icon: <Printer size={36} />,
		title: '3D Printing',
		description: 'Creating physical objects from digital designs using FDM and resin printing.',
	},
	{
		icon: <BrainCircuit size={36} />,
		title: 'AI',
		description: 'Creating and experimenting with AI models, tools, and workflows.',
	},
	{
		icon: <Headphones size={36} />,
		title: 'Music',
		description: 'Listening to many different genres, Mostly rock and some metal.',
	},
	{
		icon: <Puzzle size={36} />,
		title: "Rubik's Cubes",
		description: 'I have around 30 cubes in my ever growing collection and I am always getting faster',
	},
]

const About = () => {
	return (
		<div className="page-container">
			{/* Page Title */}
			<FadeIn delay={0} duration={500}>
				<h1 className="page-title-short mb-8">About Me</h1>
			</FadeIn>

			{/* Bio Section */}
			<FadeIn delay={100} duration={500}>
				<div className="card p-8 mb-12">
					<p className="body-text">
						Hi, I'm Matthew McWilliams, a passionate student in the field of computer science. I love working with technology in many different forms to create, learn, and explore new ideas. I enjoy growing my skills and taking on new challenges. I can often be found exploring some of my various interests listed below.
					</p>
				</div>
			</FadeIn>

			{/* Interests Section Title */}
			<FadeIn delay={200} duration={500}>
				<h2 className="section-title mb-6">My Interests</h2>
			</FadeIn>

			{/* Interest Tiles Grid */}
			<div className="flex flex-wrap justify-center gap-4">
				{interests.map((interest, index) => (
					<FadeIn
						key={interest.title}
						delay={300 + index * 75}
						duration={500}
						direction="up"
						className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)] xl:w-[calc(25%-0.75rem)]"
					>
						<InterestTile
							icon={interest.icon}
							title={interest.title}
							description={interest.description}
						/>
					</FadeIn>
				))}
			</div>

			{/* GitHub Link - Special Display */}
			<FadeIn delay={600} duration={500}>
				<div className="mt-12 flex justify-center">
					<MagneticButton href="https://github.com/matmcw">
						<span className="flex items-center gap-3">
							{/* GitHub Icon */}
							<svg
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									fillRule="evenodd"
									d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									clipRule="evenodd"
								/>
							</svg>
							Check out my GitHub
							{/* Arrow */}
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</span>
					</MagneticButton>
				</div>
			</FadeIn>
		</div>
	)
}

export default About
