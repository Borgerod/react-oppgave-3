import { useEffect, useState } from "react";

// const getNavigatorLocale = () => {
// 	if (typeof navigator === "undefined") return "en";

// 	const raw = navigator.languages?.[0] ?? navigator.language ?? "en";
// 	try {
// 		const canonical = Intl.getCanonicalLocales(raw)[0];
// 		if (typeof (Intl as any).Locale === "function") {
// 			// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 			const loc = new (Intl as any).Locale(canonical);
// 			const maximized = loc.maximize?.() ?? loc;
// 			const lang = maximized.language ?? canonical.split("-")[0];
// 			if (/^no$/i.test(lang)) return "nb";
// 			return lang;
// 		}
// 		if (/^no($|[-_])/i.test(canonical)) return "nb";
// 		return canonical;
// 	} catch {
// 		if (/^no($|[-_])/i.test(raw)) return "nb";
// 		return raw;
// 	}
// };

// export const getLocation = async () => {
// 	return new Promise((resolve, reject) => {
// 		if (!navigator.geolocation) {
// 			reject(new Error("Geolocation not supported"));
// 			return;
// 		}

// 		navigator.geolocation.getCurrentPosition(
// 			(position) => {
// 				resolve({
// 					latitude: position.coords.latitude,
// 					longitude: position.coords.longitude,
// 					countryCode:
// 						Intl.DateTimeFormat().resolvedOptions().timeZone,
// 					dateFormat: new Intl.DateTimeFormat().resolvedOptions()
// 						.locale,
// 				});
// 			},
// 			(error) => reject(error)
// 		);
// 	});
// };

// export const getCountryFromCoords = async (lat: number, lon: number) => {
// 	const response = await fetch(
// 		`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
// 	);
// 	const data = await response.json();
// 	return data.address.country_code;
// };

// export default function useUserLocale() {
// 	const [locale, setLocale] = useState<string>(getNavigatorLocale());
// }
// import { } from "react";
export const useUserLocale = () => {
	const [locale, setLocale] = useState<string>("en-US");

	useEffect(() => {
		const getLocaleFromGeo = async () => {
			try {
				const position = await new Promise<GeolocationPosition>(
					(resolve, reject) => {
						if (!navigator.geolocation) {
							reject(new Error("Geolocation not supported"));
							return;
						}
						navigator.geolocation.getCurrentPosition(
							resolve,
							reject
						);
					}
				);

				const { latitude, longitude } = position.coords;

				const response = await fetch(
					`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
				);
				const data = await response.json();

				const countryCode = data.address.country_code?.toUpperCase();

				const localeMap: Record<string, string> = {
					NO: "nb-NO",
					US: "en-US",
					GB: "en-GB",
				};

				const detectedLocale = localeMap[countryCode] || "en-US";
				setLocale(detectedLocale);
			} catch (error) {
				console.error("Geolocation error:", error);
				setLocale("nb-NO");
			}
		};

		getLocaleFromGeo();
	}, []);

	return { locale };
};
