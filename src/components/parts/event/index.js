import React, { Fragment, useRef, useState } from 'react';

import EventListing from '../eventListing';

const Event = ({
	id, name, startDate, endDate, index, functions, month
}) => {
	const [editEventOpen, openEditEvent] = useState(false),
		listings = [],
		monthStart = new Date(startDate).setDate(1),
		monthStartDay = new Date(monthStart).getDay(),
		eventStart = new Date(startDate).getDate(),
		startDay = new Date(startDate).getDay(),
		eventEnd = new Date(endDate).getDate(),
		endDay = new Date(endDate).getDay(),
		listing = {
			name,
			id,
			start: startDay + 1,
			end: endDay + 2
		};

	if ((eventStart - 1) <= 7) {
		if (monthStartDay <= startDay) {
			listing.row = 1;
		} else {
			listing.row = 2;
		}
	} else {
		listing.row = Math.floor(((eventStart) / 7)) + 1;
	}

	if (endDate && startDate !== endDate) {
		const eventLength = eventEnd - eventStart;

		if (eventLength <= 8 && endDay > startDay) {
			listings.push({
				...listing,
			});
		} else {
			let n = eventStart + (6 - startDay),
				{ row } = listing;

			listings.push({
				...listing,
				end: 8
			});

			row += 1;

			while (n < (eventEnd - 7)) {
				listings.push({
					...listing,
					start: 1,
					end: 8,
					row
				});

				row += 1;
				n += 7;
			}

			listings.push({
				...listing,
				start: 1,
				row
			});
		}
	} else {
		listings.push({
			...listing,
			end: false
		});
	}

	return (
		<Fragment>
			{listings.map((event) => (
				<EventListing key={JSON.stringify(event)} {...{
					...event,
					startDate,
					endDate,
					functions,
					index,
					month,
					editEventOpen,
					openEditEvent,
				}} />
			))}
		</Fragment>
	);
};

export default Event;
