import React from "react";
import TaskCard from "@/app/components/TaskCard";
import { StylizedCircle } from "@/app/components/accessories/StylizedCircle";
import { cn } from "@/app/lib/utils";
import Button from "../Button";
import { FiChevronDown } from "react-icons/fi";

interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: number;
}

interface TodoListProps {
	todos: Todo[];
	onDelete: (id: string) => void;
	onToggle: (id: string) => void;
	onEdit: (id: string, newText: string) => void;
}

export default function TodoList({
	todos,
	onDelete,
	onToggle,
	onEdit,
}: TodoListProps) {
	if (!Array.isArray(todos)) return null;

	return (
		<section
			className={cn(
				"@Container",
				"container level-1",
				"grid",
				"relative",
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
					"grid grid-cols-subgrid grid-rows-auto ",
					"items-start place-content-start",
					"py-5",
					"gap-2",
					//
					// max-sm responsive adjustments for inner container
					"max-sm:grid max-sm:grid-cols-3 max-sm:auto-rows-min",
					"max-sm:w-full",
					"max-sm:min-h-0",
					"max-sm:overflow-y-auto max-sm:overflow-x-hidden",
					// "max-sm:px-4",
					"max-sm:pb-16",
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
						""
					)}
				>
					<div
						className={cn(
							"flex flex-col ",
							" justify-self-center items-start ",
							"text-left ",
							"row-start-1 col-start-1 col-span-1"
						)}
					>
						{/* // TODO [ ]: Make date-getter */}
						<h1 className="text-3xl text-primary"> Thu </h1>
						<h1 className="text-3xl text-primary/30"> 24th </h1>
					</div>
					<div
						className={cn(
							"row-start-1 col-start-2 col-span-2",
							"justify-self-end ",
							"self-start",
							"grid grid-cols-3 items-center ",
							"justify-items-center",
							"content-center",
							" relative",
							"max-sm:pr-2",
							""
						)}
					>
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
								"m-0 gap-0",
								"rounded-full",
								"text-background",
								"bg-foreground",
								"",

								"col-start-1 col-span-2",
								"stroke-0 border-none outline-none ring-offset-none decoration-0",
								""
							)}
							// todo: make this a select
						>
							Today
						</Button>
						<Button
							type="solid"
							shape="circle"
							className={cn(
								"select",
								"badge badge-neutral badge-xs",
								"@container",
								"m-0 gap-0",
								"h-8",
								"p-2",
								"rounded-full",
								"text-background",
								"bg-foreground",
								"",
								"stroke-0 border-none outline-none ring-offset-none decoration-0",
								"col-start-3 col-span-1",
								"stroke-none border-none outline-none",
								""
							)}
						>
							<FiChevronDown className="-rotate-90"></FiChevronDown>
						</Button>

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
				</div>
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
					"grid",
					"col-start-1 col-span-1 row-start-1 row-span-full",
					"flex flex-col ",
					"items-center",
					"",
					// max-sm responsive adjustments
					"max-sm:col-start-1 max-sm:col-span-1",
					"max-sm:row-start-1 max-sm:row-span-full",
					"max-sm:z-1",
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
			>
				Clear
			</Button>
		</section>
	);
}
