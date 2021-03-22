import { useRouter } from 'next/router';
import React, {
	Fragment, useState
} from 'react';

import Layout from '../../../components/partials/layout';
import Events from '../../../components/parts/events';

const EventsPage = () => {
	const router = useRouter();
	const params = router.query;

	return (
		<Layout>
			<h1>Events Page</h1>
			<ul>
				<Events {...params} />
			</ul>
		</Layout>
	);
};

export default EventsPage;
