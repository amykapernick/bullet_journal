import { format } from 'date-fns';

const generateWeek = (date) => ({
	weekString: format(date, `dd MMM yyyy`),
	weekId: format(date, `dd-MMM-yyyy`).toLowerCase()
});

const generateMonth = (date) => ({
	monthString: format(date, `MMMM yyyy`),
	monthId: format(date, `MMM-yyyy`).toLowerCase()
});

const generateName = (date) => ({
	...generateMonth(date),
	...generateWeek(date)
});

export default generateName;
