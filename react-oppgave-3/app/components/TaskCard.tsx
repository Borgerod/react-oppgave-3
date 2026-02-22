"use client";
import { cn } from "@/app/lib/utils";
import React, { useState, useEffect } from "react";
import { formatTimestamp } from "@/app/lib/formatTimeStamp";
import { IoIosCheckmark, IoIosClose } from "react-icons/io";
import Button from "./Button";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  due: number;
  for: number;
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function updateIsMobile() {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth <= 640);
    }

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newText.trim()) {
      onEdit(task.id, newText.trim());
      setIsEditing(false);
    }
  };

  return (
    <div
      className={cn(
        "col-start-1 col-span-full",
        "w-full",
        "grid grid-cols-3 items-start justify-between",
        "grid grid-cols-[auto_1fr_1fr] items-start justify-between",
        "self-start",
        "relative z-50 max-sm:z-50",
        "",
      )}
    >
      <label
        className={cn(
          "h-5",
          "h-full w-full",
          "justify-center",
          "col-start-1 col-span-1",
          "flex",
          "w-30",
          "",
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
            "relative z-50 max-sm:z-50",
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
            "",
          )}
        />
      </label>

      <div className={cn("col-start-2 col-span-2", "flex flex-row w-full", "")}>
        <fieldset
          id="todo-item-container"
          className={cn(
            "fieldset",
            "w-full",
            "ml-3",
            "col-start-2 col-span-1",
            "text-primary ",
            "select-none",
            "justify-self-start",
            "self-center",
            "bg-container/20 rounded-xl",
            "px-2",
            "container level-3 glass",
            "backdrop-blur-support",
            "overflow-visible",
            task.completed ? "line-through text-primary/50" : "",
            "",
          )}
        >
          <div className="flex flex-col min-w-0 ">
            <div
              className="overflow-hidden whitespace-nowrap font-medium "
              onDoubleClick={!isMobile ? () => setIsEditing(true) : undefined}
              onClick={isMobile ? () => setIsEditing(true) : undefined}
            >
              {isEditing ? (
                <form
                  onSubmit={onSubmit}
                  className={cn("col-span-full", "flex", "", "", "")}
                >
                  <input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    className={cn(
                      "contents",
                      "text-primary w-full flex min-w-0",
                      "text-primary/80",
                      "outline-none",
                      "bg-background/30",
                      "rounded-md",
                      "text-wrap",
                      "",
                    )}
                    aria-label={`Edit ${task.title}`}
                  />

                  <Button
                    buttonType="submit"
                    className={cn(
                      "hover:text-primary/40 text-primary",
                      "text-xl",
                      "m-0 p-0",
                      "bg-transparent",
                      "h-full w-6",
                      "",
                    )}
                    aria-label="Delete task"
                  >
                    <IoIosCheckmark className="" />
                  </Button>
                  <Button
                    onClick={() => {
                      setNewText(task.title);
                      setIsEditing(false);
                    }}
                    className={cn(
                      "hover:text-primary/40 text-primary",
                      "text-xl",
                      "m-0 p-0",
                      "bg-transparent",
                      "h-full w-6",

                      "",
                    )}
                    aria-label="Delete task"
                  >
                    <IoIosClose className="" />
                  </Button>
                </form>
              ) : (
                task.title
              )}
            </div>
            <div className="flex mt-0.5 items-center text-[9px] min-w-0 overflow-visible justify-start gap-2 ">
              <div className="label flex items-center gap-0.5  min-w-fit">
                <span className="text-[9px] text-primary/70">For:</span>
                <time
                  className="inline-flex items-center gap-0.5 px-1  rounded-full bg-primary/10 border border-primary/10 text-[9px] text-primary/90 max-w-24 truncate"
                  title={task.for ? new Date(task.for).toLocaleString() : ""}
                  dateTime={task.for ? new Date(task.for).toISOString() : ""}
                >
                  {formatTimestamp(task.for, {
                    showTime: false,
                    showYear: false,
                  })}
                </time>
              </div>
              <div className="label flex items-center gap-0.5  min-w-fit">
                <span className="text-[9px] text-primary/70">Due:</span>
                <time
                  className="inline-flex items-center justify-center text-center gap-0.5 px-1 py-0.5 rounded-full bg-primary/10 border border-primary/10 text-[9px] text-primary/90 leading-none max-w-24 truncate"
                  title={task.due ? new Date(task.due).toLocaleString() : ""}
                  dateTime={task.due ? new Date(task.due).toISOString() : ""}
                >
                  {formatTimestamp(task.due, {
                    showTime: false,
                    showYear: false,
                  })}
                </time>
              </div>
            </div>
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
              isEditing ? "hidden" : "block",
              "",
            )}
            aria-label="Delete task"
          >
            <IoIosClose className="" />
          </button>
        </fieldset>
      </div>
    </div>
  );
}
