import React, { useRef, useState } from 'react';
import {
	useMutation
} from '@apollo/client';

import { DELETE_TASK, EDIT_TASK } from '../../../utils/fetchData/tasks';

import Delete from '../../icons/delete';
import Edit from '../../icons/edit';
import Close from '../../icons/close';
import Check from '../../icons/check';

const Item = ({
	index, taskId, id, completed, name
}) => {
	const ref = useRef(null),
		[editTaskOpen, openEditTask] = useState(false),
		[completeTask] = useMutation(EDIT_TASK),
		[editTask] = useMutation(EDIT_TASK),
		[deleteTask] = useMutation(DELETE_TASK);
	return (
		<li key={index} ref={ref} data-id={id}>
			<input
				type="checkbox"
				name={`checkbox`}
				defaultChecked={completed}
				onChange={() => {
					completeTask({
						variables: {
							task: {
								id,
								completed: !completed
							}
						}
					});
				}}
				id={`${taskId}_checkbox`}
			/>
			<label
				htmlFor={`${taskId}_checkbox`}
			>
				<Check className="check" />
				<span>{name}</span>
			</label>
			<button className="icon" onClick={() => openEditTask(!editTaskOpen)}>
				<Edit />
				<span className="sr-only">Edit Task</span>
			</button>

			<div className="modal" open={editTaskOpen}>
				<button className="icon close" onClick={() => openEditTask(!editTaskOpen)}>
					<Close />
					<span className="sr-only">Close Modal</span>
				</button>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						editTask({
							variables: {
								task: {
									id,
									name: e.target.elements[`label_${id}`].value
								}
							}
						});
						openEditTask(!editTaskOpen);
					}}
				>
					<legend>Edit Task</legend>
					<input
						type="checkbox"
						name={`checkbox_modal`}
						defaultChecked={completed}
						onChange={() => {
							completeTask({
								variables: {
									task: {
										id,
										completed: !completed
									}
								}
							});
						}}
						id={`${taskId}_checkbox_modal`}
					/>
					<label
						htmlFor={`${taskId}_checkbox_modal`}
					>
						<Check className="check" />
						<span className="sr-only">
							{completed ? `Uncomplete` : `Complete`} {name}
						</span>
					</label>
					<label className="sr-only">Edit {name}</label>
					<input
						type="text"
						defaultValue={name}
						name={`label_${id}`}
					/>
					<button
						className="icon remove"
						type="button"
						onClick={() => {
							deleteTask({
								variables: {
									task: id
								}
							});
							openEditTask(!editTaskOpen);
							// location.reload();
						}}
					>
						<Delete />
						<span className="sr-only">Delete Task</span>
					</button>
				</form>
			</div>
		</li>
	);
};

export default Item;
