import { useEffect, useState } from "react";
// Decr: will ask for geo location for to properly get users language norms. in case if user uses a english language but keyboard is a different language.
export const useLocalStorage = (key, defaultValue) => {
	const readValue = () => {
		if (typeof window === "undefined") {
			return defaultValue;
		}
		try {
			const storedValue = window.localStorage.getItem(key);
			if (!storedValue) {
				return defaultValue;
			}
			const parsed = JSON.parse(storedValue);
			return Array.isArray(parsed) ? parsed : defaultValue;
		} catch (error) {
			console.warn(
				`useLocalStorage: Failed to parse value for key "${key}"`,
				error
			);
			return defaultValue;
		}
	};

	const [value, setValue] = useState(readValue);

	useEffect(() => {
		if (typeof window === "undefined") return;
		window.localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
};
