import { FILTER, SORT_ORDERS } from "@/app/lib/filterConfig.js";

export const toggleFilters = (array, filter) => {
	switch (filter) {
		case FILTER.ACTIVE:
			return array.filter((item) => !item.completed);

		case FILTER.COMPLETED:
			return array.filter((item) => item.completed);

		case FILTER.ALL:
		default:
			return array;
	}
};

export const filterByPeriod = (array, period) => {
	if (!period || period === "all") return array;
	const now = new Date();

	const startOfDay = (d) =>
		new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
	const addDays = (ts, days) => ts + days * 24 * 60 * 60 * 1000;

	const startToday = startOfDay(now);
	const startTomorrow = addDays(startToday, 1);

	switch (period) {
		case "today":
			return array.filter(
				(item) => item.for >= startToday && item.for < startTomorrow
			);
		case "tomorrow":
			return array.filter(
				(item) =>
					item.for >= startTomorrow &&
					item.for < addDays(startTomorrow, 1)
			);
		case "this week": {
			// include next 7 days from today
			const weekEnd = addDays(startToday, 7);
			return array.filter(
				(item) => item.for >= startToday && item.for < weekEnd
			);
		}
		case "this month": {
			const startOfMonth = new Date(
				now.getFullYear(),
				now.getMonth(),
				1
			).getTime();
			const startNextMonth = new Date(
				now.getFullYear(),
				now.getMonth() + 1,
				1
			).getTime();
			return array.filter(
				(item) => item.for >= startOfMonth && item.for < startNextMonth
			);
		}
		default:
			return array;
	}
};

export const sortArray = (array, sortOrder, locale = "en") => {
	const collator = new Intl.Collator(locale, { sensitivity: "base" });
	switch (sortOrder) {
		case SORT_ORDERS.AZ:
			return sortAZ(array, collator);

		case SORT_ORDERS.ZA:
			return sortZA(array, collator);

		case SORT_ORDERS.OLD_NEW:
			return sortOldest(array);
		case SORT_ORDERS.NEW_OLD:
		default:
			return sortNewest(array);
	}
};

const sortAZ = (array, collator) => {
	return [...array].sort((a, b) => collator.compare(a.title, b.title));
};

const sortZA = (array, collator) => {
	return [...array].sort((a, b) => collator.compare(b.title, a.title));
};
const sortNewest = (array) => {
	return [...array].sort((a, b) => b.createdAt - a.createdAt);
};
const sortOldest = (array) => {
	return [...array].sort((a, b) => a.createdAt - b.createdAt);
};
