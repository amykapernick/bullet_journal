import React, { Fragment } from 'react';

import { format } from 'date-fns';
import List from '../../parts/list';
import Notes from '../../parts/notes';

const Overview = ({ weekId, monthId }) => (
	<Fragment>
		<section className="goals_week">
			<h2>Goals this Week</h2>
			<List
				{...{
					listId: `goals`,
					section: weekId
				}}
			/>
		</section>
		<section className="goals_month">
			<h2>Goals this Month</h2>
			<List
				{...{
					listId: `goals`,
					section: monthId
				}}
			/>
		</section>
		<section className="events">
			<h2>Events this Week</h2>
			<List
				{...{
					listId: `events`,
					section: weekId
				}}
			/>
		</section>
		<section className="notes_week">
			<h2>Notes this Week</h2>
			<Notes {...{ section: weekId }} />
		</section>
		<section className="notes_month">
			<h2>Notes this Month</h2>
			<Notes {...{ section: monthId }} />
		</section>
		<section className="current_day">
			<h2>{format(new Date(), `cccc`)}</h2>
			<List
				{...{
					listId: `${format(new Date(), `cccc`).toLowerCase()}`,
					section: weekId
				}}
			/>
		</section>
	</Fragment>

);

export default Overview;
