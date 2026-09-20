import { HERO_COMIC_PANELS } from "@/constants";

// Server-rendered placeholder shaped like <Hero />: headline, blog note, comic strip.
// Shown for returning visitors while the page hydrates, instead of a blank screen.
const bar = "animate-pulse rounded-sm bg-white/[0.06]";

export default function HeroSkeleton() {
	return (
		<section
			aria-hidden
			className="relative w-full min-h-screen flex flex-col items-center justify-start px-4 pt-32"
		>
			<div className="w-full max-w-6xl flex flex-col items-center gap-4">
				<div className={`${bar} h-10 md:h-16 w-[92%]`} />
				<div className={`${bar} h-10 md:h-16 w-[70%]`} />
				<div className={`${bar} h-10 md:h-16 w-[55%]`} />
				<div className={`${bar} h-5 w-52 mt-4`} />
			</div>
			<div className="mt-16 flex flex-wrap justify-center gap-4 md:gap-8 px-4">
				{HERO_COMIC_PANELS.map((_, i) => (
					<div
						key={i}
						className="animate-pulse w-32 h-32 md:w-44 md:h-44 border-4 border-white/10 bg-white/[0.04]"
						style={{ animationDelay: `${i * 120}ms` }}
					/>
				))}
			</div>
		</section>
	);
}
