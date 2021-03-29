import React, { Fragment } from 'react';

import lists from '../../../_data/lists/week';
import Layout from '../../../components/partials/layout';
import List from '../../../components/parts/list';
import Notes from '../../../components/parts/notes';
import styles from './week.module.scss';

const WeekPage = ({ weekId, weekString, day }) => (
	<Layout className={styles.week} {...{ sectionId: weekId }}>
		<h1 className={styles.title}>{weekString}</h1>
		{lists.map((list) => (
			<section
				key={list.value}
				className={`${styles.list} ${list.lists && styles.parent} ${styles[list.value]}`}
			>
				<h2 className={`${list.lists && `sr-only`}`}>{list.name}</h2>
				{list.lists
					? <ul className={styles.subLists}>
						{list.lists.map((l) => (
							<li
								key={l.value}
								className={`${styles.list_sub} ${l.value === day && styles.current}`}
							>
								<h3>{l.name}</h3>
								<List

									{...{ sectionId: weekId, listId: l.value }}
								/>
							</li>
						))}
					</ul>
					: <List {...{ sectionId: weekId, listId: list.value }} />
				}
			</section>
		))}
		<section className={`${styles.list} ${styles.notes}`}>
			<h2>Notes</h2>
			<Notes {...{ sectionId: weekId }} />
		</section>
	</Layout>
);

export default WeekPage;
