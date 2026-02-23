import Button from "./Button";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <Button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="text-secondary border-transparent!"
        shape="circle"
        type="hollow"
      >
        {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
      </Button>
    </div>
  );
};
