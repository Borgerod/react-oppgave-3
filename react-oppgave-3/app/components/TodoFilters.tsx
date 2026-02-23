// ...existing code...
import { FILTER, SORT_ORDERS } from "@/app/lib/filterConfig";
import { cn } from "../lib/utils";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiChevronDown } from "react-icons/fi";
import { PiSlidersHorizontal } from "react-icons/pi";
import Button from "./Button";

type Props = {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  onClear: () => void;
};

type DropdownFieldProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (next: string) => void;
  iconOnMobile?: React.ReactNode;
  mobileFull?: boolean;
};

function DropdownField({
  label,
  value,
  options,
  onChange,
  iconOnMobile,
  mobileFull = true,
}: DropdownFieldProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [popoverStyle, setPopoverStyle] = useState<
    { left?: number; top?: number } | undefined
  >(undefined);
  const [buttonWidth, setButtonWidth] = useState<number | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(false);
  const labelId = useId();
  const hasValue = options.includes(value);
  const resolvedValue = hasValue ? value : (options[0] ?? "");
  const selectedLabel = resolvedValue || label;

  useEffect(() => {
    if (!hasValue && options[0]) {
      onChange(options[0]);
    }
  }, [hasValue, onChange, options]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!containerRef.current) return;
      const target = event.target as Node;
      // If click is inside the original container, keep open
      if (containerRef.current.contains(target)) return;
      // If a portalled popover exists and the click is inside it, keep open
      if (popoverRef.current && popoverRef.current.contains(target)) return;
      setOpen(false);
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    function updatePosition() {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const scrollX = window.scrollX || 0;
      const scrollY = window.scrollY || 0;

      const left = Math.round(rect.left + scrollX);
      const top = Math.round(rect.bottom + scrollY + 8);
      const width = Math.round(rect.width);

      setPopoverStyle({ left, top });
      setButtonWidth(width);
    }

    if (open) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);
    }

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    function updateIsMobile() {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth <= 640);
    }

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const mobileWidthClass = mobileFull ? "max-sm:w-full" : "max-sm:w-auto";

  const buttonClassName = cn(
    "h-9",
    "text-primary/80 text-sm",
    "input",
    "flex w-full items-center justify-between text-left",
    "bg-background/40",
    "rounded-full border border-transparent",
    "focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/40",
    "stroke-0",
    "border-0",
    "outline-0",
    "min-w-48",
    mobileWidthClass,
    // open && "b// // // // order-border/40",
    "",
    "",
  );
  const chevronClassName = cn(
    "h-4 w-4 transition-transform",
    open && "rotate-180",
  );

  return (
    // <div className="relative w-full w-30" ref={containerRef}>
    <div className="relative w-30" ref={containerRef}>
      <span id={labelId} className="sr-only">
        {label}
      </span>
      {open ? (
        <button
          ref={(el) => {
            buttonRef.current = el;
          }}
          type="button"
          className={buttonClassName}
          aria-haspopup="listbox"
          aria-labelledby={labelId}
          aria-expanded="true"
          onClick={() => setOpen((prev) => !prev)}
        >
          {iconOnMobile ? (
            <>
              <span className="hidden max-sm:inline">{iconOnMobile}</span>
              <span className="inline max-sm:hidden">{selectedLabel}</span>
            </>
          ) : (
            <span className="inline">{selectedLabel}</span>
          )}
          <FiChevronDown aria-hidden="true" className={chevronClassName} />
        </button>
      ) : (
        <button
          ref={(el) => {
            buttonRef.current = el;
          }}
          type="button"
          className={buttonClassName}
          aria-haspopup="listbox"
          aria-labelledby={labelId}
          aria-expanded="false"
          onClick={() => setOpen((prev) => !prev)}
        >
          {iconOnMobile ? (
            <>
              <span className="hidden max-sm:inline">{iconOnMobile}</span>
              <span className="inline max-sm:hidden">{selectedLabel}</span>
            </>
          ) : (
            <span className="inline">{selectedLabel}</span>
          )}
          <FiChevronDown aria-hidden="true" className={chevronClassName} />
        </button>
      )}
      {open &&
        (typeof document !== "undefined" && popoverStyle
          ? createPortal(
              <div
                ref={(el) => {
                  popoverRef.current = el;
                }}
                role="listbox"
                aria-labelledby={labelId}
                className={cn(
                  "fixed",
                  "container level-2 glass",
                  "p-2",
                  "flex flex-col gap-1",
                  "border border-transparent border-b-primary/10",
                  "backdrop-blur-lg",
                  "shadow-lg",
                  "rounded-2xl",
                  "z-50",
                  "",
                  "",
                )}
                style={{
                  left: popoverStyle.left ? `${popoverStyle.left}px` : "auto",
                  top: popoverStyle.top ? `${popoverStyle.top}px` : "auto",
                  width: buttonWidth ? `${buttonWidth}px` : "auto",
                }}
              >
                {options.map((option) => {
                  const isSelected = option === resolvedValue;
                  const optionClassName = cn(
                    "w-full rounded-2xl px-4 py-2 text-left text-primary transition-colors",
                    isSelected
                      ? "bg-primary/15 text-primary"
                      : "hover:bg-primary/15",
                  );
                  const handleSelect = () => {
                    onChange(option);
                    setOpen(false);
                  };

                  return (
                    <button
                      key={option}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className={optionClassName}
                      onClick={handleSelect}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>,
              document.body,
            )
          : null)}
    </div>
  );
}

export default function TodoFilters({
  filter,
  setFilter,
  sortOrder,
  setSortOrder,
  onClear,
}: Props) {
  const filterOptions = Object.values(FILTER);
  const sortOptions = Object.values(SORT_ORDERS);

  return (
    <>
      <div className="flex flex-col gap-5 justify-end max-sm:flex-row max-sm:gap-0 max-sm:justify-between">
        {/* <div className="flex flex-col gap-5 justify-end max-sm:flex-row max-sm:gap-0 w-fit"> */}
        <div
          className={cn(
            "max-sm:flex-1 justify-items-start max-sm:justify-items-center max-sm:content-end w-fit",
            // "w-48",
            "w-fit",
            "",
          )}
        >
          <Button
            type="solid"
            shape="pill"
            className={cn(
              "badge badge-neutral badge-xs",
              "@container",
              "h-6",
              "h-8",
              "px-8",
              "py-0",
              "z-20",
              "m-0 gap-0",
              "rounded-full",
              "text-background",
              "bg-foreground",
              "col-start-3 col-span-1 row-start-end",
              "self-end",
              "justify-self-end",
              "stroke-0 border-none outline-none ring-offset-none decoration-0",
              "max-sm:flex",
              "hidden",
              "justify-self-start",
              "text-nowrap",
              "max-sm:w-fit",
              "",
            )}
            onClick={onClear}
          >
            Clear
          </Button>
        </div>
        <div
          className={cn(
            "flex max-sm:flex-row flex-col gap-2 max-sm:w-full max-sm:flex-1 max-sm:justify-end",
            "w-fit",
            "",
            "",
            "",
          )}
        >
          <div className="flex flex-col gap-2 max-sm:flex-1">
            <h3
              className={cn(
                "text-md",
                "text-primary/70",
                "text-primary/80",
                "text-primary/80",
                "tracking-widest",
                "max-sm:hidden",
                "",
                "max-sm:w-20",
                "",
              )}
            >
              Filter
            </h3>
            <DropdownField
              label="Filter todos"
              value={filter}
              options={filterOptions}
              onChange={setFilter}
              iconOnMobile={<PiSlidersHorizontal className="h-5 w-5" />}
              mobileFull={false}
            />
          </div>
          <div className="flex flex-col gap-2 max-sm:flex-2 max-sm:w-full">
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
              Sort by
            </h3>
            <DropdownField
              label="Sort todos"
              value={sortOrder}
              options={sortOptions}
              onChange={setSortOrder}
              mobileFull={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
