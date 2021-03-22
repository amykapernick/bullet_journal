import {
	gql,
	useMutation
} from '@apollo/client';
import React, {
	Fragment, 	useState
} from 'react';

import { ADD_TASK } from '../../../utils/api/task';
import styles from './addTask.module.scss';

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
				className={styles.toggleButton}
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
		className={styles.form}
		onSubmit={(e) => {
			e.preventDefault();
			createTask(e.target.elements.newTask.value);
			e.target.elements.newTask.value = ``;
		}}
	>
		<label
			htmlFor={`${list}_newTask`}
		>
			New Task Name
		</label>
		<input
			type="text"
			placeholder="New Task"
			name={`newTask`}
			id={`${list}_newTask`}
		/>
		<button type="submit">
			Add Task
		</button>
	</form>
);

const MultipleAdd = ({ list, createTask }) => (
	<form
		className={styles.form}
		onSubmit={(e) => {
			e.preventDefault();
			const newLabel = e.target.elements.newTask.value;
			const newTasks = newLabel.split(`\n`);

			newTasks.forEach((task) => {
				createTask(task);
			});

			e.target.elements.newTask.value = ``;
		}}
	>
		<label
			htmlFor={`${list}_newTask_multiple`}
		>
			Add new task on each line
		</label>
		<textarea
			defaultValue={`Task 1\nTask 2\nTask 3`}
			name={`newTask`}
			id={`${list}_newTask_multiple`}
		/>
		<button type="submit">
			Add Task
		</button>
	</form>
);

export default AddTask;
