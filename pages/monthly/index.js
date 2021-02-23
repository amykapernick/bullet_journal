import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { parse } from 'date-fns';

import Month from '../../components/partials/monthly';

import { monthId as generateId, monthString as generateString } from '../../utils/generateIds';

const MonthPage = ({ monthId }) => {
	const params = useParams(),
		currentMonth = params.monthId
			? parse(params.monthId, `MMM-yyyy`, new Date())
			: parse(monthId, `MMM-yyyy`, new Date());

	return (
		<Fragment>
			<h1 className="date">{generateString(currentMonth)}</h1>
			<Month monthId={generateId(currentMonth)} />
		</Fragment>
	);
};

export default MonthPage;
