
export const AVATARS = {
	WAVE: "/avatars/IMG_7732.PNG",
} as const;

export const HERO_COMIC_PANELS = [
	{
		src: "/avatars/IMG_7735.PNG",
		alt: "Travel",
		color: "#FFD700", // Gold
		story: "Living life one SRK pose at a time.",
		rotate: -3,
	},
	{
		src: "/avatars/IMG_7733.PNG",
		alt: "Fun",
		color: "#FF69B4", // Hot Pink
		story: "Attempting adulthood. Accidentally chose chaos.",
		rotate: 2,
	},
	{
		src: "/avatars/IMG_7734.PNG",
		alt: "Growth",
		color: "#8842ebff", // Violet
		story: "Excited for what’s next, learning as I go.",
		rotate: -2,
	},
	{
		src: "/avatars/IMG_7737.PNG",
		alt: "Biking",
		color: "#4ade80", // Light Green
		story: "Two wheels, my kind of therapy.",
		rotate: 3,
	},
] as const;

// Ordered by engineering depth, most impressive first.
export const SHELF_PROJECTS = [
	{
		id: 2,
		title: "Graphly",
		year: "2026",
		category: "Productivity",
		tech: ["React", "TypeScript", "Golang", "PostgreSQL", "WebSockets"],
		color: "#10b981",
		image: "/graphly-board.jpg",
		gif: "/graphly-demo.webp",
		time: "2026",
		shortDesc: "A real-time, multi-user issue tracker that schedules your plan as a dependency graph. It runs the critical path and a Monte Carlo forecast in the browser, so it knows what's blocked, who's holding everyone up and when work will really ship.",
		liveUrl: "https://graphly.fly.dev",
		githubUrl: "https://github.com/Lal-Jr/Graphly",
		problem: "Issue trackers store \"blocks\" links and then ignore them. The board can't tell you which issue is quietly holding up ten others, whether the due date is already lost, or what happens to the ship date if one task slips three days. Teams find out on the day it's late.",
		thought: "Every dependency is already an edge in a graph. If the tracker schedules that graph like a project planner, the questions answer themselves: the critical path sets the ship date, slack says what can wait, and a late forecast shows up weeks before the due date does.",
		solving: "The browser runs a scheduling engine: the critical path method over working days gives every open issue a forecast start and finish, epics roll up to their last child, and a Monte Carlo simulation of estimate overruns gives a confidence date. What-if slips show every issue that shifts and every due date that newly gets missed. The Go server keeps Postgres as the source of truth. Each write records an event in a transactional outbox and wakes every server over LISTEN/NOTIFY, so the app scales horizontally and clients resume from their last event after a disconnect. Adding a dependency locks the project and checks reachability with a recursive query, so two people linking A to B and B to A at the same moment can't create a cycle. The interface borrows Jira's workflow but not its look: board cards are drawn as graph nodes with ports for what they wait on and what waits on them, the forecast is pinned to the sidebar on every page, the ship date is shown as a confidence curve, and the critical path is drawn as a transit line.",
		result: "A deployed tracker with a board, list, live dependency graph, auto-scheduled Gantt timeline, standup digest and insights that rank blockers by how much they hold up and flag work that will be late before it is. It has workspaces, invites and roles, live presence, conflict-safe edits, and a GitHub webhook that moves issues along as pull requests open and merge. Go tests cover the API, realtime delivery and concurrency, and a one-click demo needs no sign-up.",
		isComingSoon: false,
	},
	{
		id: 6,
		title: "ArchFlow",
		year: "2026",
		category: "Developer Tools",
		tech: ["Next.js", "TypeScript", "React Flow", "Tailwind CSS"],
		color: "#ef4444",
		image: "/archflow-simulator.jpg",
		gif: "/archflow-demo.webp",
		time: "2026",
		shortDesc: "A distributed-systems simulator built on a from-scratch traffic engine. Draw a backend, push load through it and watch latency, queues, retry storms and failures play out live, then practice 24 real system design interview questions with graded reference designs.",
		liveUrl: "https://archflow-sim.vercel.app",
		githubUrl: "https://github.com/Lal-Jr/ArchFlow",
		problem: "System design is taught on whiteboards, and a whiteboard never pushes back. You can draw a cache, a queue and three replicas, but you never see what happens at 3,000 requests a second, which box fails first, or why a slow database turns into a slow page.",
		thought: "Make the diagram run. If every box has a capacity and every arrow carries traffic, the design can answer its own questions: where the bottleneck is, what a traffic spike does to a queue, and what breaks when a node dies.",
		solving: "I wrote a rate-based simulation engine from scratch in TypeScript. It compiles the graph once per edit (a depth-first search drops cycles, Kahn's algorithm orders the rest), then every 100ms of simulated time routes traffic forward and folds latency and failure back to the client. Components queue as they fill up, caches absorb hits, load balancers route around dead nodes, and queues back up when workers fall behind. On top of that it models retries (and the retry storms they cause), circuit breakers, autoscaling with a provisioning delay, and p99 latency from per-component latency distributions. Live metrics go through an external store, so ten updates a second never re-render the React Flow graph, and an insights layer turns the numbers into plain advice such as how many replicas would fix a bottleneck.",
		result: "A simulator with traffic patterns, chaos controls, live charts, cost estimates and bottleneck detection, plus budgeted challenges (survive Black Friday, a database outage, a retry storm). It doubles as an interview-prep course: 24 of the most-asked system design questions, each with a full guide covering requirements, API, data model, the reasoning behind every decision, follow-ups and common mistakes, alongside graded practice and a load-testable reference design. Designs can be shared as a link, and a guided tour, undo and keyboard shortcuts make it easy to pick up. 180 tests run in CI on every push, including checks that every reference design passes its own grader. It runs entirely in the browser, with no sign-up.",
		isComingSoon: false,
	},
	{
		id: 3,
		title: "RouteWise",
		year: "2026",
		category: "Planning",
		tech: ["React", "TypeScript", "Leaflet", "OSRM", "Vitest", "GitHub Pages"],
		color: "#E31C5F",
		image: "/routewise-plan.jpg",
		gif: "/routewise-demo.webp",
		time: "2026",
		shortDesc: "A day-trip planner with its own constraint solver. It orders your stops around opening hours, visit lengths and priorities using real road, bike or walking times, and repairs the schedule on the fly when you run late. Share a day as a link, then follow it live with directions to each stop.",
		liveUrl: "https://lal-jr.github.io/RouteWise/",
		githubUrl: "https://github.com/Lal-Jr/RouteWise",
		problem: "Planning a day of sightseeing is a scheduling problem pretending to be a list. Museums close, lunch has a window, and one 40-minute delay quietly breaks the rest of the day. Map apps give you directions between two points, not a plan that still works at 3pm.",
		thought: "Treat the day as a vehicle routing problem with time windows, and treat every change as a repair rather than a restart. People care most that the plan still works, then that it changed as little as possible, then that it's efficient.",
		solving: "The planning engine is pure TypeScript with no React in it. It builds a first order by cheapest insertion, then improves it with local search (relocate, swap and 2-opt moves), scoring each candidate by simulating the whole day. Plans are compared lexicographically: closing-time violations first, then the priority weight of dropped stops, then travel and waiting time, so a feasible plan always beats a shorter one and must-visit stops are never dropped. When something changes, repair escalates only as far as it has to: retime and keep the order, then reorder until the day is feasible, then drop the lowest-priority optional stops, which come back automatically if time frees up. Travel times come from OpenStreetMap routing (OSRM), cached in the browser so a planned trip reopens instantly, with a straight-line fallback when the service is unreachable.",
		result: "A working planner, live on GitHub Pages, with place search, map pins and routes drawn along real roads. The interface takes cues from Airbnb and Wanderlog: a pill search bar, map markers that show each stop's number and time, itinerary cards joined by travel legs, and a bottom sheet over the map on phones. Live mode steps through the day with a bold next-up card: mark stops visited, report a delay, skip a stop, follow the real clock or open directions in Google Maps, and a banner explains every change the repair made. Trips can end anywhere, be shared as a link with the whole plan encoded in it, and every destructive action has an undo. Stops that can never fit say why. The solver and repair engine are unit tested, it needs no API keys, and it opens on a demo Paris walking day that deliberately doesn't fit, so you can watch stops get dropped and repaired straight away.",
		isComingSoon: false,
	},
	{
		id: 1,
		title: "Circle of Life",
		year: "2026",
		category: "Social",
		tech: ["Next.js", "Golang", "PostGIS", "Redis"],
		color: "#DD5E25",
		image: "/circleoflife-map.jpg",
		gif: "/circleoflife-demo.webp",
		time: "2026",
		shortDesc: "A hyper-local community board. Ask for help or start a meetup, and the people within a few kilometres see it first, ranked by how close and how urgent it is.",
		liveUrl: "https://circleoflife-web.fly.dev",
		githubUrl: "https://github.com/Lal-Jr/CircleOfLife",
		problem: "When you need jumper cables, a hand with groceries or someone to look out for a lost dog, the people who can help are a few streets away. They're just not on the same app. Neighbourhood groups bury urgent requests under old chatter, and social feeds rank by popularity, so a request two streets away ends up below something from across the city.",
		thought: "Distance should be the main thing that ranks a post. If the feed is built around where you are right now, an urgent request 300 metres away rises to the top by itself, and the map becomes the natural way to browse.",
		solving: "The Go API stores every post as a PostGIS geography point with a GiST index, so a radius query stays fast. The feed ranks in SQL with a decay score that weighs distance, age and post type, and anything under 500 m is pinned as urgent nearby activity. New posts go out over Server-Sent Events backed by Redis pub/sub, and Redis also caches feeds and enforces per-user fixed-window rate limits on posts and comments (INCR with an expiring key). The Next.js client uses React Query for optimistic posts, comments and Helpful votes, with a Mapbox map of everything in range. JWT auth with bcrypt and server-side sanitisation with bluemonday handle the basics.",
		result: "A working app with a nearby feed, a live map, comment threads, Helpful votes, profiles and a mobile layout with bottom navigation. It runs on Fly.io with Supabase Postgres. A seeded neighbourhood of residents, requests, meetups and conversations means it's never empty, and a one-click demo account needs no sign-up.",
		isComingSoon: false,
	},
	{
		id: 4,
		title: "SubTrack",
		year: "2026",
		category: "Finance",
		tech: ["Next.js", "TypeScript", "SQLite", "PowerSync", "Supabase"],
		color: "#a855f7",
		image: "/subtrack-runway.jpg",
		gif: "/subtrack-demo.webp",
		time: "2026",
		shortDesc: "A private, offline-first subscription tracker. It parses bank statements entirely in the browser, detects recurring charges and their billing cycles, and shows what is about to leave your account, and when.",
		liveUrl: "https://sub-track-psi.vercel.app",
		githubUrl: "https://github.com/Lal-Jr/SubTrack",
		// Copy reflects the current app; see the README for the full feature list.
		problem: "Subscription trackers either want your bank login or a statement upload to their servers, or bury you in a flat list of charges. You still can't tell what is coming next, which charge will hurt, or which subscriptions are quietly piling up.",
		thought: "Keep every byte on the device, and build the app around one question: what is about to leave my account, and when? If that answer is instant and private, the rest is detail.",
		solving: "Statements (CSV and PDF) are parsed in the browser into a local SQLite database, with automatic column mapping and duplicate-safe re-imports, so overlapping statements never double count. One detection engine groups charges by merchant, infers the billing cycle from the gaps between them, and flags price changes and lapsed subscriptions. The home screen is a runway timeline where each charge is sized by its amount, next to plain-language insights such as a large annual charge coming up. Opt-in sync through PowerSync and Supabase sits behind a provider layer, so local-only stays the default.",
		result: "An installable, offline-capable PWA with a dense dashboard, a 12-month schedule built from real charge dates, a renewal calendar, backup and restore, and a phone-first layout. Parsing and detection are covered by 69 unit tests, and it loads with sample data, so anyone can try it in seconds.",
		isComingSoon: false,
	},
	{
		id: 5,
		title: "WhyIOpened",
		year: "2026",
		category: "Productivity",
		tech: ["TypeScript", "React", "Chrome MV3", "Vite"],
		color: "#ec4899", // Pink-500
		image: "/whyiopened-prompt.jpg",
		gif: "/whyiopened-demo.webp",
		time: "2026",
		shortDesc: "A Chrome extension that asks why you opened a tab, in one keypress, so you know what every tab is for when you come back to it.",
		liveUrl: "#",
		githubUrl: "https://github.com/Lal-Jr/WhyIOpened",
		problem: "Tabs pile up faster than their purpose can be remembered. An hour later there are thirty of them open and no memory of why half exist, so they stay open out of fear or get closed and lost.",
		thought: "Capture the reason at the moment the tab is opened, when it costs nothing to remember. For that to work the question has to be almost frictionless, and the answer still has to be useful later.",
		solving: "A small card appears when you first look at a new tab. Press 1 to 6 to pick Read, Research, To-do, Reference, Buy or Watch, or add an optional note with #tags. A tab opened from a link offers its parent tab's reason, which Enter accepts, and every tab records which tab it came from, so even a skipped prompt keeps some context. A background service worker tracks the tab lifecycle and re-attaches reasons to restored tabs after a browser restart.",
		result: "In progress. The prompt, a new tab page, a popup with fuzzy search, and a dashboard filterable by reason are built. Next up: snooze, auto-archive, and Chrome Tab Groups sync.",
		isComingSoon: false,
	},
] as const;

// sessionStorage flag: set once the Pac-Man intro has played in this tab.
export const INTRO_SEEN_KEY = "intro-seen";

// Contact links.
export const SOCIAL_LINKS = {
	linkedin: "https://www.linkedin.com/in/laljr-harish",
} as const;
