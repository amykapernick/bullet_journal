import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { parse } from 'date-fns';

import Layout from '../../../components/partials/layout';

import WeeklyLayout from '../../../components/partials/weekly';

import { weekString } from '../../../utils/generateIds';

const WeekPage = ({ weekId }) => {
	const currentWeek = parse(weekId, `dd-MMM-yyyy`, new Date());

	return (
		<Layout className="week" weekId={weekId}>
			<h1 className="date">{weekString(currentWeek)}</h1>
			<WeeklyLayout weekId={weekId} />
		</Layout>
	);
};

export default WeekPage;
