"use client";
import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { cn } from "@/app/lib/utils";
import Button from "../Button";
import TodoFilters from "../TodoFilters";

type TodoFormProps = {
	onAdd: (text: string) => void;
	filter: string;
	setFilter: Dispatch<SetStateAction<string>>;
	sortOrder: string;
	setSortOrder: Dispatch<SetStateAction<string>>;
};

export default function TodoForm({
	onAdd,
	filter,
	setFilter,
	sortOrder,
	setSortOrder,
}: TodoFormProps) {
	const [text, setText] = useState<string>("");

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (text.trim()) {
			onAdd(text);
			setText("");
		}
	};

	return (
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
			</form>

			{/*//* Filters */}
			<TodoFilters {...{ filter, setFilter, sortOrder, setSortOrder }} />
		</section>
	);
}
