import { useState } from 'react'
import { TypewriterText, Button, FadeIn } from '../components/ui'

const Home = () => {
  const [typingComplete, setTypingComplete] = useState(false)

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-6">
      <div className="text-center">
        {/* Main heading with typewriter effect */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-12 leading-tight">
          <TypewriterText
            text={"Hey,\nI'm Matthew."}
            speed={70}
            delay={500}
            onComplete={() => setTypingComplete(true)}
            className="block"
            cursorClassName="h-[0.9em]"
          />
        </h1>

        {/* Buttons that fade in after typing completes */}
        <FadeIn
          show={typingComplete}
          delay={500}
          duration={600}
          direction="up"
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button to="/about" variant="primary">
            About Me
          </Button>
          <Button to="/projects" variant="primary">
            My Stuff
          </Button>
          <Button to="/contact" variant="secondary">
            Contact
          </Button>
        </FadeIn>
      </div>
    </div>
  )
}

export default Home
