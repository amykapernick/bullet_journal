import React, { Fragment } from 'react';

import List from '../../parts/list';
import Notes from '../../parts/notes';

const Week = ({ weekId }) => (
	<Fragment>
		<section className="goals">
			<h2>Goals</h2>
			<List
				{...{
					listId: `goals`,
					section: weekId
				}}
			/>
		</section>
		{/* <section className="events">
			<h2>Events</h2>
			<List
				{...{
					listId: `events`,
					section: weekId
				}}
			/>
		</section>
		<section className="work">
			<h2>Work</h2>
			<List
				{...{
					listId: `work`,
					section: weekId
				}}
			/>
		</section>
		<section className="personal">
			<h2>Personal</h2>
			<List
				{...{
					listId: `personal`,
					section: weekId
				}}
			/>
		</section>
		<section className="selfcare">
			<h2>Selfcare</h2>
			<List
				{...{
					listId: `selfcare`,
					section: weekId
				}}
			/>
		</section>
		<section className="notes">
			<h2>Notes</h2>
			<Notes {...{ section: weekId }} />
		</section>
		<section className="days">
			<h2 className="sr-only">Days</h2>
			<ul className="lists">
				<li className="day">
					<h3>Monday</h3>
					<List
						{...{
							listId: `monday`,
							section: weekId
						}}
					/>
				</li>
				<li className="day">
					<h3>Tuesday</h3>
					<List
						{...{
							listId: `tuesday`,
							section: weekId
						}}
					/>
				</li>
				<li className="day">
					<h3>Wednesday</h3>
					<List
						{...{
							listId: `wednesday`,
							section: weekId
						}}
					/>
				</li>
				<li className="day">
					<h3>Thursday</h3>
					<List
						{...{
							listId: `thursday`,
							section: weekId
						}}
					/>
				</li>
				<li className="day">
					<h3>Friday</h3>
					<List
						{...{
							listId: `friday`,
							section: weekId
						}}
					/>
				</li>
				<li className="day">
					<h3>Saturday</h3>
					<List
						{...{
							listId: `saturday`,
							section: weekId
						}}
					/>
				</li>
				<li className="day">
					<h3>Sunday</h3>
					<List
						{...{
							listId: `sunday`,
							section: weekId
						}}
					/>
				</li>
			</ul>
		</section> */}
	</Fragment>

);

export default Week;
