import {
	gql,
	useMutation,
	useQuery
} from '@apollo/client';
import React, {
	Fragment,
	useEffect, 	useState
} from 'react';

import { FETCH_TASKS } from '../../../utils/api/section';
import { ADD_TASK } from '../../../utils/api/task';

const AddTask = ({
	listId, sectionId, toggleModalOpen
}) => {
	const [addMultiple, toggleInputMethod] = useState(false);
	const [addTask] = useMutation(ADD_TASK);
	const createTask = (name) => {
		addTask({
			variables: {
				task: {
					list: listId,
					section: sectionId,
					name
				},
				section: {
					sectionId,
				}
			},
			options: {
				refetchQueries: [{
					query: FETCH_TASKS,
					variables: {
						section: sectionId,
						list: listId
					}
				}]
			}
		});

		toggleModalOpen(false);
	};
	const details = {
		list: `${sectionId}_${listId}`,
		createTask
	};

	return (
		<Fragment>
			<button
				type="button"
				onClick={() => toggleModalOpen(false)}
			>
				Close Modal
			</button>
			<button
				type="button"
				onClick={() => toggleInputMethod(!addMultiple)}
			>
				{addMultiple
					? `Add single task`
					: `Add multiple tasks`
				}
			</button>
			{addMultiple
				? <MultipleAdd {...details} />
				: <SingleAdd {...details} />
			}

		</Fragment>
	);
};

const SingleAdd = ({ list, createTask }) => (
	<form
		onSubmit={(e) => {
			e.preventDefault();
			createTask(e.target.elements[`${list}_newTask`].value);
		}}
	>
		<legend>Add New Task</legend>
		<label>New Task Name</label>
		<input
			type="text"
			placeholder="New Task"
			name={`${list}_newTask`}
		/>
		<button type="submit">
			Add Task
		</button>
	</form>
);

const MultipleAdd = ({ list, createTask }) => (
	<form
		onSubmit={(e) => {
			e.preventDefault();
			const newLabel = e.target.elements[`${list}_newTask`].value;
			const newTasks = newLabel.split(`\n`);

			newTasks.forEach((task) => {
				createTask(task);
			});
		}}
	>
		<legend>Add New Tasks</legend>
		<label>New Tasks</label>
		<textarea
			defaultValue={`Task 1\nTask 2\nTask 3`}
			name={`${list}_newTask`}
		/>
		<button type="submit">
			Add Task
		</button>
	</form>
);

export default AddTask;
