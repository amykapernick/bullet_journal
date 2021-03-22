import { useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { FETCH_TASKS } from '../../../utils/api/section';
import { DELETE_TASK, EDIT_TASK } from '../../../utils/api/task';
import UpdateTask from '../updateTask';

const ListItem = ({
	name, id, completed, due, sectionId, listId
}) => {
	const refetch = {
		update: {
			refetchQueries: [
				{
					query: FETCH_TASKS,
					variables: {
						section: sectionId,
						list: listId
					}
				}
			]
		}
	};
	const details = {
		variables: {
			task: {
				id,
				completed: !completed
			},
			section: {
				sectionId,
			},
		}
	};
	const [completeTask] = useMutation(EDIT_TASK);
	const [deleteTask] = useMutation(DELETE_TASK, { ...refetch });
	const [editModal, toggleModal] = useState(false);
	const removeTask = () => {
		deleteTask({
			variables: {
				task: id
			}
		});
	};

	return (
		<li>
			<input
				type="checkbox"
				defaultChecked={completed}
				name={`${id}_status`}
				id={`${id}_completed`}
				onChange={() => {
					completeTask({ ...details });
				}}
			/>
			<label htmlFor={`${id}_completed`}>
				<span className="sr-only">Complete - {name}</span>
			</label>
			<span>{name}</span>
			<time>{due}</time>
			<button
				type="button"
				onClick={() => removeTask()}
			>
				Delete Task
			</button>
			<button
				type="button"
				onClick={() => toggleModal(!editModal)}
			>
				Edit Task
			</button>
			{editModal
				&& <div>
					<button
						type="button"
						onClick={() => toggleModal(!editModal)}
					>
						Close Edit Modal
					</button>
					<UpdateTask {...{
						name,
						id,
						completed,
						due,
						sectionId,
						listId,
					}} />
				</div>
			}
		</li>
	);
};

export default ListItem;
