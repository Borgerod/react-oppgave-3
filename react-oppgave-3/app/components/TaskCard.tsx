import { cn } from "@/app/lib/utils";
import React, { useState } from "react";
import { formatTimestamp } from "@/app/lib/formatTimeStamp";
import { IoIosClose } from "react-icons/io";

interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: number;
}

interface TaskCardProps {
	task: Todo;
	onDelete: (id: string) => void;
	onToggle: (id: string) => void;
	onEdit: (id: string, newText: string) => void;
}

export default function TaskCard({
	task,
	onDelete,
	onToggle,
	onEdit,
}: TaskCardProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [newText, setNewText] = useState<string>(task.title || "");

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (newText.trim()) {
			onEdit(task.id, newText.trim());
			setIsEditing(false);
		}
	};

	if (isEditing) {
		return (
			<div className="border border-/40 rounded-md flex flex-row flex-nowrap bg-gray-800 text-white/50">
				<form
					onSubmit={onSubmit}
					className="flex w-full items-center gap-2 p-2"
				>
					<input
						type="text"
						value={newText}
						onChange={(e) => setNewText(e.target.value)}
						className="flex-1 bg-transparent text-white"
						aria-label={`Edit ${task.title}`}
					/>
					<button
						type="submit"
						className="px-3 py-1 bg-primary rounded"
					>
						Save
					</button>
					<button
						type="button"
						className="px-3 py-1 bg-gray-600 rounded"
						onClick={() => {
							setNewText(task.title);
							setIsEditing(false);
						}}
					>
						Cancel
					</button>
				</form>
			</div>
		);
	}

	return (
		<label
			className={cn(
				"col-start-1 col-span-full",
				"w-full",
				"grid grid-cols-3 items-start justify-between",
				"self-start",
				""
			)}
		>
			<div
				className={cn(
					"h-5",
					"h-full w-full",
					"justify-center",
					"col-start-1 col-span-1",
					"flex",
					""
				)}
			>
				<input
					type="checkbox"
					checked={task.completed}
					onChange={() => onToggle(task.id)}
					aria-label={`Toggle ${task.title} completed`}
					title={`Toggle ${task.title} completed`}
					className={cn(
						"checkbox",
						"checked:bg-primary/80",
						"border-secondary  checked:border-seconadry",
						"border-primary/20  checked:border-seconadry",
						"border-primary/0  checked:border-seconadry",
						"animate-none",
						"checked:transition-none",
						"self-center",
						"checked: shadow-none",
						"bg-primary/10",
						"bg-background/60",
						"border border-transparent",
						"border-primary/10",
						"border-primary/5",
						"checked:text-background",
						"checked:text-container/70",
						"checked:text-secondary",
						""
					)}
				/>
			</div>
			<div
				className={cn(
					"col-start-2 col-span-2 ",
					"flex flex-row w-full",

					""
				)}
			>
				<fieldset
					className={cn(
						"fieldset",
						"w-xs ",
						"ml-2",
						"col-start-2 col-span-1 ",
						"text-primary ",
						"select-none text-nowrap",
						" justify-self-start",
						"self-center",
						"bg-container/20 rounded-xl ",
						"w-full px-2 ",
						"container level-3 glass",
						task.completed ? "line-through text-primary/50" : "",
						""
					)}
				>
					<div className="flex flex-col overflow-hidden">
						{task.title}
						<p className="label">
							{formatTimestamp(task.createdAt)}
						</p>
					</div>
					<button
						type="button"
						onClick={() => onDelete(task.id)}
						className={cn(
							"text-2xl m-0 p-0 hover:text-primary/40 text-primary",
							"col-start-3 col-span-1 ",
							"text-primary ",
							"select-none text-nowrap",
							"text-end justify-self-end",
							"self-start",
							"p-0 -mx-1.5 -my-1",
							""
						)}
						aria-label="Delete task"
					>
						<IoIosClose className="" />
					</button>
				</fieldset>
			</div>
		</label>
	);
}
