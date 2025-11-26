// Formatter function
export function formatTimestamp(
	input,
	{ seconds = false, timeZone = "Europe/Oslo" } = {}
) {
	const date = new Date(input);
	if (isNaN(date)) return "";

	const options = {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
		timeZone,
	};
	if (seconds) options.second = "2-digit";

	// Intl may include "kl." for nb-NO; remove it to get "DD.MM.YYYY HH:mm"
	return new Intl.DateTimeFormat("nb-NO", options)
		.format(date)
		.replace(/\s?kl\.?\s?/i, " ")
		.trim();
}
