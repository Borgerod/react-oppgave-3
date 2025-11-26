"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Button from "./Button";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	function getThemeIcon() {
		if (theme === "light") {
			return <MdDarkMode />;
		} else {
			return <MdLightMode />;
		}
	}

	return (
		<Button
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
			className="text-secondary border-secondary"
			shape="circle"
			type="hollow"
		>
			{getThemeIcon()}
		</Button>
	);
}
