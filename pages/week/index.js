import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { parse } from 'date-fns';

import WeeklyLayout from '../../components/partials/weekly';
import Layout from '../../components/partials/layout';

import { weekId as generateId, weekString as generateString } from '../../utils/generateIds';

const WeekPage = ({ weekId }) => {
	const currentWeek = parse(weekId, `dd-MMM-yyyy`, new Date());

	return (
		<Layout className="week" weekId={weekId}>
			<h1 className="date">{generateString(currentWeek)}</h1>
			<WeeklyLayout weekId={generateId(currentWeek)} />
		</Layout>
	);
};

export default WeekPage;
