import {
	gql,
	useMutation
} from '@apollo/client';
import React, {
	Fragment, 	useState
} from 'react';

import { ADD_TASK } from '../../../utils/api/task';

const AddTask = ({
	listId, sectionId, toggleModalOpen
}) => {
	const [addMultiple, toggleInputMethod] = useState(false);
	const [addTask] = useMutation(ADD_TASK, {
		update(cache, { data: { addTask } }) {
			cache.modify({
				fields: {
					tasks(existingTasks = []) {
						const newTaskRef = cache.writeFragment({
							data: addTask,
							fragment: gql`
								fragment NewTask on Task {
									name
									id
									completed
									due
									type
									list
									section {
										sectionId
									}
								}
							`
						});
						return [...existingTasks, newTaskRef];
					}
				}
			});
		}
	});
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
