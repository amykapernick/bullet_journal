import React, {
	useState, useEffect, Fragment
} from 'react';
import { useLocation } from 'react-router-dom';
import {
	gql, useQuery, ApolloClient, InMemoryCache, useMutation
} from '@apollo/client';

import Item from '../listItem';

import Close from '../../icons/close';
import Add from '../../icons/add';
import uuid from '../../../utils/uuid';
import { GET_TASKS, ADD_TASK } from '../../../utils/fetchData/tasks';

const List = ({ listId, section }) => {
	const gql_options = {
			variables: {
				list: listId,
				section
			}
		},
		{ loading, error, data } = useQuery(GET_TASKS, gql_options),
		// [todos, setTodos] = useState(data?.tasks || []),
		[newTaskOpen, openNewTask] = useState(false),
		[addMultiple, toggleInputMethod] = useState(false),
		completeTask = (ref, e) => {
			const { current } = ref,
				checkbox = e.target,
				taskId = parseInt(current.getAttribute(`data-id`)),
				list = todos;

			list.some((task) => {
				if (parseInt(task.id) === taskId) {
					task.completed = checkbox.checked;
				}

				return task.id === taskId;
			});

			setTodos(list);

			// saveLocal(todos);
		},
		changeLabel = (ref, e) => {
			if (e && ref) {
				const { current } = ref,
					newLabel = e.target.value,
					taskId = parseInt(current.getAttribute(`data-id`)),
					list = todos;

				list.some((task) => {
					if (parseInt(task.id) === taskId) {
						task.name = newLabel;
					}

					return task.id === taskId;
				});

				setTodos(list);

				// saveLocal(todos);
			}
		},
		changeLabelForm = (ref, e) => {
			changeLabel(ref, { target: e.target.elements.label });
		},
		deleteTask = (index) => {
			const list = data.tasks;

			list.splice(index, 1);

			// setTodos(list);

			// saveLocal(todos);

			// location.reload();
		},
		[addTask] = useMutation(ADD_TASK),
		addMultipleTask = (e) => {
			const newLabel = e.target.elements[`${listId}_newTask`].value,
				newTasks = newLabel.split(`\n`);

			newTasks.forEach((task) => {
				addTask({
					target: {
						elements: {
							[`${listId}_newTask`]: {
								value: task
							}
						}
					}
				});
			});
		};

	// useEffect(() => { setTodos(data?.tasks || []); }, [data]);

	if (loading) {
		return (
			<p className="list">Loading...</p>
		);
	}

	if (error) {
		return (
			<p className="list">Whoops, looks like soemthing went wrong. Try that again...</p>
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
								}
							}
						});
						openNewTask(!newTaskOpen);
						// location.reload();
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
				<form className="toggle" onSubmit={(e) => addMultipleTask(e)} open={addMultiple}>
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
							taskId: task.id,
							functions: {
								completeTask,
								changeLabelForm,
								changeLabel,
								deleteTask
							}
						}}
					/>
				))}
			</ul>
		</Fragment>
	);
};

export default List;
