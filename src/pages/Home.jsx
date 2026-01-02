import { useState } from 'react'
import { TypewriterText, Button, FadeIn } from '../components/ui'

const Home = () => {
  const [typingComplete, setTypingComplete] = useState(false)

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-6">
      <div className="text-center">
        {/* Main heading with typewriter effect - moves up when buttons appear */}
        <h1
          className={`
            text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight
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

        {/* Buttons that fade in after typing completes */}
        <FadeIn
          show={typingComplete}
          delay={400}
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
          <Button to="/contact" variant="primary">
            Contact
          </Button>
        </FadeIn>
      </div>
    </div>
  )
}

export default Home
