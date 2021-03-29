import { parse } from 'date-fns';

const parseWeek = (section) => (
	parse(section, `dd-MMM-yyyy`, new Date())
);

const parseMonth = (section) => (
	parse(section, `MMM-yyyy`, new Date())
);

const parseSection = (section) => {
	if (section.match(/\d{2}-\w{3}-\d{4}/)) {
		return parseWeek(section);
	}
	if (section.match(/\w{3}-\d{4}/)) {
		return parseMonth(section);
	}

	console.log(`Error, section is invalid`);

	return `Error, section is invalid`;
};

export default parseSection;
