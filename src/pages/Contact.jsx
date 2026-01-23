import { FadeIn } from '../components/ui'

const Contact = () => {
	return (
		<div className="page-centered">
			<div className="max-w-lg w-full">
				{/* Title */}
				<FadeIn delay={0} duration={500}>
					<h1 className="page-title mb-8 text-center">Get In Touch</h1>
				</FadeIn>

				{/* Contact Card */}
				<FadeIn delay={100} duration={500}>
					<div className="card p-8 space-y-6">
						{/* Email */}
						<a href="mailto:matmcw@proton.me" className="link-card group">
							{/* Email Icon */}
							<div className="icon-box">
								<svg
									className="w-6 h-6 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<div>
								<div className="text-sm text-subtle mb-1">Email</div>
								<div className="text-white font-medium">matmcw@proton.me</div>
							</div>
							{/* Arrow */}
							<svg
								className="w-5 h-5 text-faint ml-auto group-hover-arrow"
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

						{/* GitHub */}
						<a
							href="https://github.com/matmcw"
							target="_blank"
							rel="noopener noreferrer"
							className="link-card group"
						>
							{/* GitHub Icon */}
							<div className="icon-box">
								<svg
									className="w-6 h-6 text-white"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										fillRule="evenodd"
										d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<div>
								<div className="text-sm text-subtle mb-1">GitHub</div>
								<div className="text-white font-medium">github.com/matmcw</div>
							</div>
							{/* Arrow */}
							<svg
								className="w-5 h-5 text-faint ml-auto group-hover-arrow"
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

				{/* Footer text */}
				<FadeIn delay={200} duration={500}>
					<p className="text-center text-faint text-sm mt-8">
						Feel free to reach out for any reason. Check out my full GitHub page!
					</p>
				</FadeIn>
			</div>
		</div>
	)
}

export default Contact
