"use client";
import { cn } from "@/app/lib/utils";
import { useState, Dispatch, SetStateAction } from "react";
import { FILTER, SORT_ORDERS } from "@/app/lib/filterConfig.js";
import { sortArray, toggleFilters } from "@/app/lib/filters";
import { useLocalStorage } from "@/app/hooks/useLocalStorage.js";
// import useUserLocale from "@/app/hooks/useUserLocale";
import { useUserLocale } from "@/app/hooks/useUserLocale";
import useTodos from "@/app/hooks/useTodos";
import { filterByPeriod } from "@/app/lib/filters";
import TodoList from "@/app/components/sections/TodoList";
import TodoForm from "@/app/components/sections/TodoForm";
import Theme from "@/app/components/sections/Theme";
// TODO [ ]: Add mobile layout: themebutton stick to bottom, form as header, list as body.

interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: number;
	due: number;
	for: number;
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
	const [period, setPeriod] = useState<string>("today");
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

	const clearAll = () => {
		setTodos([]);
	};

	return (
		<main
			className={cn(
				"@Container",
				"flex flex-col",
				// "sm:items-center",
				// "items-center",
				"justify-center",
				"w-full max-w-3xl min-w-xl",
				"min-h-screen",
				"h-screen",
				//

				"max-sm:justify-between",
				"max-sm:min-w-0",
				"max-sm:max-w-full",
				"max-sm:overflow-hidden",
				""
			)}>
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
					"bg-transparent",
					//

					"max-sm:grid-cols-1",
					"max-sm:h-full",
					"max-sm:grid-rows-[auto_1fr]",
					"max-sm:p-0",
					"max-sm:p-3", //> temp
					"max-sm:overflow-x-hidden",
					"max-sm:gap-3",
					"max-sm:gap-0",
					""
				)}>
				{/*//* ___ TODO FORM __________________________________________________________________________________________________ */}
				<TodoForm
					onAdd={addTask}
					filter={filter}
					setFilter={setFilter}
					sortOrder={sortOrder}
					setSortOrder={setSortOrder}
					onClear={clearAll}
				/>
				{/*//* ___ DARK MODE __________________________________________________________________________________________________ */}

				<Theme />

				{/*//* ___ TODO LIST __________________________________________________________________________________________________ */}
				<TodoList
					todos={
						sortArray(
							filterByPeriod(
								toggleFilters(todos, filter),
								period
							),
							sortOrder,
							userLocale.locale
						) as Todo[]
					}
					onDelete={deleteTask}
					onToggle={toggleComplete}
					onEdit={editTask}
					onClear={clearAll}
					period={period}
					onPeriodChange={setPeriod}
				/>
			</div>
		</main>
	);
}
