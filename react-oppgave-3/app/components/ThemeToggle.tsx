"use client";

import { useTheme } from "next-themes";
import Button from "./Button";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="text-secondary border-transparent!"
      shape="circle"
      type="hollow"
      suppressHydrationWarning
    >
      {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
    </Button>
  );
}
