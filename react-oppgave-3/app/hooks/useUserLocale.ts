import { useEffect, useState } from "react";

const getNavigatorLocale = () => {
	if (typeof navigator === "undefined") {
		return "en";
	}
	return navigator.languages?.[0] ?? navigator.language ?? "en";
};

const isInNorway = (latitude: number, longitude: number) => {
	// Rough bounding box for mainland Norway
	const withinLatitude = latitude >= 57 && latitude <= 72;
	const withinLongitude = longitude >= 4 && longitude <= 32;
	return withinLatitude && withinLongitude;
};

export default function useUserLocale() {
	const [locale, setLocale] = useState<string>(getNavigatorLocale());

	useEffect(() => {
		if (typeof navigator === "undefined" || !navigator.geolocation) {
			return;
		}

		const watchId = navigator.geolocation.watchPosition(
			({ coords }) => {
				if (isInNorway(coords.latitude, coords.longitude)) {
					setLocale("nb");
				}
			},
			(error) => {
				console.warn("useUserLocale: geolocation error", error.message);
			}
		);

		return () => {
			navigator.geolocation.clearWatch(watchId);
		};
	}, []);

	return locale;
}
