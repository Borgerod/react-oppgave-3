// Formatter function
/**
 * Format a timestamp or ISO date string using Intl.
 * @param {string|number|Date} input
 * @param {{seconds?: boolean, timeZone?: string, locale?: string, showTime?: boolean, showYear?: boolean}} [options]
 */
export function formatTimestamp(
	input,
	{ seconds = false, timeZone, locale, showTime, showYear } = {}
) {
	// empty input -> empty string
	if (input == null || input === "") return "";

	// detect simple ISO date-only string: YYYY-MM-DD
	const isIsoDateOnly =
		typeof input === "string" && /^\d{4}-\d{2}-\d{2}$/.test(input);

	// safe parsing: if date-only, construct local-midnight Date; otherwise let Date handle it
	let date;
	if (isIsoDateOnly) {
		const [y, m, d] = input.split("-");
		date = new Date(Number(y), Number(m) - 1, Number(d));
	} else {
		date = new Date(input);
	}

	if (isNaN(date)) return "";

	// determine defaults for showTime and showYear
	const defaultShowTime = !isIsoDateOnly;
	const useShowTime =
		typeof showTime === "boolean" ? showTime : defaultShowTime;
	const useShowYear = typeof showYear === "boolean" ? showYear : true;

	// pick formatting options depending on whether we should show time
	let opts;
	if (useShowTime) {
		opts = {
			day: "2-digit",
			month: "2-digit",
			year: useShowYear ? "numeric" : undefined,
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
			timeZone,
		};
		if (seconds && !isIsoDateOnly) opts.second = "2-digit";
	} else {
		// date-only output; use short month names for readability
		opts = {
			day: "numeric",
			month: "short",
			...(useShowYear ? { year: "numeric" } : {}),
		};
	}

	// choose locale: use provided, else navigator if available, else default to 'en'
	const chosenLocale =
		locale ??
		(typeof navigator !== "undefined"
			? navigator.languages?.[0] ?? navigator.language
			: "en");

	try {
		return new Intl.DateTimeFormat(chosenLocale, opts).format(date).trim();
	} catch {
		return date.toLocaleString();
	}
}

export function deriveDateFormat(locale) {
	try {
		const parts = new Intl.DateTimeFormat(locale).formatToParts(
			// use an unambiguous date with day/month/year present
			new Date(2020, 11, 31)
		);
		return parts
			.map((p) => {
				if (p.type === "day") return "dd";
				if (p.type === "month") return "MM";
				if (p.type === "year") return "yyyy";
				if (p.type === "literal") return p.value;
				return "";
			})
			.join("");
	} catch {
		return "MM/dd/yyyy";
	}
}
