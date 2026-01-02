import { FadeIn } from '../components/ui'
import { ProjectCarousel } from '../components/projects'
import projectsData from '../data/projects.json'

const Projects = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 text-center">
        <FadeIn delay={0} duration={500}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            My Stuff
          </h1>
        </FadeIn>
        <FadeIn delay={100} duration={500}>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            A collection of projects I've worked on. Click on a project to visit it.
          </p>
        </FadeIn>
      </div>

      {/* Carousel */}
      <FadeIn delay={200} duration={600} className="flex-1 flex items-center">
        <ProjectCarousel projects={projectsData} />
      </FadeIn>
    </div>
  )
}

export default Projects
