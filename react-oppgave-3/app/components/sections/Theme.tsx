// "use client";

import { useTheme } from "next-themes";
import { cn } from "@/app/lib/utils";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Button from "../Button";

export default function Theme() {
  const { theme, setTheme } = useTheme();

  return (
    <section
      className={cn(
        "@Container",
        "container level-1",
        "grid grid-cols-2",
        "bg-background/90 dark:bg-foreground",
        "col-start-1 col-span-2 row-start-4 row-span-1",
        "text-secondary font-extralight text-xl p-7",
        "max-sm:bg-transparent max-sm:p-0",
        "max-sm:contents",
      )}
    >
      <div className="col-start-1 col-span-1 font-thin self-start max-sm:hidden">
        <h3>Theme</h3>
        <p className="font-thin text-sm text-secondary/60">
          <span>Set to {theme} mode</span>
        </p>
      </div>

      <div
        className={cn(
          "col-start-2 col-span-1 flex items-center justify-end",
          "p-0 bg-transparent border-secondary! border rounded-full",
          "size-10 justify-center self-center justify-self-end",
          "max-sm:p-0",
          "max-sm:absolute max-sm:z-100 max-sm:top-30 max-sm:right-30",
          "max-sm:size-8 max-sm:flex max-sm:items-center max-sm:justify-center",
          "max-sm:bg-foreground max-sm:rounded-full",
        )}
      >
        <div>
          <Button
            type="hollow"
            buttonType="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-secondary border-transparent!"
            shape="circle"
          >
            {theme == "dark" ? <MdLightMode /> : <MdDarkMode />}
          </Button>
        </div>
      </div>
    </section>
  );
}
