import { useMutation } from '@apollo/client';
import { format, parse } from 'date-fns';
import React, { useState } from 'react';

import Edit from '../../../src/img/edit.svg';
import Close from '../../../src/img/remove.svg';
import { FETCH_TASKS } from '../../../utils/api/section';
import { DELETE_TASK, EDIT_TASK } from '../../../utils/api/task';
import UpdateTask from '../updateTask';
import styles from './listItem.module.scss';

const ListItem = ({
	name, id, completed, due, sectionId, listId
}) => {
	const refetch = {
		refetchQueries: [
			{
				query: FETCH_TASKS,
				variables: {
					section: sectionId,
					list: listId
				}
			}
		]
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
		<li className={`${styles.item} ${due && styles.date} ${completed && styles.completed}`}>
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
			{due
				&& <time
					className={styles.due}
					dateTime={format(new Date(due), `yyyy-MM-dd`)}
				>
					{format(new Date(due), `dd-MMM`)}
				</time>
			}
			<button
				className={styles.remove}
				type="button"
				onClick={() => removeTask()}
			>
				<Close />
				<span className="sr-only">Delete Task</span>
			</button>
			<button
				className={styles.edit}
				type="button"
				onClick={() => toggleModal(!editModal)}
			>
				<Edit />
				<span className="sr-only">Edit Task</span>
			</button>
			{editModal
				&& <div className={styles.modal}>
					<button
						className={styles.close}
						type="button"
						onClick={() => toggleModal(!editModal)}
					>
						<Close />
						<span className="sr-only">Close Edit Modal</span>
					</button>
					<UpdateTask {...{
						name,
						id,
						completed,
						due,
						sectionId,
						listId,
						toggleModal
					}} />
				</div>
			}
		</li>
	);
};

export default ListItem;
