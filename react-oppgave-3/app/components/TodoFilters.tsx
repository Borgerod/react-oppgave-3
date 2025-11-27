import { FILTER, SORT_ORDERS } from "@/app/lib/filterConfig";
import { cn } from "../lib/utils";
import { useEffect, useId, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { PiSlidersHorizontal } from "react-icons/pi";
import Button from "./Button";

type Props = {
	filter: string;
	setFilter: React.Dispatch<React.SetStateAction<string>>;
	sortOrder: string;
	setSortOrder: React.Dispatch<React.SetStateAction<string>>;
};

type DropdownFieldProps = {
	label: string;
	value: string;
	options: string[];
	onChange: (next: string) => void;
	iconOnMobile?: React.ReactNode;
	mobileFull?: boolean;
};

function DropdownField({
	label,
	value,
	options,
	onChange,
	iconOnMobile,
	mobileFull = true,
}: DropdownFieldProps) {
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const labelId = useId();
	const hasValue = options.includes(value);
	const resolvedValue = hasValue ? value : options[0] ?? "";
	const selectedLabel = resolvedValue || label;

	useEffect(() => {
		if (!hasValue && options[0]) {
			onChange(options[0]);
		}
	}, [hasValue, onChange, options]);

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (!containerRef.current) return;
			if (!containerRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		}

		function handleKey(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClick);
		document.addEventListener("keydown", handleKey);
		return () => {
			document.removeEventListener("mousedown", handleClick);
			document.removeEventListener("keydown", handleKey);
		};
	}, []);

	const mobileWidthClass = mobileFull ? "max-sm:w-full" : "max-sm:w-auto";

	const buttonClassName = cn(
		//* essentials:
		"h-9",
		"text-primary/80 text-sm",

		"input",
		"flex w-full items-center justify-between text-left",
		"bg-background/40",
		"rounded-full border border-transparent",
		"focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/40",
		"rounded-full",
		"stroke-0",
		"border-0",
		"outline-0",

		mobileWidthClass,
		open && "border-border/40"
	);
	const chevronClassName = cn(
		"h-4 w-4 transition-transform",
		open && "rotate-180"
	);

	return (
		<div className="relative w-full" ref={containerRef}>
			<span id={labelId} className="sr-only">
				{label}
			</span>
			{open ? (
				<button
					type="button"
					className={buttonClassName}
					aria-haspopup="listbox"
					aria-labelledby={labelId}
					aria-expanded="true"
					onClick={() => setOpen((prev) => !prev)}
				>
					{iconOnMobile ? (
						<>
							<span className="hidden max-sm:inline">
								{iconOnMobile}
							</span>
							<span className="inline max-sm:hidden">
								{selectedLabel}
							</span>
						</>
					) : (
						<span className="inline">{selectedLabel}</span>
					)}
					<FiChevronDown
						aria-hidden="true"
						className={chevronClassName}
					/>
				</button>
			) : (
				<button
					type="button"
					className={buttonClassName}
					aria-haspopup="listbox"
					aria-labelledby={labelId}
					aria-expanded="false"
					onClick={() => setOpen((prev) => !prev)}
				>
					{iconOnMobile ? (
						<>
							<span className="hidden max-sm:inline">
								{iconOnMobile}
							</span>
							<span className="inline max-sm:hidden">
								{selectedLabel}
							</span>
						</>
					) : (
						<span className="inline">{selectedLabel}</span>
					)}
					<FiChevronDown
						aria-hidden="true"
						className={chevronClassName}
					/>
				</button>
			)}
			{open && (
				<div
					role="listbox"
					aria-labelledby={labelId}
					className={cn(
						"absolute",
						"container level-2 glass",
						"left-0 z-1 mt-2 p-2 w-auto min-w-max",
						// on small screens anchor to the right so the popover grows left
						"max-sm:left-auto max-sm:right-0",
						"max-sm:origin-right",
						// "max-sm:max-w-[90vw]",
						"flex flex-col gap-1",
						"border border-transparent border-b-primary/10",
						"bg-background/80",
						"bg-background/90",
						"backdrop-blur-lg",
						"shadow-lg",
						// only enable wrapping/scrolling on small screens
						"max-sm:whitespace-normal",
						"max-sm:overflow-auto"
					)}
				>
					{options.map((option) => {
						const isSelected = option === resolvedValue;
						const optionClassName = cn(
							"w-full rounded-2xl px-4 py-2 text-left text-primary transition-colors",
							isSelected
								? "bg-primary/15 text-primary"
								: "hover:bg-primary/15"
						);
						const handleSelect = () => {
							onChange(option);
							setOpen(false);
						};

						return isSelected ? (
							<button
								key={option}
								type="button"
								role="option"
								aria-selected="true"
								className={optionClassName}
								onClick={handleSelect}
							>
								{option}
							</button>
						) : (
							<button
								key={option}
								type="button"
								role="option"
								aria-selected="false"
								className={optionClassName}
								onClick={handleSelect}
							>
								{option}
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default function TodoFilters({
	filter,
	setFilter,
	sortOrder,
	setSortOrder,
}: Props) {
	const filterOptions = Object.values(FILTER);
	const sortOptions = Object.values(SORT_ORDERS);

	return (
		<>
			<div className="flex flex-col gap-5 justify-end max-sm:flex-row max-sm:justify-end max-sm:gap-8 ">
				{/* <div className="flex flex-col gap-5 justify-end max-sm:hidden"> */}
				<div className="max-sm:flex-1 justify-items-start max-sm:justify-items-center max-sm:content-end">
					<Button
						type="solid"
						shape="pill"
						className={cn(
							"badge badge-neutral badge-xs",
							"@container",
							"h-6",
							"h-8",
							"px-8",
							"py-0",
							"z-20",
							"m-0 gap-0",
							"rounded-full",
							"text-background",
							"bg-foreground",

							"",
							"col-start-3 col-span-1 row-start-end",
							"self-end",
							"justify-self-end",
							"stroke-0 border-none outline-none ring-offset-none decoration-0",
							// max-sm responsive adjustments for Clear button
							// "max-sm:fixed max-sm:bottom-5 max-sm:right-5",
							"max-sm:flex",
							"hidden",
							"justify-self-start",

							"text-nowrap",
							""
						)}
					>
						Clear List
					</Button>
				</div>
				{/* <div className="flex flex-row gap-2 max-sm:w-full max-sm:flex-1"> */}
				<div className="flex max-sm:flex-row flex-col gap-2 max-sm:w-full max-sm:flex-1 max-sm:justify-end">
					<div className="flex flex-col gap-2 max-sm:flex-1">
						<h3
							className={cn(
								"text-md",
								"text-primary/70",
								"text-primary/80",
								"tracking-widest",
								"max-sm:hidden",
								"",
								""
							)}
						>
							Filter
						</h3>
						<DropdownField
							label="Filter todos"
							value={filter}
							options={filterOptions}
							onChange={setFilter}
							iconOnMobile={
								<PiSlidersHorizontal className="h-5 w-5" />
							}
							mobileFull={false}
						/>
					</div>
					<div className="flex flex-col gap-2 max-sm:flex-2 max-sm:w-full">
						<h3
							className={cn(
								"text-md",
								"text-primary/70",
								"text-primary/80",
								"tracking-widest",
								"max-sm:hidden",
								""
							)}
						>
							Sort by
						</h3>
						<DropdownField
							label="Sort todos"
							value={sortOrder}
							options={sortOptions}
							onChange={setSortOrder}
							mobileFull={true}
						/>
					</div>
				</div>
			</div>

			{/* max-sm:flex-row */}
		</>
	);
}
