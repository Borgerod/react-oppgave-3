export interface CurrentDate {
	dayName: string;
	dayOrdinal: string;
}

function ordinal(n: number) {
	const s = ["th", "st", "nd", "rd"];
	const v = n % 100;
	if (v >= 11 && v <= 13) return `${n}th`;
	const t = n % 10;
	return `${n}${s[t] || s[0]}`;
}

export function getCurrentDate(locale?: string): CurrentDate {
	const now = new Date();
	const dayName = now.toLocaleDateString(locale || undefined, {
		weekday: "short",
	});
	const dayOrdinal = ordinal(now.getDate());
	return { dayName, dayOrdinal };
}
