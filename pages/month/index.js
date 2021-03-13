import React, { Fragment } from 'react';
import { parse } from 'date-fns';

import Layout from '../../components/partials/layout';

import Month from '../../components/partials/monthly';

import { monthString } from '../../utils/generateIds';

const MonthPage = ({ monthId }) => {
	const currentMonth = parse(monthId, `MMM-yyyy`, new Date());

	return (
		<Layout className="month" monthId={monthId}>
			<h1 className="date">{monthString(currentMonth)}</h1>
			<Month monthId={monthId} />
		</Layout>
	);
};

export default MonthPage;
