"use client";
import {
	useState,
	FormEvent,
	Dispatch,
	SetStateAction,
	useRef,
	useMemo,
} from "react";
import { cn } from "@/app/lib/utils";
import Button from "../Button";
import TodoFilters from "../TodoFilters";
// import useUserLocale from "@/app/hooks/useUserLocale";
import { useUserLocale } from "@/app/hooks/useUserLocale";
import { formatTimestamp, deriveDateFormat } from "@/app/lib/formatTimeStamp";

import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";

type DateFieldProps = {
	label: string;
	value: string;
	setValue: (v: string) => void;
	locale: string;
};

// function DateField({ label, value, setValue, locale }: DateFieldProps) {
// 	return (
// 		<div className="flex flex-col">
// 			<label className="sr-only">{label}</label>
// 			<div>{locale}</div>
// 			<div className="relative w-full">
// 				<input
// 					type="date"
// 					value={value || ""}
// 					onChange={(e) => setValue(e.target.value)}
// 					className="input bg-background/20 rounded-full text-primary/60 placeholder:text-primary/60 w-full cursor-pointer pointer-events-auto z-10"
// 				/>
// 			</div>
// 		</div>
// 	);
// }
import DatePicker from "react-datepicker";

// function DateField({ label, value, setValue, locale }: DateFieldProps) {
// 	return (
// 		<div className="date-picker-wrapper">
// 			<label className="sr-only">{label}</label>
// 			<DatePicker
// 				selected={value ? new Date(value) : null}
// 				onChange={(date) =>
// 					setValue(date?.toISOString().split("T")[0] || "")
// 				}
// 				locale={locale}
// 				dateFormat={dateFormat}
// 				placeholderText={label}
// 				className={cn(
// 					"input",
// 					"bg-background/40",
// 					"rounded-full border border-transparent",
// 					"focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/40",
// 					"rounded-full",
// 					"text-primary/60 text-center",
// 					"stroke-0",
// 					"border-0",
// 					"outline-0",
// 					""
// 				)}
// 			/>
// 		</div>
// 	);
// }
function DateField({
	label,
	value,
	setValue,
	locale: passedLocale,
}: DateFieldProps) {
	const { locale: geoLocale } = useUserLocale();

	const locale = passedLocale || geoLocale || "en-US";

	// Determine date format based on locale using deriveDateFormat
	const dateFormat = deriveDateFormat(locale);
	return (
		<div className="date-picker-wrapper">
			<label className="sr-only">{label}</label>
			<DatePicker
				selected={value ? new Date(value) : null}
				onChange={(date) =>
					setValue(date?.toISOString().split("T")[0] || "")
				}
				locale={locale}
				dateFormat={dateFormat}
				placeholderText={label}
				className={cn(
					"input",
					"bg-background/40",
					"rounded-full border border-transparent",
					"focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/40",
					"rounded-full",
					"text-primary/60 text-center",
					"stroke-0",
					"border-0",
					"outline-0"
				)}
			/>
		</div>
	);
}
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
	onClear: _onClear,
}: TodoFormProps) {
	const [text, setText] = useState<string>("");
	const [showDates, setShowDates] = useState<boolean>(false);
	const [forDate, setForDate] = useState<string>("");
	const [dueDate, setDueDate] = useState<string>("");
	// const locale = useUserLocale();
	const { locale } = useUserLocale();

	// formatting is handled centrally by formatTimestamp

	// keep incoming `onClear` prop for callers; not used here
	void _onClear;
	// add-dates feature removed: no flatpickr or date refs

	// no date parsing required when add-dates removed

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (text.trim()) {
			// convert YYYY-MM-DD -> timestamp (ms) when provided
			const forTs = forDate ? new Date(forDate).getTime() : undefined;
			const dueTs = dueDate ? new Date(dueDate).getTime() : undefined;
			onAdd(text, forTs, dueTs);
			setText("");
			setForDate("");
			setDueDate("");
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
				)}>
				{/*//* Title */}
				<h1 className="text-2xl font-light text-primary/50">To Do</h1>

				{/*//* Add Task field */}
				<form
					onSubmit={handleSubmit}
					aria-label="Add todo form"
					className={cn(
						"flex flex-col gap-5 text-secondary w-full mt-auto"
					)}>
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
							)}>
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
							)}>
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
									)}>
									Add
								</Button>
							</span>
						</label>

						{/* Chevron toggle for dates (moved below the input) */}
						<div className="mt-0">
							<button
								type="button"
								aria-expanded={showDates}
								onClick={() => setShowDates((s) => !s)}
								className={cn(
									"flex justify-center w-full",
									"ml-0",
									"text-sm text-primary/70",
									"hover:text-primary",
									"transition-transform"
									// showDates ? "rotate-180" : "rotate-0"
								)}>
								{showDates ? (
									<IoChevronDownOutline />
								) : (
									<IoChevronUpOutline />
								)}
							</button>

							{showDates && (
								<div className="flex gap-3 mt-0 items-center text-sm">
									<DateField
										label="For when"
										value={forDate}
										setValue={setForDate}
										locale={locale}
									/>
									<DateField
										label="Due date"
										value={dueDate}
										setValue={setDueDate}
										locale={locale}
									/>
								</div>
							)}
						</div>
					</div>
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
				)}>
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
				)}>
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
					)}>
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
						)}>
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
							)}>
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
									)}>
									Add
								</Button>
							</span>
						</label>

						{/* Chevron toggle for dates (mobile, moved below input) */}
						<div className="mt-2">
							<button
								type="button"
								aria-expanded={showDates}
								onClick={() => setShowDates((s) => !s)}
								className={cn(
									"ml-0",
									"text-sm text-primary/70",
									"hover:text-primary",
									"transition-transform",
									showDates ? "rotate-180" : "rotate-0"
								)}>
								<span className="sr-only">Toggle dates</span>
								{showDates ? (
									<IoChevronUpOutline aria-hidden="true" />
								) : (
									<IoChevronDownOutline aria-hidden="true" />
								)}
							</button>

							{showDates && (
								<div className="flex gap-3 mt-3 items-center text-sm">
									<DateField
										label="For date"
										value={forDate}
										setValue={setForDate}
										locale={locale}
									/>
									<DateField
										label="Due date"
										value={dueDate}
										setValue={setDueDate}
										locale={locale}
									/>
								</div>
							)}
						</div>
					</div>
				</form>
			</section>
		</>
	);
}
