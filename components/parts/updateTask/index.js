import {
	gql,
	useMutation
} from '@apollo/client';
import { format, parse } from 'date-fns';
import React, { Fragment } from 'react';

import lists from '../../../_data/lists/index';
import { DELETE_TASK, EDIT_TASK } from '../../../utils/api/task';

const UpdateTask = ({
	name, id, completed, due, sectionId, listId, toggleModal
}) => {
	const [editTask] = useMutation(EDIT_TASK);

	return (
		<Fragment>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const { elements } = e.target;

					editTask({
						variables: {
							section: {
								sectionId,
							},
							task: {
								id,
								list: elements.list.value,
								section: elements.section.value,
								name: elements.name.value,
								completed: elements.completed.checked,
								due: parse(
									elements.due.value,
									`yyyy-MM-dd`,
									new Date()
								)
							}
						}
					});

					toggleModal(false);
				}}
			>
				<input
					type="checkbox"
					defaultChecked={completed}
					name={`completed`}
					id={`${id}_modal_completed`}

				/>
				<label htmlFor={`${id}_modal_completed`}>
					<span className="sr-only">Complete - {name}</span>
				</label>
				<label
					className="sr-only"
					htmlFor={`${id}_name`}
				>
					Change Task Name
				</label>
				<input
					type="text"
					name={`name`}
					id={`${id}_name`}
					defaultValue={name}
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
				<label
					className="sr-only"
					htmlFor={`${id}_list`}
				>
					Change List
				</label>
				<select
					name={`list`}
					id={`${id}_list`}
					defaultValue={listId}
				>
					{lists.map((opt) => (
						<option
							key={opt.value}
							value={opt.value}
						>
							{opt.name}
						</option>
					))}
				</select>
				<label
					className="sr-only"
					htmlFor={`${id}_due`}
				>
					Change Due Date
				</label>
				<input
					type="date"
					id={`${id}_due`}
					name={`due`}
					defaultValue={due && format(new Date(due), `yyyy-MM-dd`)}
				/>
				<button type="submit">
					Update Task
				</button>
			</form>

		</Fragment>);
};

export default UpdateTask;
