import React from "react";
import TaskCard from "@/app/components/TaskCard";
import { StylizedCircle } from "@/app/components/accessories/StylizedCircle";
import { cn } from "@/app/lib/utils";
import Button from "../Button";
import PeriodSelect from "./PeriodSelect";
import { FiChevronDown } from "react-icons/fi";
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
}

export default function TodoList({
	todos,
	onDelete,
	onToggle,
	onEdit,
	onClear,
}: TodoListProps) {
	const { dayName, dayOrdinal } = getCurrentDate();
	if (!Array.isArray(todos)) return null;

	return (
		<section
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
			)}
		>
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
				)}
			>
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
					)}
				>
					<div
						className={cn(
							"flex flex-col",
							"justify-self-center items-start",
							"text-left",
							"row-start-1 col-start-1 col-span-1",
							"relative z-50 max-sm:z-50"
						)}
					>
						<h1 className="text-3xl text-primary"> {dayName} </h1>
						<h1 className="text-3xl text-primary/30">
							{" "}
							{dayOrdinal}{" "}
						</h1>
					</div>
					<PeriodSelect />
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
					)}
				>
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
				)}
			></div>
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
				onClick={() => onClear && onClear()}
			>
				Clear
			</Button>
		</section>
	);
}
