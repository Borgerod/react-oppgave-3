"use client";
import { cn } from "@/app/lib/utils";
import { useState, Dispatch, SetStateAction } from "react";
import { FILTER, SORT_ORDERS } from "@/app/lib/filterConfig.js";
import { sortArray, toggleFilters } from "@/app/lib/filters";
import { useLocalStorage } from "@/app/hooks/useLocalStorage.js";
import useUserLocale from "@/app/hooks/useUserLocale";
import useTodos from "@/app/hooks/useTodos";
import TodoList from "@/app/components/sections/TodoList";
import TodoForm from "@/app/components/sections/TodoForm";
import Theme from "@/app/components/sections/Theme";

interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: number;
}

interface TodoItem {
	title: string;
	date: Date;
	completed: boolean;
	id: string;
}

export default function Todo() {
	const [filter, setFilter] = useState(FILTER.ALL);
	const [sortOrder, setSortOrder] = useState(SORT_ORDERS.NEW_OLD);
	const userLocale = useUserLocale();

	const _todosTuple = useLocalStorage("todo", []) as [
		Todo[] | undefined,
		Dispatch<SetStateAction<Todo[]>>
	];
	const [todos, setTodos] = _todosTuple as [
		Todo[],
		Dispatch<SetStateAction<Todo[]>>
	];

	const { addTask, deleteTask, toggleComplete, editTask } = useTodos(
		todos,
		setTodos
	);

	return (
		<main
			className={cn(
				"flex flex-col",
				"sm:items-center",
				"justify-center",
				"w-full max-w-3xl min-w-xl",
				"min-h-screen",
				"h-screen",
				"",
				""
			)}
		>
			<div
				className={cn(
					"@Container",
					"flex flex-col",
					"grid",
					"grid-cols-4 grid-rows-4",
					"py-32 px-16 ",
					"gap-5",
					"h-200",
					"w-full",
					"bg-transparent"
				)}
			>
				{/*//* ___ TODO FORM __________________________________________________________________________________________________ */}
				<TodoForm
					onAdd={addTask}
					filter={filter}
					setFilter={setFilter}
					sortOrder={sortOrder}
					setSortOrder={setSortOrder}
				/>
				{/*//* ___ DARK MODE __________________________________________________________________________________________________ */}

				<Theme />

				{/*//* ___ TODO LIST __________________________________________________________________________________________________ */}
				<TodoList
					todos={
						sortArray(
							toggleFilters(todos, filter),
							sortOrder,
							userLocale
						) as Todo[]
					}
					onDelete={deleteTask}
					onToggle={toggleComplete}
					onEdit={editTask}
				/>
			</div>
		</main>
	);
}
