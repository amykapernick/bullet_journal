import { useMutation } from '@apollo/client';
import { format, parse } from 'date-fns';
import React, {
	Fragment, useState
} from 'react';

import { DELETE_EVENT, FETCH_EVENTS } from '../../../utils/api/events';
import UpdateEvent from '../updateEvent';

const Event = ({
	name, startDate, endDate, id, section
}) => {
	const refetch = {
		refetchQueries: [
			{
				query: FETCH_EVENTS,
				variables: {
					section: section.sectionId,
				}
			}
		]
	};
	const [editModal, toggleModal] = useState(false);
	const [deleteEvent] = useMutation(DELETE_EVENT, { ...refetch });
	const removeEvent = () => {
		deleteEvent({
			variables: {
				event: id
			}
		});
	};
	return (
		<li>
			<span>{name}</span>
			{startDate
				&& <time
					dateTime={format(new Date(startDate), `yyyy-MM-dd`)}
				>
					{format(new Date(startDate), `dd-MMM`)}
				</time>
			}
			{endDate
				&& <time
					dateTime={format(new Date(endDate), `yyyy-MM-dd`)}
				>
					{format(new Date(endDate), `dd-MMM`)}
				</time>
			}
			<button
				type="button"
				onClick={() => removeEvent()}
			>
				Delete Event
			</button>
			<button
				type="button"
				onClick={() => toggleModal(!editModal)}
			>
				Edit Event
			</button>
			{editModal
				&& <div>
					<button
						type="button"
						onClick={() => toggleModal(!editModal)}
					>
						Close Edit Modal
					</button>
					<UpdateEvent
						{...{
							name,
							startDate,
							endDate,
							id,
							...section,
							toggleModal
						}}
					/>
				</div>
			}
		</li>
	);
};

export default Event;
