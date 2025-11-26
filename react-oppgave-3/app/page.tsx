import Link from "next/link";
//TODO change favicon
export default function Home() {
	return (
		// <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
		// 	<main className="flex flex-col gap-6 text-center">
		// 		<p className="text-sm uppercase tracking-[0.3em] text-slate-400">
		// 			Productivity playground
		// 		</p>
		// 		<h1 className="text-4xl font-semibold">
		// 			Organize your day with the todo board
		// 		</h1>
		// 		<p className="text-lg text-slate-300">
		// 			Follow the link below to open the full-featured task manager
		// 		</p>
		// 		<Link
		// 			href="/pages/todo"
		// 			className="rounded-md bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
		// 		>
		// 			Open todo board
		// 		</Link>
		// 	</main>
		// </div>

		<main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
			<div className="mx-auto flex max-w-3xl flex-col gap-8">
				<header>
					<p className="text-sm uppercase tracking-[0.3em] text-slate-400">
						Pages
					</p>
					<h1 className="text-4xl font-semibold">
						Choose a workspace
					</h1>
					<p className="text-lg text-slate-300">
						Pick any page below to open its dedicated experience.
					</p>
				</header>

				<div className="grid gap-4 sm:grid-cols-2">
					<Link
						className="rounded-lg border border-slate-800 bg-slate-900/40 p-6 transition hover:border-slate-600"
						href="/todo"
					>
						<p className="text-sm uppercase tracking-wide text-slate-400">
							Task board
						</p>
						<p className="text-2xl font-semibold">Todo</p>
						<p className="mt-3 text-sm text-slate-400">
							Create, sort and complete tasks with persistence.
						</p>
					</Link>
				</div>
			</div>
		</main>
	);
}
// <div className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-16 text-white">
// 	<StylizedCircle
// 		aria-hidden
// 		className="pointer-events-none absolute -right-32 -top-32 hidden h-[420px] w-[420px] opacity-40 blur-3xl sm:block"
// 	/>
// 	<main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12">
// 		<header className="space-y-4 text-center sm:text-left">
// 			<p className="text-sm uppercase tracking-[0.3em] text-slate-400">
// 				Todo
// 			</p>
// 			<h1 className="text-4xl font-semibold">Task board</h1>
// 			<p className="text-lg text-slate-300">
// 				Create, categorize and complete tasks with persistent storage.
// 			</p>
// 		</header>
// 		<section className="rounded-3xl border border-white/10 bg-white/5 p-1 shadow-[0_0_120px_rgba(15,23,42,0.35)] backdrop-blur">
// 			<ToDo />
// 		</section>
// 	</main>
// </div>
