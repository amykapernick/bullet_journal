import {
	useQuery
} from '@apollo/client';
import React, {
	Fragment,
	useEffect, 	useState
} from 'react';

import { FETCH_TASKS } from '../../../utils/api/section';
import generateListName from '../../../utils/list/generateListName';
import generateSectionName from '../../../utils/list/generateSectionName';
import AddTask from '../addTask';
import ListItem from '../listItem';

const List = ({ listId = ``, sectionId = `` }) => {
	const section = generateSectionName(sectionId);
	const list = generateListName(listId);
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
			<h2>{list}</h2>
			<button
				type="button"
				onClick={() => toggleModalOpen(!modalOpen)}
			>
				Add Task
			</button>
			{modalOpen
				&& <div>
					<button
						type="button"
						onClick={() => toggleModalOpen(false)}
					>
						Close Modal
					</button>
					<AddTask {...{
						listId, sectionId, toggleModalOpen
					}} />
				</div>
			}
			<ul>
				{data.tasks.map((item) => (
					<ListItem key={JSON.stringify(item)} {...{ ...item, listId, sectionId }} />
				))}
			</ul>
		</Fragment>
	);
};

export default List;
