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

      {/* Navigation - at bottom */}
      <div className="absolute bottom-6 left-0 right-0 z-10 text-center">
        <FadeIn delay={300} duration={500}>
          <p className="text-white/40 text-sm mb-3">Scroll or swipe to browse</p>
          <div className="flex items-center justify-center gap-2">
            {projectsData.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-white/30"
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

export default Projects
