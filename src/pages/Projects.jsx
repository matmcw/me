import { FadeIn } from '../components/ui'
import { ProjectCarousel } from '../components/projects'
import projectsData from '../data/projects.json'

const Projects = () => {
	return (
		<div className="h-[calc(100vh-6rem)] flex flex-col overflow-hidden">
			{/* Title area */}
			<div className="pt-6 pb-2 text-center flex-shrink-0">
				<FadeIn delay={0} duration={500}>
					<h1 className="page-title-short mb-1">
						My Stuff
					</h1>
				</FadeIn>
				<FadeIn delay={100} duration={500}>
					<p className="text-white/50 text-sm">
						Click on a project to visit it.
					</p>
				</FadeIn>
			</div>

			{/* Carousel - fills remaining space */}
			<div className="flex-1 min-h-0 relative">
				<FadeIn delay={200} duration={600} className="h-full">
					<ProjectCarousel projects={projectsData} />
				</FadeIn>
			</div>
		</div>
	)
}

export default Projects
