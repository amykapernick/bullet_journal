import {parse, format} from 'date-fns'

const generateName = (section = '') => {
	if(section.match(/\d{2}-\w{3}-\d{4}/)) {
		return generateWeek(section)
	}
	else if(section.match(/\w{3}-\d{4}/)) {
		return generateMonth(section)
	}
	
	return 'Error, section is invalid'
}

const generateWeek = (section) => {
	const date = parse(section, 'dd-MMM-yyyy', new Date())

	return format(date, 'dd MMM yyyy')
}

const generateMonth = (section) => {
	const date = parse(section, 'MMM-yyyy', new Date())

	return format(date, 'MMMM yyyy')
}

export default generateName