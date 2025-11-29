"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "@/app/components/Button";
import { FiChevronDown } from "react-icons/fi";
import { cn } from "@/app/lib/utils";

export default function PeriodSelect() {
	const OPTIONS = ["all", "today", "tomorrow", "this week", "this month"];

	const [selected, setSelected] = useState<string>("today");

	function capitalizeWords(s: string) {
		return s
			.split(" ")
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join(" ");
	}

	const displayText = capitalizeWords(selected);

	const containerRef = useRef<HTMLDivElement | null>(null);
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const popoverRef = useRef<HTMLDivElement | null>(null);
	const [open, setOpen] = useState<boolean>(false);
	const [popoverStyle, setPopoverStyle] = useState<
		{ right?: number; top?: number } | undefined
	>(undefined);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			const target = event.target as Node;
			if (!wrapperRef.current) return;
			if (wrapperRef.current.contains(target)) return;
			// click outside the wrapper (trigger + popover) -> close
			setOpen(false);
		}

		function handleKey(event: KeyboardEvent) {
			if (event.key === "Escape") setOpen(false);
		}

		document.addEventListener("mousedown", handleClick);
		document.addEventListener("keydown", handleKey);

		return () => {
			document.removeEventListener("mousedown", handleClick);
			document.removeEventListener("keydown", handleKey);
		};
	}, []);

	useEffect(() => {
		function updatePosition() {
			if (!wrapperRef.current) return;
			// find the actual button inside the wrapper to anchor to
			const btn = wrapperRef.current.querySelector("button");
			if (!btn) return;
			const rect = btn.getBoundingClientRect();
			const scrollX = window.scrollX || 0;
			const scrollY = window.scrollY || 0;
			const right = Math.round(window.innerWidth - rect.right - scrollX);
			const top = Math.round(rect.bottom + scrollY);
			setPopoverStyle({ right, top });
		}

		if (open) {
			updatePosition();
			window.addEventListener("resize", updatePosition);
			window.addEventListener("scroll", updatePosition, true);
		}

		return () => {
			window.removeEventListener("resize", updatePosition);
			window.removeEventListener("scroll", updatePosition, true);
		};
	}, [open]);

	useEffect(() => {
		function updateIsMobile() {
			if (typeof window === "undefined") return;
			setIsMobile(window.innerWidth <= 640);
		}

		updateIsMobile();
		window.addEventListener("resize", updateIsMobile);
		return () => window.removeEventListener("resize", updateIsMobile);
	}, []);

	return (
		<div
			className={cn(
				"row-start-1 col-start-2 col-span-2",
				"justify-self-end",
				"self-start",
				"grid grid-cols-3 items-center",
				"justify-items-center",
				"content-center",
				"relative",
				"max-sm:pr-2",
				"",
				""
			)}
		>
			<div
				id="select-display"
				className={cn(
					"badge badge-neutral badge-xs",
					"@container",
					"h-6",
					"h-8",
					"px-8",
					"py-0",
					"m-0 gap-0",
					"rounded-full",
					"text-background",
					"bg-foreground",
					"pointer-events-none",
					"col-start-1 col-span-2",
					"stroke-0 border-none outline-none ring-offset-none decoration-0",
					""
				)}
				role="button"
				aria-label="Period: Today"
			>
				{displayText}
			</div>

			<div ref={wrapperRef} className="relative">
				<Button
					type="solid"
					shape="circle"
					className={cn(
						"relative",
						"select",
						"badge badge-neutral badge-xs",
						"@container",
						"m-0 gap-0",
						"h-8",
						"p-2",
						"rounded-full",
						"text-background",
						"bg-foreground",
						"stroke-0 border-none outline-none ring-offset-none decoration-0",
						"col-start-3 col-span-1",
						"stroke-none border-none outline-none",
						"",
						""
					)}
					onClick={() => setOpen((v) => !v)}
				>
					<FiChevronDown className="-rotate-90"></FiChevronDown>
				</Button>

				{open && (
					<div
						ref={containerRef}
						role="listbox"
						aria-label="Select period"
						className={cn(
							"absolute",
							"container level-2 glass",
							"left-0 z-1 mt-2 p-2 w-auto min-w-max",
							// on small screens anchor to the right so the popover grows left
							"max-sm:left-auto max-sm:right-0",
							"max-sm:origin-right",

							"left-auto right-0",
							"origin-right",
							// "max-sm:max-w-[90vw]",
							"flex flex-col gap-1",
							"border border-transparent border-b-primary/10",
							"bg-background/80",
							"bg-background/90",
							"backdrop-blur-lg",
							"shadow-lg",
							// only enable wrapping on small screens
							"max-sm: whitespace-normal",
							"whitespace-normal",
							"w-full",
							"absolute top-(--popover-top) z-9999",
							""
						)}
					>
						{OPTIONS.map((opt) => {
							const isSelected = opt === selected;
							const optionClassName = cn(
								"w-full rounded-2xl px-4 py-2 text-left text-primary transition-colors",
								isSelected
									? "bg-primary/15 text-primary"
									: "hover:bg-primary/15"
							);
							if (isSelected) {
								return (
									<button
										key={opt}
										type="button"
										role="option"
										aria-selected="true"
										className={optionClassName}
										onClick={() => {
											setSelected(opt);
											setOpen(false);
										}}
									>
										{capitalizeWords(opt)}
									</button>
								);
							} else {
								return (
									<button
										key={opt}
										type="button"
										role="option"
										aria-selected="false"
										className={optionClassName}
										onClick={() => {
											setSelected(opt);
											setOpen(false);
										}}
									>
										{capitalizeWords(opt)}
									</button>
								);
							}
						})}
					</div>
				)}
			</div>

			{/* BINDER between the buttons */}
			<div
				className={cn(
					"justify-items-center",
					"items-center",
					"m-0 gap-4",
					"absolute",
					"row-start-1",
					"-z-10",
					"ml-0.5",
					"col-start-2 col-span-2",
					"grid grid-cols-1 grid-rows-2",
					"",
					""
				)}
			>
				<div
					className={cn(
						"rounded-full",
						"bg-container",
						"row-start-1 col-start-1 col-span-1",
						"h-3 w-3",
						"h-2.5 w-2.5",
						"mr-px",
						"",
						""
					)}
				></div>
				<div
					className={cn(
						"rounded-full",
						"bg-foreground",
						"row-start-1 row-span-2 col-start-1 col-span-1",
						"h-6 w-10",
						"h-5 w-10",
						"-z-1",
						"",
						""
					)}
				></div>
				<div
					className={cn(
						"rounded-full",
						"bg-container",
						"row-start-2 col-start-1 col-span-1",
						"h-3 w-3",
						"h-2.5 w-2.5",
						"mr-px",
						"",
						""
					)}
				></div>
			</div>
		</div>
	);
}
