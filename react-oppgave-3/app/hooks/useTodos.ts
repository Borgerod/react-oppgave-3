import { Dispatch, SetStateAction } from "react";

interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: number;
}

export default function useTodos(
	todos: Todo[],
	setTodos: Dispatch<SetStateAction<Todo[]>>
) {
	const createTask = (text: string): Todo => ({
		id: crypto.randomUUID(),
		title: text,
		completed: false,
		createdAt: Date.now(),
	});

	const addTask = (text: string) => {
		setTodos((prev: Todo[]) => [...prev, createTask(text)]);
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
