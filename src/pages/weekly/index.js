import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { parse } from 'date-fns';

import WeeklyLayout from '../../components/partials/weekly';

import { weekId as generateId, weekString as generateString } from '../../utils/generateIds';

const WeekPage = ({ weekId }) => {
	const params = useParams(),
		currentWeek = params.weekId
			? parse(params.weekId, `dd-MMM-yyyy`, new Date())
			: parse(weekId, `dd-MMM-yyyy`, new Date());

	return (
		<Fragment>
			<h1 className="date">{generateString(currentWeek)}</h1>
			<WeeklyLayout weekId={generateId(currentWeek)} />
		</Fragment>
	);
};

export default WeekPage;
