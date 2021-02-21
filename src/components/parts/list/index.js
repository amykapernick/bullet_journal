import React, {
	useState, useEffect, Fragment
} from 'react';
import {
	useQuery, useMutation
} from '@apollo/client';

import Item from '../listItem';

import Close from '../../icons/close';
import Add from '../../icons/add';
import { GET_TASKS, ADD_TASK } from '../../../utils/fetchData/tasks';

const List = ({ listId, section }) => {
	const gql_options = {
			variables: {
				list: listId,
				section
			},
			context: process.env.AUTH_TOKEN
		},
		{ loading, error, data } = useQuery(GET_TASKS, gql_options),
		[newTaskOpen, openNewTask] = useState(false),
		[addMultiple, toggleInputMethod] = useState(false),
		[addTask] = useMutation(ADD_TASK);

	// console.log({
	// 	listId, loading, error, data
	// });

	if (loading) {
		return (
			<p className="list">Loading...</p>
		);
	}

	if (error) {
		return (
			<p className="list">Whoops, looks like something went wrong. Try that again...</p>
		);
	}

	return (
		<Fragment>
			 <div className="modal" open={newTaskOpen}>
				<button className="icon close" onClick={() => openNewTask(!newTaskOpen)}>
					<Close />
					<span className="sr-only">Close Modal</span>
				</button>
				<form
					className="toggle"
					open={!addMultiple}
					onSubmit={(e) => {
						e.preventDefault();
						addTask({
							variables: {
								task: {
									list: listId,
									section,
									name: e.target.elements[`${listId}_newTask`].value
								},
								section: {
									sectionId: section,
								}
							}
						});
						openNewTask(!newTaskOpen);
					}}
				>
					<legend>Add New Task</legend>
					<label className="sr-only">New Task Name</label>
					<input
						type="text"
						placeholder="New Task"
						name={`${listId}_newTask`}
					/>
					<button className="icon add" type="submit">
						<Add />
						<span className="sr-only">Add Task</span>
					</button>
				</form>
				<form
					className="toggle"
					open={addMultiple}
					onSubmit={(e) => {
						e.preventDefault();
						const newLabel = e.target.elements[`${listId}_newTask`].value,
							newTasks = newLabel.split(`\n`);

						newTasks.forEach((task) => {
							addTask({
								variables: {
									task: {
										list: listId,
										section,
										name: task
									}
								}
							});
						});
						openNewTask(!newTaskOpen);
					}}
				>
					<legend>Add New Tasks</legend>
					<label className="sr-only">New Tasks</label>
					<textarea
						className="multiple"
						defaultValue={`Task 1\nTask 2\nTask 3`}
						name={`${listId}_newTask`}
					/>
					<button className="icon add" type="submit">
						<Add />
						<span className="sr-only">Add Task</span>
					</button>
				</form>
				<button className="toggle add" type="button" onClick={() => toggleInputMethod(!addMultiple)}>
					{addMultiple
						? `Add single task`
						: `Add multiple tasks`
					}
				</button>
			</div>
			<button className="icon add" onClick={() => openNewTask(!newTaskOpen)}>
				<Add />
				<span className="sr-only">Add New Task</span>
			</button>
			<ul className="list">
				{data.tasks.map((task, index) => (
					<Item
						key={index}
						{...{
							...task,
							index,
							taskId: task.id
						}}
					/>
				))}
			</ul>
		</Fragment>
	);
};

export default List;
