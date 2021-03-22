import { useMutation } from '@apollo/client';
import React from 'react';

import { DELETE_TASK } from '../../../utils/api/task';

const ListItem = ({
	name, id, completed, due, refetch
}) => {
	const [deleteTask] = useMutation(DELETE_TASK, {
		variables: {
			task: id
		}
	});
	const removeTask = () => {
		deleteTask();
		refetch();
	};

	return (
		<li>
			{/* <input
				type="checkbox"
				defaultChecked={completed}
				name={`${id}_status`}
				id={`${id}_completed`}
			/>
			<label htmlFor={`${id}_completed`}>
				<span className="sr-only">Complete - {name}</span>
			</label> */}
			<span>{name}</span>
			<time>{due}</time>
			{/* <button
				type="button"
				onClick={() => removeTask()}
			>
				Delete Task
			</button> */}
		</li>
	);
};

export default ListItem;
