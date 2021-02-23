import { format } from 'date-fns';

export const weekId = (date) => (
	format(date, `dd-MMM-yyyy`).toLowerCase()
);

export const weekString = (date) => (
	format(date, `dd MMM yyyy`)
);

export const monthId = (date) => (
	format(date, `MMM-yyyy`).toLowerCase()
);

export const monthString = (date) => (
	format(date, `MMMM yyyy`)
);
