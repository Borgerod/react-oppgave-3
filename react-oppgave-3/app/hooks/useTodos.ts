import { Dispatch, SetStateAction } from "react";

interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: number;
	due: number;
	for: number;
}

export default function useTodos(
	todos: Todo[],
	setTodos: Dispatch<SetStateAction<Todo[]>>
) {
	const createTask = (
		text: string,
		forDate?: number,
		dueDate?: number
	): Todo => {
		const created = Date.now();
		const _for = forDate ?? created;
		const _due = dueDate ?? created;
		return {
			id: crypto.randomUUID(),
			title: text,
			completed: false,
			createdAt: created,
			for: _for,
			due: _due,
		};
	};

	const addTask = (text: string, forDate?: number, dueDate?: number) => {
		setTodos((prev: Todo[]) => [
			...prev,
			createTask(text, forDate, dueDate),
		]);
	};

	const deleteTask = (id: string) => {
		setTodos(todos.filter((task) => task.id !== id));
	};

	const toggleComplete = (id: string) => {
		setTodos((prev: Todo[]) =>
			prev.map((task: Todo) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	const editTask = (id: string, newText: string) => {
		setTodos((prev: Todo[]) =>
			prev.map((task: Todo) =>
				task.id === id ? { ...task, title: newText } : task
			)
		);
	};

	return { addTask, deleteTask, toggleComplete, editTask };
}
