import { FILTER, SORT_ORDERS } from "@/app/lib/filterConfig.js";

export const toggleFilters = (array, filter) => {
	switch (filter) {
		case FILTER.ACTIVE:
			console.log(filter);
			return array.filter((item) => !item.completed);

		case FILTER.COMPLETED:
			return array.filter((item) => item.completed);

		case FILTER.ALL:
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
