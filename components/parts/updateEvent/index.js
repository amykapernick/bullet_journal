import {
	gql,
	useMutation
} from '@apollo/client';
import {
	endOfMonth, format, getMonth,
	parse, setMonth,
	startOfMonth
} from 'date-fns';
import React from 'react';

import { EDIT_EVENT } from '../../../utils/api/events';

const UpdateEvent = ({
	name, id, startDate, endDate, sectionId, toggleModal
}) => {
	const [editEvent] = useMutation(EDIT_EVENT);
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
		<form
			onSubmit={(e) => {
				e.preventDefault();

				const { elements } = e.target;

				let start = parse(
					elements.start.value,
					`yyyy-MM-dd`,
					new Date()
				);
				let end = elements.end.value && parse(
					elements.end.value,
					`yyyy-MM-dd`,
					new Date()
				);

				if (elements.section.value !== sectionId) {
					const month = getMonth(parse(
						elements.section.value,
						`MMM-yyyy`,
						new Date()
					));

					start = setMonth(start, month);

					end = end && setMonth(end, month);
				}

				editEvent({
					variables: {
						section: {
							sectionId
						},
						event: {
							id,
							name: elements.name.value,
							startDate: start,
							endDate: end,
							section: elements.section.value
						}
					}
				});

				toggleModal(false);
			}}
		>
			<label
				className="sr-only"
				htmlFor={`${id}_name`}
			>
				Change Event Name
			</label>
			<input
				type="text"
				name={`name`}
				id={`${id}_name`}
				defaultValue={name}
			/>
			<label
				className="sr-only"
				htmlFor={`${id}_start`}
			>
				Change Start Date
			</label>
			<input
				type="date"
				id={`${id}_start`}
				name={`start`}
				defaultValue={startDate
					&& format(new Date(startDate), `yyyy-MM-dd`)
				}
				min={format(new Date(min), `yyyy-MM-dd`)}
				max={format(new Date(max), `yyyy-MM-dd`)}
			/>
			<label
				className="sr-only"
				htmlFor={`${id}_start`}
			>
				Change End Date
			</label>
			<input
				type="date"
				id={`${id}_end`}
				name={`end`}
				defaultValue={endDate
					&& format(new Date(endDate), `yyyy-MM-dd`)
				}
				min={format(new Date(min), `yyyy-MM-dd`)}
				max={format(new Date(max), `yyyy-MM-dd`)}
			/>
			<label
				className="sr-only"
				htmlFor={`${id}_section`}
			>
				Change Section
			</label>
			<input
				type="text"
				name={`section`}
				id={`${id}_section`}
				defaultValue={sectionId}
			/>
			<button type="submit">Update Event</button>
		</form>
	);
};

export default UpdateEvent;
