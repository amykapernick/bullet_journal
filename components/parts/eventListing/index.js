import React, { Fragment, useRef, useState } from 'react';
import {
	useMutation
} from '@apollo/client';

import { DELETE_EVENT, EDIT_EVENT } from '../../../utils/fetchData/events';

import Delete from '../../icons/delete';
import Edit from '../../icons/edit';
import Close from '../../icons/close';

const EventListing = ({
	id, name, startDate, endDate, start, end, row, month
}) => {
	const ref = useRef(null),
		[editEventOpen, openEditEvent] = useState(false),
		[editEvent] = useMutation(EDIT_EVENT),
		[deleteEvent] = useMutation(DELETE_EVENT);

	return (
		<li
			className="event" style={{
				'--event_start': start,
				'--event_end': end,
				'--row': row
			}}
			ref={ref}
		>
			{name}
			<button className="icon" onClick={() => openEditEvent(!editEventOpen)}>
				<Edit />
				<span className="sr-only">Edit Event</span>
			</button>

			<div className="modal new" open={editEventOpen}>
				<button className="icon close" onClick={() => openEditEvent(!editEventOpen)}>
					<Close />
					<span className="sr-only">Close Modal</span>
				</button>
				<form
					onSubmit={(e) => {
						const { elements } = e.target;
						e.preventDefault();
						editEvent({
							variables: {
								event: {
									id,
									name: elements[`label_${id}`].value,
									startDate: elements.startDate.value,
									endDate: elements.endDate.value
								}
							}
						});
						openEditEvent(!editEventOpen);
					}}
				>
					<legend>Edit Event</legend>
					<label className="sr-only">Edit {name}</label>
					<input
						type="text"
						defaultValue={name}
						name={`label`}
					/>

					<label htmlFor={`event_start`} >Start Date</label>
					<input
						type="date"
						id={`event_start`}
						name="startDate"
						min={`${month.year}-${`0${month.monthNum}`.slice(-2)}-01`}
						max={`${month.year}-${`0${month.monthNum}`.slice(-2)}-${month.monthLength}`}
						defaultValue={startDate}
					/>
					<label htmlFor={`event_end`} >End Date (optional)</label>
					<input
						type="date"
						id={`event_end`}
						name="endDate"
						min={`${month.year}-${`0${month.monthNum}`.slice(-2)}-01`}
						max={`${month.year}-${`0${month.monthNum}`.slice(-2)}-${month.monthLength}`}
						defaultValue={endDate}
					/>
					<button className="save" type="submit">Save Changes</button>
					<button
						className="icon remove"
						type="button"
						onClick={() => {
							deleteEvent({
								variables: {
									event: id
								}
							});
							openEditEvent(!editEventOpen);
							// location.reload();
						}}
					>
						<Delete />
						<span className="sr-only">Delete Event</span>
					</button>
				</form>
			</div>
		</li>
	);
};

export default EventListing;
