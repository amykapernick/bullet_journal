import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { parse } from 'date-fns';

import WeeklyLayout from '../../../components/partials/weekly';

import { weekId as generateId, weekString as generateString } from '../../../utils/generateIds';

const WeekPage = ({ weekId }) => {
	const router = useRouter();

	console.log(router);

	// const params = useParams(),
	// 	currentWeek = params.weekId
	// 		? parse(params.weekId, `dd-MMM-yyyy`, new Date())
	// 		: parse(weekId, `dd-MMM-yyyy`, new Date());

	return (
		<Fragment>
			{/* <h1 className="date">{generateString(currentWeek)}</h1> */}
			{/* <WeeklyLayout weekId={generateId(currentWeek)} /> */}
		</Fragment>
	);
};

export default WeekPage;
