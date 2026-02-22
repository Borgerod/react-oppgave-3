"use client";
import { cn } from "@/app/lib/utils";
import { useState } from "react";
import { FILTER, SORT_ORDERS } from "@/app/lib/filterConfig.js";
import { sortArray, toggleFilters } from "@/app/lib/filters";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

import useTodos from "@/app/hooks/useTodos";
import { filterByPeriod } from "@/app/lib/filters";
import TodoList from "@/app/components/sections/TodoList";
import TodoForm from "@/app/components/sections/TodoForm";
import Theme from "@/app/components/sections/Theme";
import { useGeolocation } from "@/app/hooks/useGeolocation";
// TODO [ ]: Add mobile layout: themebutton stick to bottom, form as header, list as body.

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  due: number;
  for: number;
}

export default function Todo() {
  const [filter, setFilter] = useState(FILTER.ALL);
  const [sortOrder, setSortOrder] = useState(SORT_ORDERS.NEW_OLD);
  const [period, setPeriod] = useState<string>("today");
  const geoLocation = useGeolocation();

  const [todos, setTodos] = useLocalStorage<Todo[]>("todo", []);

  const { addTask, deleteTask, toggleComplete, editTask } = useTodos(
    todos,
    setTodos,
  );

  const clearAll = () => {
    setTodos([]);
  };

  return (
    <main
      className={cn(
        "@Container",
        "flex flex-col",
        "justify-center",
        "w-full max-w-3xl min-w-xl",
        "min-h-screen",
        "h-screen",
        "max-sm:justify-between",
        "max-sm:min-w-0",
        "max-sm:max-w-full",
        "max-sm:overflow-hidden",
        "",
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
          "bg-transparent",
          "max-sm:grid-cols-1",
          "max-sm:h-full",
          "max-sm:grid-rows-[auto_1fr]",
          "max-sm:p-3",
          "max-sm:overflow-x-hidden",
          "max-sm:gap-3",
          "max-sm:gap-0",
          "",
        )}
      >
        {/* * ___ TODO FORM __________________________________________________________________________________________________ */}
        <TodoForm
          onAdd={addTask}
          filter={filter}
          setFilter={setFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          onClear={clearAll}
        />
        {/* * ___ DARK MODE __________________________________________________________________________________________________ */}

        <Theme />

        {/* * ___ TODO LIST __________________________________________________________________________________________________ */}
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
    </main>
  );
}
