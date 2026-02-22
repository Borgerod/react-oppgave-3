"use client";
import { useState } from "react";
import TodoList from "../components/sections/TodoList";
import { useGeolocation } from "../hooks/useGeolocation";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useTodos from "../hooks/useTodos";
import { FILTER, SORT_ORDERS } from "../lib/filterConfig";
import { filterByPeriod, sortArray, toggleFilters } from "../lib/filters";
import { cn } from "../lib/utils";
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
export default function TestPage() {
  const [filter, setFilter] = useState(FILTER.ALL);
  const [sortOrder, setSortOrder] = useState(SORT_ORDERS.NEW_OLD);
  const [period, setPeriod] = useState<string>("today");
  const { location: geoLocation } = useGeolocation();

  const [todos, setTodos] = useLocalStorage<Todo[]>("todo", []);

  const { addTask, deleteTask, toggleComplete, editTask } = useTodos(
    todos,
    setTodos,
  );

  const clearAll = () => {
    setTodos([]);
  };

  return (
    <div
      id="container"
      className={cn(
        // "@Container",
        "flex flex-col",
        "grid",
        // "grid-cols-4 grid-rows-4",
        // "grid-cols-4 grid-rows-4",
        "py-32 px-16 ",
        "gap-5",
        "h-200",
        "w-full",
        "bg-transparent",
        //

        // "max-sm:grid-cols-1",
        // "max-sm:h-full",
        // "max-sm:grid-rows-[auto_1fr]",
        // "max-sm:p-0",
        // "max-sm:p-3", //> temp
        // "max-sm:overflow-x-hidden",
        // "max-sm:gap-3",
        // "max-sm:gap-0",
        "",
      )}
    >
      {/* {todos.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))} */}
      <TodoList
        todos={
          sortArray(
            filterByPeriod(toggleFilters(todos, filter), period),
            sortOrder,
          ) as Todo[]
        }
        onDelete={deleteTask}
        onToggle={toggleComplete}
        onEdit={editTask}
        onClear={clearAll}
        period={period}
        onPeriodChange={setPeriod}
        locationCity={geoLocation?.city || ""}
      />
    </div>
  );
}
