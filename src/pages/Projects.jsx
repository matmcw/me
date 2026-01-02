import { FadeIn } from '../components/ui'
import { ProjectCarousel } from '../components/projects'
import projectsData from '../data/projects.json'

const Projects = () => {
  return (
    <div className="h-[calc(100vh-5rem)] relative overflow-hidden">
      {/* Header - positioned at top with spacing */}
      <div className="absolute top-12 left-0 right-0 z-10 text-center">
        <FadeIn delay={0} duration={500}>
          <h1 className="text-3xl md:text-4xl font-bold mb-1 text-gradient">
            My Stuff
          </h1>
        </FadeIn>
        <FadeIn delay={100} duration={500}>
          <p className="text-white/50 text-sm">
            Click on a project to visit it.
          </p>
        </FadeIn>
      </div>

      {/* Carousel - centered with slight offset down */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: '40px' }}>
        <FadeIn delay={200} duration={600}>
          <ProjectCarousel projects={projectsData} />
        </FadeIn>
      </div>

    </div>
  )
}

export default Projects
