import React, {
	useState, useRef, useEffect, Fragment
} from 'react';
import {
	getDaysInMonth, parse, format, set, getDay
} from 'date-fns';
import {
	useQuery, useMutation
} from '@apollo/client';

import Event from '../event';

import Add from '../../icons/add';
import Close from '../../icons/close';

import uuid from '../../../utils/uuid';

import { GET_EVENTS } from '../../../utils/fetchData/events';

const MonthView = ({ monthId }) => {
	const month = parse(monthId, `MMM-yyyy`, new Date()),
		monthNum = format(month, `M`),
		year = format(month, `yyyy`),
		monthLength = getDaysInMonth(month),
		dates = [],
		gql_options = {
			variables: {
				section: monthId
			},
			context: process.env.AUTH_TOKEN
		},
		{ loading, error, data } = useQuery(GET_EVENTS, gql_options);

	let n = 1;

	while (n <= monthLength) {
		const day = set(month, { date: n });

		dates.push({
			date: n,
			day: getDay(day)
		});

		n++;
	}

	const [newEventOpen, openNewEvent] = useState(false),
		addEvent = (e) => {
			const { newEvent, eventStart, eventEnd } = e.target.elements,
				list = data.events;

			list.push({
				id: uuid(),
				name: newEvent.value,
				startDate: eventStart.value,
				endDate: eventEnd.value
			});

			// setEvents(list);

			// saveLocal(events);
		},
		deleteEvent = (index) => {
			const list = data.events;

			list.splice(index, 1);

			// setEvents(list);

			// saveLocal(events);

			location.reload();
		},
		changeLabel = (ref, e) => {
			if (e && ref) {
				const { current } = ref,
					newLabel = e.target.value,
					eventId = parseInt(current.getAttribute(`data-id`)),
					list = data.events;

				list.some((event) => {
					if (parseInt(event.id) === eventId) {
						event.name = newLabel;
					}

					return event.id === eventId;
				});

				// setEvents(list);

				// saveLocal(events);
			}
		},
		changeDate = (ref, e) => {
			if (e && ref) {
				const { current } = ref,
					newDate = e.target.value,
					eventId = parseInt(current.getAttribute(`data-id`)),
					list = data.events;

				list.some((event) => {
					if (parseInt(event.id) === eventId) {
						event[e.target.name] = newDate;
					}

					return event.id === eventId;
				});

				// setEvents(list);

				// saveLocal(events);
			}
		},
		editForm = (ref, e) => {
			changeLabel(ref, { target: e.target.elements.label });
		};

	let row = 1,
		column = 1;

	return (
		<Fragment>
			<div className="modal new" open={newEventOpen}>
				<button className="icon close" onClick={() => openNewEvent(!newEventOpen)}>
					<Close />
					<span className="sr-only">Close Modal</span>
				</button>
				<form onSubmit={(e) => addEvent(e)}>
					<label htmlFor={`${monthId}_newEvent_start`} className="sr-only">Event Name</label>
					<input id={`${monthId}_newEvent`} type="text" name="newEvent" placeholder="Event Name" />
					<label htmlFor={`${monthId}_newEvent_start`} >Start Date</label>
					<input
						type="date"
						id={`${monthId}_newEvent_start`}
						name="eventStart"
						min={`${year}-${`0${monthNum}`.slice(-2)}-01`}
						max={`${year}-${`0${monthNum}`.slice(-2)}-${monthLength}`}
					/>
					<label htmlFor={`${monthId}_newEvent_end`} >End Date (optional)</label>
					<input
						type="date"
						id={`${monthId}_newEvent_end`}
						name="eventEnd"
						min={`${year}-${`0${monthNum}`.slice(-2)}-01`}
						max={`${year}-${`0${monthNum}`.slice(-2)}-${monthLength}`}
					/>
					<button type="submit">Add New Event</button>
				</form>
			</div>
			<button className="icon add" onClick={() => openNewEvent(!newEventOpen)}>
				<Add />
				<span className="sr-only">Add New Event</span>
			</button>
			<ul className="month_view">

				{dates.map(({ date, day }) => {
					const styles = {};

					if (day === 0) {
						row += 1;
						column = 1;
					} else if (date === 1) {
						column = date + day;
					} else {
						column += 1;
					}

					styles[`--offset`] = column;
					styles[`--row`] = row;

					return (
						<li
							key={date}
							data-day={format(set(month, { date }), `EEE`)}
							className="day"
							style={styles}
						>
							<p>{date}</p>
						</li>
					);
				})}
				{data?.events && data.events.map((event, index) => (
					<Event key={event.id} {...{
						...event,
						index,
						month: {
							monthNum,
							year,
							monthLength
						},
						functions: {
							deleteEvent,
							changeLabel,
							editForm,
							changeDate
						}
					}} />
				))}
			</ul>
		</Fragment>
	);
};

export default MonthView;
