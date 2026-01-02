import { InterestTile, FadeIn } from '../components/ui'

const interests = [
  {
    icon: '💻',
    title: 'Programming',
    description: 'Building software and solving problems through code. From web apps to automation scripts.',
  },
  {
    icon: '🎮',
    title: 'Gaming',
    description: 'Exploring virtual worlds and enjoying competitive and story-driven games.',
  },
  {
    icon: '✈️',
    title: 'Travel',
    description: 'Discovering new places, cultures, and experiences around the world.',
  },
  {
    icon: '🖨️',
    title: '3D Printing',
    description: 'Bringing digital designs to life through additive manufacturing and prototyping.',
  },
  {
    icon: '🤖',
    title: 'AI',
    description: 'Fascinated by machine learning, neural networks, and the future of artificial intelligence.',
  },
  {
    icon: '🎸',
    title: 'Metal/Rock',
    description: 'Heavy riffs and powerful vocals. Music that gets the adrenaline pumping.',
  },
  {
    icon: '🧩',
    title: "Rubik's Cubes",
    description: 'Speed cubing and puzzle solving. The satisfying click of algorithms falling into place.',
  },
]

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Page Title */}
      <FadeIn delay={0} duration={500}>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gradient">
          About Me
        </h1>
      </FadeIn>

      {/* Bio Section */}
      <FadeIn delay={100} duration={500}>
        <div className="glass rounded-2xl p-8 mb-12">
          <p className="text-lg text-white/80 leading-relaxed mb-4">
            Hi, I'm Matthew McWilliams — a developer passionate about creating elegant
            solutions to complex problems. I love working with modern technologies
            and building things that make a difference.
          </p>
          <p className="text-lg text-white/80 leading-relaxed">
            When I'm not coding, you can find me exploring my various interests
            listed below. I believe in continuous learning and always pushing
            the boundaries of what's possible.
          </p>
        </div>
      </FadeIn>

      {/* Interests Section Title */}
      <FadeIn delay={200} duration={500}>
        <h2 className="text-2xl font-semibold mb-6 text-white/90">
          My Interests
        </h2>
      </FadeIn>

      {/* Interest Tiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {interests.map((interest, index) => (
          <FadeIn
            key={interest.title}
            delay={300 + index * 75}
            duration={500}
            direction="up"
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
          <a
            href="https://github.com/matmcw"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-3
              px-8 py-4 rounded-xl
              bg-gradient-to-r from-primary-blue/20 to-primary-purple/20
              border border-white/10
              hover:from-primary-blue/30 hover:to-primary-purple/30
              hover:border-white/20
              hover:-translate-y-1
              hover:shadow-lg hover:shadow-primary-blue/20
              transition-all duration-300
              group
            "
          >
            {/* GitHub Icon */}
            <svg
              className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-lg font-medium text-white">
              Check out my GitHub
            </span>
            {/* Arrow */}
            <svg
              className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform duration-300"
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
          </a>
        </div>
      </FadeIn>
    </div>
  )
}

export default About
