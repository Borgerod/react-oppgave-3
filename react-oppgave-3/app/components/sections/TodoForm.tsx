"use client";
import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { cn } from "@/app/lib/utils";
import Button from "../Button";
import TodoFilters from "../TodoFilters";
import { deriveDateFormat } from "@/app/lib/formatTimeStamp";
import DatePicker from "react-datepicker";
import { IoIosAdd } from "react-icons/io";

type DateFieldProps = {
  label: string;
  value: string;
  setValue: (v: string) => void;
  locale: string;
};

type TodoInputProps = {
  text: string;
  setText: (v: string) => void;
  error: boolean;
};

function TodoInput({ text, setText, error }: TodoInputProps) {
  return (
    <label
      className={cn(
        "h-9",
        "text-primary/80 text-sm",
        "input",
        "flex w-full items-center justify-between text-left",
        "bg-background/40",
        "rounded-full",
        "stroke-0",
        "border-0",
        "outline-0",
        "max-sm:h-16",
        "max-sm:h-fit p-2",

        error
          ? "focus-within:border-warning-dark focus-within:ring-1 focus-within:ring-warning-dark border border-warning-dark"
          : "focus-within:border-primary focus-within:ring-0 focus-within:ring-primary/40 border border-primary/5",
        "",
        "",
      )}
    >
      <input
        id="todo-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={cn(
          "grow text-primary",
          error ? "placeholder-warning-dark/80" : "placeholder-primary/80",
          "text-sm",

          "max-sm:text-md",
          "max-sm:placeholder-md",
          "",
          "",
        )}
        placeholder="Write your next task.."
      />
      <span className="">
        <Button
          type="solid"
          shape="pill"
          buttonType="submit"
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
            "",
            "max-sm:text-md",
            "max-sm:h-8",
            "",
          )}
        >
          Add
        </Button>
      </span>
    </label>
  );
}

function DateField({
  label,
  value,
  setValue,
  locale: passedLocale,
  error,
}: DateFieldProps & { error?: boolean }) {
  const dateFormat = deriveDateFormat(passedLocale);
  return (
    <div id="date-picker-wrapper ">
      <label className="sr-only">{label}</label>
      <DatePicker
        selected={value ? new Date(value) : null}
        onChange={(date) => setValue(date?.toISOString().split("T")[0] || "")}
        dateFormat={dateFormat}
        placeholderText={label}
        className={cn(
          error ? "border-warning-dark " : "",
          "placeholder-primary/70",
          "h-9",
          "text-primary/80 text-sm",
          "input",
          "flex w-full items-center justify-between text-left",
          "bg-background/40",
          "rounded-full border border-transparent",
          "focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/40",
          "rounded-full",
          "stroke-0",
          "border-0",
          "outline-0",
          "focus-within:border-primary focus-within:ring-0 focus-within:ring-primary/40 border border-primary/5",
          "max-sm: w-full",
          "",
          "",
          "",
        )}
      />
    </div>
  );
}
type TodoFormProps = {
  onAdd: (text: string, forDate?: number, dueDate?: number) => void;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  sortOrder: string;
  setSortOrder: Dispatch<SetStateAction<string>>;
  onClear: () => void;
};

