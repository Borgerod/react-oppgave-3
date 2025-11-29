"use client";
import {
	useState,
	FormEvent,
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
} from "react";
import { cn } from "@/app/lib/utils";
import Button from "../Button";
import TodoFilters from "../TodoFilters";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type TodoFormProps = {
	onAdd: (text: string, forDate?: number, dueDate?: number) => void;
	filter: string;
	setFilter: Dispatch<SetStateAction<string>>;
	sortOrder: string;
	setSortOrder: Dispatch<SetStateAction<string>>;
	onClear?: () => void;
};

export default function TodoForm({
	onAdd,
	filter,
	setFilter,
	sortOrder,
	setSortOrder,
	onClear,
}: TodoFormProps) {
	const [text, setText] = useState<string>("");
	const [showDates, setShowDates] = useState<boolean>(false);
	// date inputs are unmanaged; flatpickr will control the displayed value
	const forDateRef = useRef<HTMLInputElement | null>(null);
	const dueDateRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		let fp1: any = null;
		let fp2: any = null;
		let mounted = true;
		(async () => {
			if (!mounted) return;
			try {
				const fpModule = await import("flatpickr");
				const flatpickr = fpModule.default ?? fpModule;
				// load norwegian locale and localize
				// @ts-ignore - dynamic import of flatpickr locale (no types)
				const localeMod = await import("flatpickr/dist/l10n/nb.js");
				const locale = localeMod.default ?? localeMod;
				// locale may export an object with key 'nb'
				const nbLocale = locale.nb ?? locale;
				if (
					flatpickr &&
					nbLocale &&
					typeof flatpickr.localize === "function"
				) {
					flatpickr.localize(nbLocale);
				}

				const options = {
					dateFormat: "d.m.Y",
					allowInput: true,
					locale: nbLocale,
				};
				if (forDateRef.current)
					fp1 = flatpickr(forDateRef.current as any, options);
				if (dueDateRef.current)
					fp2 = flatpickr(dueDateRef.current as any, options);
			} catch (err) {
				// fail silently — browser input will still work
			}
		})();

		return () => {
			mounted = false;
			try {
				if (fp1 && typeof fp1.destroy === "function") fp1.destroy();
				if (fp2 && typeof fp2.destroy === "function") fp2.destroy();
			} catch (e) {}
		};
	}, []);

	const parseDateString = (s?: string) => {
		if (!s) return undefined;
		// ISO yyyy-mm-dd
		if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return new Date(s).getTime();
		// norwegian dd.mm.yyyy
		if (/^\d{2}\.\d{2}\.\d{4}$/.test(s)) {
			const [dd, mm, yyyy] = s.split(".").map(Number);
			return new Date(yyyy, mm - 1, dd).getTime();
		}
		const parsed = Date.parse(s);
		return Number.isNaN(parsed) ? undefined : parsed;
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (text.trim()) {
			const forVal = forDateRef.current?.value;
			const dueVal = dueDateRef.current?.value;
			const forDate = parseDateString(forVal);
			const dueDate = parseDateString(dueVal);
			onAdd(text, forDate, dueDate);
			setText("");
			if (forDateRef.current) forDateRef.current.value = "";
			if (dueDateRef.current) dueDateRef.current.value = "";
			setShowDates(false);
		}
	};

	return (
		<>
			{/* //* [BROWSER / ORIGINAL] - FORM SECTION  */}
			<section
				className={cn(
					"@Container",
					"container level-1 glass",
					"relative z-10",
					"grid",
					"col-start-1 col-span-2 row-start-1 row-span-3",
					"p-5",
					"items-center",
					"items-between",
					//

					"max-sm:col-span-full",
					"max-sm:col-start",
					"max-sm:-row-start-1",
					"max-sm:row-span-1",
					"max-sm:z-20",
					"max-sm:hidden",
					"",
					""
				)}
			>
				{/*//* Title */}
				<h1 className="text-2xl font-light text-primary/50">To Do</h1>

				{/*//* Add Task field */}
				<form
					onSubmit={handleSubmit}
					aria-label="Add todo form"
					className={cn(
						"flex flex-col gap-5 text-secondary w-full mt-auto"
					)}
				>
					<label htmlFor="todo-input" className="sr-only">
						Add todo
					</label>
					<div className="flex flex-col gap-2 text-secondary">
						<h3
							className={cn(
								"text-md",
								"text-primary/70",
								"text-primary/80",
								"tracking-widest",
								""
							)}
						>
							Add Task
						</h3>

						<label
							className={cn(
								"input",
								"bg-background/40",
								"rounded-full border border-transparent",
								"focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/40",
								"rounded-full",
								"text-primary",
								"stroke-0",
								"border-0",
								"outline-0",
								""
							)}
						>
							{/* Task */}
							<input
								id="todo-input"
								type="text"
								value={text}
								onChange={(e) => setText(e.target.value)}
								className={cn(
									"grow text-primary",
									"text-primary/80",
									""
								)}
								placeholder="write your next task.."
							/>
							<span className="">
								<Button
									type="solid"
									shape="pill"
									className={cn(
										"badge badge-neutral badge-xs",
										"@container",
										"h-6",
										"px-8",
										"py-0",
										"rounded-full",
										"text-foreground",
										"text-background",
										"bg-foreground",
										"shrink-0",
										"stroke-0 border-none outline-none ring-offset-none decoration-0",
										""
									)}
								>
									Add
								</Button>
							</span>
						</label>
					</div>

					{/* Chevron toggle - show/hide extra date fields */}
					<div className="flex items-center justify-start mt-1">
						<button
							type="button"
							onClick={() => setShowDates((s) => !s)}
							aria-expanded={showDates}
							className="flex items-center gap-2 p-1 text-primary/70"
						>
							{showDates ? <IoIosArrowUp /> : <IoIosArrowDown />}
							<span className="label">Add dates</span>
						</button>
					</div>

					{/* Expandable date row */}
					{showDates && (
						<div className="grid grid-cols-2 gap-3 mt-2">
							<label className="flex flex-col">
								<span className="label text-primary/70">
									SetForDate
								</span>
								<input
									ref={forDateRef}
									type="text"
									lang="nb-NO"
									placeholder="dd.mm.yyyy"
									className={cn(
										"input bg-background/40 rounded-md p-2 text-primary"
									)}
								/>
							</label>
							<label className="flex flex-col">
								<span className="label text-primary/70">
									SetDueDate
								</span>
								<input
									ref={dueDateRef}
									type="text"
									lang="nb-NO"
									placeholder="dd.mm.yyyy"
									className={cn(
										"input bg-background/40 rounded-md p-2 text-primary"
									)}
								/>
							</label>
						</div>
					)}
				</form>

				{/*//* Filters */}
				<TodoFilters
					{...{ filter, setFilter, sortOrder, setSortOrder }}
				/>
			</section>
			{/* //* [MOBILE] - FORM SECTION  */}
			<section
				className={cn(
					"@Container",
					"container level-1 glass",
					"p-5",
					"grid",
					"hidden",
					"max-sm:grid",
					"items-center",
					"items-between",
					"col-span-full",
					"col-start-1",
					"row-start-1",
					"row-span-1",
					"-mb-10",
					// "w-99",
					"w-[95%]",
					"pb-12",
					"top-0",
					"justify-self-center",
					"",
					""
				)}
			>
				{/*//* Title */}
				<h1 className="text-2xl font-light text-primary/50">To Do</h1>

				{/*//* Filters */}
				<TodoFilters
					{...{ filter, setFilter, sortOrder, setSortOrder }}
				/>
			</section>

			{/* //* [MOBILE] - ADD NEW TASK (SINGLE) */}
			<section
				// ADD NEW TASK (SINGLE)
				className={cn(
					"@Container",
					"container level-2",
					"bg-transparent",
					"p-5",
					"relative z-10",
					"grid",
					"col-start-1 col-span-2 row-start-1 row-span-3",
					"hidden",
					"max-sm:grid",
					"items-center",
					"items-between",
					"col-span-full",
					"col-start-1",
					"-row-start-1",
					"row-span-1",
					"z-20",
					"z-60",
					"pointer-events-auto",
					"absolute",
					"bottom-5",
					"max-sm:w-fit",
					"max-sm:p-0",
					"justify-self-center",
					// "max-sm:ml-10",
					"max-sm:right-5",
					// "max-sm:px-0",
					"max-sm:ml-5",
					"max-sm:ml-[36%]",
					// "container level-1",
					"",
					""
				)}
			>
				{/*//* Add Task field */}
				<form
					onSubmit={handleSubmit}
					aria-label="Add todo form"
					className={cn(
						"flex flex-col gap-5 text-secondary w-full mt-auto",
						// "max-sm:mr-",
						// "max-sm:max-w-",
						"max-sm:w-full",
						"container level-1",
						"row-start-1 col-start-1",
						// "max-sm:px-10",

						"",
						""
					)}
				>
					<label htmlFor="todo-input" className="sr-only">
						Add todo
					</label>
					<div
						className={cn(
							// "flex flex-col gap-2 text-secondary z-250",
							// "container",
							// "glass",
							// "level-1",
							// "level-2",
							"p-5",
							"",
							""
						)}
					>
						<label
							className={cn(
								"input",
								"bg-background/40",
								"rounded-full border border-transparent",
								"focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/40",
								"rounded-full",
								"text-primary",
								"stroke-0",
								"border-0",
								"outline-0",
								"pointer-events-auto",
								"max-sm:w-full",
								"max-sm:shadow",
								"",
								""
							)}
						>
							{/* Task */}
							<input
								id="todo-input"
								type="text"
								value={text}
								onChange={(e) => setText(e.target.value)}
								className={cn(
									"grow text-primary",
									"text-primary/80",
									""
								)}
								placeholder="write your next task.."
							/>
							<span className="">
								<Button
									type="solid"
									shape="pill"
									className={cn(
										"badge badge-neutral badge-xs",
										"@container",
										"h-6",
										"px-8",
										"py-0",
										"rounded-full",
										"text-foreground",
										"text-background",
										"bg-foreground",
										"shrink-0",
										"stroke-0 border-none outline-none ring-offset-none decoration-0",
										""
									)}
								>
									Add
								</Button>
							</span>
						</label>
					</div>
				</form>
			</section>
		</>
	);
}
