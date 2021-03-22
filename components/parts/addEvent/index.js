import {
	gql,
	useMutation
} from '@apollo/client';
import {
	endOfMonth, format, getMonth,
	parse, setMonth,
	startOfMonth
} from 'date-fns';
import React, { Fragment } from 'react';

import { ADD_EVENT } from '../../../utils/api/events';

const AddEvent = ({ toggleModal, sectionId }) => {
	const [addEvent] = useMutation(ADD_EVENT, {
		update(cache, { data: { addEvent } }) {
			cache.modify({
				fields: {
					events(existingEvents = []) {
						const newEventRef = cache.writeFragment({
							data: addEvent,
							fragment: gql`
								fragment NewEvent on Event {
									name
									startDate
									endDate
									id  
									section {
										sectionId
									}
								}
							`
						});
						return [...existingEvents, newEventRef];
					}
				}
			});
		}
	});
	const min = startOfMonth(parse(
		sectionId,
		`MMM-yyyy`,
		new Date()
	));
	const max = endOfMonth(parse(
		sectionId,
		`MMM-yyyy`,
		new Date()
	));

	return (
		<Fragment>
			<form
				onSubmit={(e) => {
					e.preventDefault();

					const { elements } = e.target;

					const start = parse(
						elements.start.value,
						`yyyy-MM-dd`,
						new Date()
					);
					const end = elements.end.value && parse(
						elements.end.value,
						`yyyy-MM-dd`,
						new Date()
					);

					addEvent({
						variables: {
							section: {
								sectionId
							},
							event: {
								name: elements.name.value,
								startDate: start,
								endDate: end,
								section: sectionId
							}
						}
					});

					toggleModal(false);
				}}
			>
				<label
					className="sr-only"
					htmlFor={`${sectionId}_name`}
				>
					Event Name
				</label>
				<input
					placeholder="Upcoming Event Name"
					type="text"
					name={`name`}
					id={`${sectionId}_name`}
				/>
				<label
					className="sr-only"
					htmlFor={`${sectionId}_start`}
				>
					Start Date
				</label>
				<input
					type="date"
					id={`${sectionId}_start`}
					name={`start`}
					min={format(new Date(min), `yyyy-MM-dd`)}
					max={format(new Date(max), `yyyy-MM-dd`)}
				/>
				<label
					className="sr-only"
					htmlFor={`${sectionId}_start`}
				>
					End Date
				</label>
				<input
					type="date"
					id={`${sectionId}_end`}
					name={`end`}
					min={format(new Date(min), `yyyy-MM-dd`)}
					max={format(new Date(max), `yyyy-MM-dd`)}
				/>
				<button type="submit">Create Event</button>
			</form>
		</Fragment>
	);
};

export default AddEvent;
