import {
	useQuery
} from '@apollo/client';
import React, {
	Fragment,
	useEffect, 	useState
} from 'react';

import Add from '../../../src/img/add.svg';
import Close from '../../../src/img/remove.svg';
import { FETCH_TASKS } from '../../../utils/api/section';
import AddTask from '../addTask';
import ListItem from '../listItem';
import styles from './list.module.scss';

const List = ({ listId = ``, sectionId = `` }) => {
	const [modalOpen, toggleModalOpen] = useState(false);
	const options = {
		variables: {
			section: sectionId,
			list: listId
		},
		context: process.env.NEXT_PUBLIC_AUTH_TOKEN
	};
	const {
		loading, error, data
	} = useQuery(FETCH_TASKS, options);

	if (loading) return <p>List is loading</p>;

	if (error) return <p>Whoops, looks like something went wrong</p>;

	return (
		<Fragment>
			<button
				type="button"
				onClick={() => toggleModalOpen(!modalOpen)}
				className={styles.add}
			>
				<Add />
				<span className="sr-only">Add Task</span>
			</button>
			{modalOpen
				&& <div className={styles.modal}>
					<button
						className={styles.close}
						type="button"
						onClick={() => toggleModalOpen(false)}
					>
						<Close />
						<span className="sr-only">Close Modal</span>
					</button>
					<AddTask {...{
						listId, sectionId, toggleModalOpen
					}} />
				</div>
			}
			<ul className={styles.list}>
				{data.tasks.map((item) => (
					<ListItem key={JSON.stringify(item)} {...{ ...item, listId, sectionId }} />
				))}
			</ul>
		</Fragment>
	);
};

export default List;
