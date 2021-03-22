import {
	useQuery
} from '@apollo/client';
import { endOfMonth, parse, startOfMonth } from 'date-fns';
import React, {
	Fragment, useState
} from 'react';

import { FETCH_EVENTS } from '../../../utils/api/events';
import Event from '../eventItem';

const Events = ({ month }) => {
	const options = {
		variables: {
			section: month,
		},
		context: process.env.NEXT_PUBLIC_AUTH_TOKEN
	};
	const { loading, error, data } = useQuery(FETCH_EVENTS, options);

	if (loading) return <p>Events are loading</p>;

	if (error) return <p>Whoops, looks like something went wrong</p>;

	return (
		<Fragment>
			{data?.events?.map((event) => (
				<Event key={event.id} {...{ ...event }} />
			))}
		</Fragment>
	);
};

export default Events;
