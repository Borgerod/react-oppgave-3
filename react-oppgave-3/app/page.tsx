import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Pages
          </p>
          <h1 className="text-4xl font-semibold">Choose a workspace</h1>
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