export default function TodoForm({
  onAdd,
  filter,
  setFilter,
  sortOrder,
  setSortOrder,
  onClear,
}: TodoFormProps) {
  const locale = typeof navigator !== "undefined" ? navigator.language : "en";
  const [text, setText] = useState<string>("");
  const [forDate, setForDate] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) {
      setError(true);
      return;
    }
    setError(false);
    const forTs = forDate ? new Date(forDate).getTime() : undefined;
    const dueTs = dueDate ? new Date(dueDate).getTime() : undefined;
    onAdd(text, forTs, dueTs);
    setText("");
    setForDate("");
    setDueDate("");
  };

  return (
    <>
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
          "max-sm:col-span-full",
          "max-sm:col-start",
          "max-sm:-row-start-1",
          "max-sm:row-span-1",
          "max-sm:z-20",
          "max-sm:hidden",
          "",
          "",
        )}
      >
        <h1 className="text-2xl font-light text-primary/50">To Do</h1>
        <form
          onSubmit={handleSubmit}
          aria-label="Add todo form"
          className={cn("flex flex-col gap-5 text-secondary w-full mt-auto")}
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
                "max-sm:hidden",
                "",
              )}
            >
              Add Task
            </h3>
            <div className="flex gap-2 max-sm:flex-row flex-col max-sm:items-end">
              <TodoInput text={text} setText={setText} error={error} />
              <div className="flex gap-2 mt-0 items-end text-sm max-sm:flex-col">
                <DateField
                  label="For when"
                  value={forDate}
                  setValue={setForDate}
                  locale={locale}
                />
                <DateField
                  label="Due date"
                  value={dueDate}
                  setValue={setDueDate}
                  locale={locale}
                />
              </div>
            </div>
          </div>
        </form>

        <TodoFilters
          {...{ filter, setFilter, sortOrder, setSortOrder, onClear }}
        />
      </section>
      <section
        className={cn(
          "@Container",
          "container level-1 glass",
          "p-5",
          "grid",
          "hidden",
          "max-sm:grid",
          "items-center",
          "items-between",
          "col-span-full",
          "col-start-1",
          "row-start-1",
          "row-span-1",
          "-mb-10",
          "w-[95%]",
          "pb-12",
          "top-0",
          "justify-self-center",
          "",
          "",
        )}
      >
        <h1 className="text-2xl font-light text-primary/50">To Do</h1>

        <TodoFilters
          {...{ filter, setFilter, sortOrder, setSortOrder, onClear }}
        />
      </section>

      <section
        className={cn(
          "@Container",
          "container level-2",
          "bg-transparent",
          "p-5",
          "relative z-10",
          "grid",
          "col-start-1 col-span-2 row-start-1 row-span-3",
          "hidden",
          "max-sm:grid",
          "items-center",
          "items-between",
          "col-span-full",
          "col-start-1",
          "-row-start-1",
          "row-span-1",
          "z-20",
          "z-60",
          "pointer-events-auto",
          "absolute",
          "bottom-5",
          "justify-self-center",
          "max-sm:right-5",
          "",
          "",
        )}
      >
        {!openAddForm && (
          <Button
            buttonType="button"
            type="hollow"
            shape="circle"
            className="text-primary absolute right-0 bottom-0"
            onClick={() => {
              setOpenAddForm(true);
            }}
          >
            <IoIosAdd size={20} />
          </Button>
        )}
        {openAddForm && (
          <form
            onSubmit={handleSubmit}
            aria-label="Add todo form"
            className={cn(
              "absolute -right-2 -bottom-2",
              "absolute right-0 bottom-0",
              "glass",
              "border-primary/30",
              "border-primary",
              "flex flex-col gap-5 text-secondary w-full p-2",
              "w-[calc(100vw-6rem)]",
              "w-[calc(100vw-2.5rem)]",
              "container level-1",
              "",
            )}
          >
            <label htmlFor="todo-input" className="sr-only">
              Add todo
            </label>
            <div className="flex gap-2 flex-col max-sm:items-end">
              <TodoInput text={text} setText={setText} error={error} />
              <div className="flex gap-2 items-end text-sm flex-row w-full max-w-80 self-start">
                <DateField
                  label="For when"
                  value={forDate}
                  setValue={setForDate}
                  locale={locale}
                />
                <DateField
                  label="Due date"
                  value={dueDate}
                  setValue={setDueDate}
                  locale={locale}
                />
              </div>
            </div>
            <Button
              type="glass"
              shape="circle"
              buttonType="button"
              className="self-end absolute bottom-0 right-0 bg-transparent"
              onClick={() => setOpenAddForm(false)}
            >
              <IoIosAdd size={20} className="text-primary rotate-45" />
            </Button>
          </form>
        )}
      </section>
    </>
  );
}
