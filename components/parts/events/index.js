import {
	useQuery
} from '@apollo/client';
import { endOfMonth, parse, startOfMonth } from 'date-fns';
import React, {
	Fragment, useState
} from 'react';

import { FETCH_EVENTS } from '../../../utils/api/events';
import AddEvent from '../addEvent';
import Event from '../eventItem';

const Events = ({ sectionId }) => {
	const options = {
		variables: {
			section: sectionId,
		},
		context: process.env.NEXT_PUBLIC_AUTH_TOKEN
	};
	const { loading, error, data } = useQuery(FETCH_EVENTS, options);
	const [addModal, toggleModal] = useState(false);

	if (loading) return <p>Events are loading</p>;

	if (error) return <p>Whoops, looks like something went wrong</p>;

	return (
		<Fragment>
			<button
				type="button"
				onClick={() => toggleModal(!addModal)}
			>
				Add Event
			</button>
			{addModal
				&& <div>
					<AddEvent {...{ sectionId, toggleModal }} />
				</div>
			}
			{data?.events?.map((event) => (
				<Event key={event.id} {...{ ...event }} />
			))}
		</Fragment>
	);
};

export default Events;
