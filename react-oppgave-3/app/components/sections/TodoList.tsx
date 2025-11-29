import React, { useEffect, useRef, useState, useCallback } from "react";
import TaskCard from "@/app/components/TaskCard";
import { StylizedCircle } from "@/app/components/accessories/StylizedCircle";
import { cn } from "@/app/lib/utils";
import Button from "../Button";
import PeriodSelect from "./PeriodSelect";
// import { FiChevronDown } from "react-icons/fi";
import { getCurrentDate } from "@/app/lib/getDate";

interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: number;
	due: number;
	for: number;
}

interface TodoListProps {
	todos: Todo[];
	onDelete: (id: string) => void;
	onToggle: (id: string) => void;
	onEdit: (id: string, newText: string) => void;
	onClear?: () => void;
	period?: string;
	onPeriodChange?: (v: string) => void;
}

export default function TodoList({
	todos,
	onDelete,
	onToggle,
	onEdit,
	onClear,
	period,
	onPeriodChange,
}: TodoListProps) {
	const containerRef = useRef<HTMLElement | null>(null);
	const dragging = useRef(false);
	const startXRef = useRef(0);
	const startWidthRef = useRef(0);
	const [width, setWidth] = useState<number | undefined>(undefined);
	const [isMobile, setIsMobile] = useState(false);

	// const MIN_WIDTH = 200; // px
	const MIN_WIDTH = 310; // px
	const MAX_WIDTH =
		typeof window !== "undefined"
			? Math.max(600, window.innerWidth - 100)
			: 2000;

	const pointerHandlersRef = useRef<{
		move?: EventListener;
		up?: EventListener;
	}>({});

	const onPointerMove = useCallback(
		(e: PointerEvent) => {
			if (!dragging.current) return;
			const delta = e.clientX - startXRef.current;
			const newW = Math.max(
				MIN_WIDTH,
				Math.min(MAX_WIDTH, startWidthRef.current + delta)
			);
			setWidth(newW);
		},
		[MIN_WIDTH, MAX_WIDTH]
	);

	const onPointerUp = useCallback(() => {
		dragging.current = false;
		if (pointerHandlersRef.current.move)
			window.removeEventListener(
				"pointermove",
				pointerHandlersRef.current.move
			);
		if (pointerHandlersRef.current.up)
			window.removeEventListener(
				"pointerup",
				pointerHandlersRef.current.up
			);
		pointerHandlersRef.current = {};
	}, []);

	useEffect(() => {
		function updateSizes() {
			const mobile =
				typeof window !== "undefined"
					? window.innerWidth <= 640
					: false;
			setIsMobile(mobile);
			if (!mobile && containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				setWidth(rect.width);
			} else {
				// on mobile let layout be responsive (no fixed width)
				setWidth(undefined);
			}
			if (mobile && dragging.current) {
				// if switching to mobile while dragging, stop dragging and remove listeners
				onPointerUp();
			}
		}

		updateSizes();

		function onResize() {
			updateSizes();
			const mobileNow =
				typeof window !== "undefined"
					? window.innerWidth <= 640
					: false;
			if (!mobileNow) {
				setWidth((w) => {
					if (!w) return w;
					return Math.min(
						Math.max(w, MIN_WIDTH),
						window.innerWidth - 100
					);
				});
			}
		}

		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [onPointerUp]);

	function onPointerDown(e: React.PointerEvent) {
		// don't start resizing when in mobile mode
		if (isMobile) return;
		e.preventDefault();
		if (e.pointerType === "mouse" || e.pointerType === "touch") {
			dragging.current = true;
			startXRef.current = e.clientX;
			startWidthRef.current =
				containerRef.current?.getBoundingClientRect().width || 0;
			pointerHandlersRef.current.move = onPointerMove as EventListener;
			pointerHandlersRef.current.up = onPointerUp as EventListener;
			window.addEventListener(
				"pointermove",
				pointerHandlersRef.current.move
			);
			window.addEventListener("pointerup", pointerHandlersRef.current.up);
		}
	}

	const { dayName: todayName, dayOrdinal: todayOrdinal } = getCurrentDate();

	function ordinal(n: number) {
		const s = ["th", "st", "nd", "rd"];
		const v = n % 100;
		if (v >= 11 && v <= 13) return `${n}th`;
		const t = n % 10;
		return `${n}${s[t] || s[0]}`;
	}

	function getISOWeekNumber(d: Date) {
		const date = new Date(
			Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
		);
		// Thursday in current week decides the year.
		date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
		const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
		const weekNo = Math.ceil(
			((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
		);
		return weekNo;
	}

	const now = new Date();
	const tomorrow = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate() + 1
	);

	// headerPrimary = main title, headerSecondary = subtitle (ordinal)
	let headerPrimary = todayName;
	let headerSecondary = todayOrdinal;

	if (period === "tomorrow") {
		const name = tomorrow.toLocaleDateString(undefined, {
			weekday: "short",
		});
		headerPrimary = name;
		headerSecondary = ordinal(tomorrow.getDate());
	} else if (period === "this week") {
		const wn = getISOWeekNumber(now);
		headerPrimary = `Week ${wn}`;
		headerSecondary = "";
	} else if (period === "this month") {
		let m = now.toLocaleDateString(undefined, { month: "short" });
		// add a dot like `Dec.` if not present
		if (!m.endsWith(".")) m = `${m}.`;
		headerPrimary = m;
		headerSecondary = "";
	} else if (period === "all") {
		headerPrimary = "All";
		headerSecondary = "";
	}
	if (!Array.isArray(todos)) return null;

	return (
		<section
			ref={(el) => {
				containerRef.current = el;
			}}
			style={{ width: width ? `${width}px` : undefined }}
			className={cn(
				"@Container",
				"container level-1",
				"grid",
				"relative",
				"min-h-0",
				"h-full",
				"col-start-3 col-span-full row-start-1 row-span-4",
				"grid-cols-subgrid grid-rows-subgrid",
				"grid-cols-3 grid-rows-subgrid",
				"max-w-300 min-w-50",
				"gap-0",
				//
				// max-sm responsive adjustments
				"max-sm:col-start-1",
				"max-sm:col-span-full",
				"max-sm:row-start-2",
				"max-sm:row-span-1",
				// "max-sm:row-start-1",
				"max-sm:row-span-full",
				"max-sm:grid max-sm:grid-cols-3 max-sm:grid-rows-[1fr]",
				"max-sm:w-full",
				"max-sm:min-h-0",
				"max-sm:overflow-hidden",
				"max-sm:max-w-full max-sm:min-w-0",
				"max-sm:p-2.5",
				// "max-sm:bg-container/60",
				// "max-sm:backdrop-blur-xl",
				"",
				""
			)}>
			<div
				className={cn(
					"z-10 col-start-1 row-start-1 col-span-full row-span-full ",
					"max-sm:z-50",
					"grid grid-cols-subgrid grid-rows-[auto_1fr]",
					"items-start place-content-start",
					"py-5",
					"pb-10",
					// "max-sm:pb-50",
					"gap-2",
					"min-h-0",
					"h-full",
					//
					// max-sm responsive adjustments for inner container
					"max-sm:grid max-sm:grid-cols-3 max-sm:auto-rows-min",
					"max-sm:w-full",
					"max-sm:min-h-0",
					"max-sm:overflow-y-auto max-sm:overflow-x-hidden",
					// "max-sm:px-4",
					"max-sm:pb-20",
					"",
					""
				)}>
				<div
					className={cn(
						"row-start-1 col-start-1 col-span-full",
						"grid grid-cols-subgrid grid-rows-subgrid",
						// max-sm responsive adjustments for header
						// "max-sm:grid max-sm:grid-cols-2",
						"max-sm:grid max-sm:grid-cols-3",
						"max-sm:w-full max-sm:mb-4",
						"",
						""
					)}>
					<div
						className={cn(
							"flex flex-col",
							"justify-self-center items-start",
							"text-left",
							"row-start-1 col-start-1 col-span-1",
							"relative z-50 max-sm:z-50"
						)}>
						<h1 className="text-3xl text-primary">
							{" "}
							{headerPrimary}{" "}
						</h1>
						<h1 className="text-3xl text-primary/30">
							{" "}
							{headerSecondary}{" "}
						</h1>
					</div>
					<PeriodSelect value={period} onChange={onPeriodChange} />
				</div>
				{/* {todos.map((t) => (
					<TaskCard
						key={t.id}
						task={t}
						onDelete={onDelete}
						onToggle={onToggle}
						onEdit={onEdit}
					/>
				))} */}
				<div
					className={cn(
						"w-full h-full max-h-full overflow-auto",
						"grid grid-cols-1 auto-rows-min gap-2",
						"row-start-2 col-start-1 col-span-full",
						"max-sm:overflow-auto",

						"",
						""
					)}>
					{todos.map((t) => (
						<TaskCard
							key={t.id}
							task={t}
							onDelete={onDelete}
							onToggle={onToggle}
							onEdit={onEdit}
						/>
					))}
				</div>
			</div>
			{/* <StylizedCircle className="grid row-start-2 row-span-2 col-start-1 col-span-full m-10 max-sm:row-start-1 max-sm:row-span-full max-sm:col-start-1 max-sm:col-span-full max-sm:place-self-center max-sm:m-0 max-sm:z-0" /> */}
			<StylizedCircle
				className={cn(
					"grid row-start-2 row-span-2 col-start-1 col-span-full m-10",
					//
					"max-sm:row-start-1",
					"max-sm:row-span-full",
					"max-sm:col-start-1",
					"max-sm:col-span-full",
					"max-sm:self-center",
					"max-sm:z-10",
					"",
					""
				)}
			/>

			<div
				className={cn(
					"@Container",
					"container level-2 glass",
					"backdrop-blur-support",
					"grid",
					"col-start-1 col-span-1 row-start-1 row-span-full",
					"flex flex-col ",
					"items-center",
					"",
					// max-sm responsive adjustments
					"max-sm:col-start-1 max-sm:col-span-1",
					"max-sm:row-start-1 max-sm:row-span-full",
					"max-sm:z-15",
					""
				)}></div>
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
					"max-sm:fixed max-sm:bottom-5 max-sm:right-5",
					"max-sm:hidden",
					""
				)}
				onClick={() => onClear && onClear()}>
				Clear
			</Button>
			{/* draggable resize handle (disabled and not rendered in mobile mode) */}
			{!isMobile && (
				<div
					role="separator"
					aria-orientation="vertical"
					onPointerDown={onPointerDown}
					className={cn(
						"absolute top-0 right-0 h-full w-3",
						"cursor-col-resize z-40 bg-transparent hover:bg-foreground/10"
					)}
				/>
			)}
		</section>
	);
}
