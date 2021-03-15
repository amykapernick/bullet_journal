import React, {
	Fragment
} from 'react';
import Link from 'next/link';

import Layout from '../components/partials/layout';

import Overview from '../components/partials/overview';

const IndexPage = ({
	weekId, monthId, currentDay, monthString, weekString
}) => (
	<Layout {...{ weekId, monthId }}>
		<h1 className="sr-only">Overview</h1>
		<Link className="date_month date" href="/month">
			<a>{monthString}</a>
		</Link>
		<Link className="date_week date" href="/week">
			<a>{weekString}</a>
		</Link>
		<Overview {...{ weekId, monthId, currentDay }} />
	</Layout>
);

export default IndexPage;
