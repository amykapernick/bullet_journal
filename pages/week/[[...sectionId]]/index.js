import {
	format, isMonday, parse, subDays
} from 'date-fns';
import nextMonday from 'date-fns/nextMonday';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

import lists from '../../../_data/lists/week';
import Layout from '../../../components/partials/layout';
import List from '../../../components/parts/list';
import Notes from '../../../components/parts/notes';
import styles from './week.module.scss';

const WeekPage = () => {
	const router = useRouter();
	const params = router.query;
	let date = new Date();

	if (params?.sectionId) {
		date = parse(params.sectionId[0], `dd-MMM-yyyy`, new Date());
	} else if (!isMonday(date)) {
		date = subDays(nextMonday(date), 7);
	}

	const month = format(date, `dd-MMM-yyyy`);
	const sectionId = month.toLowerCase();

	return (
		<Layout className={styles.week} {...{ sectionId }}>
			<h1 className={styles.title}>{month}</h1>
			{lists.map((list) => (
				<section
					key={list.value}
					className={`${styles.list} ${list.lists && styles.parent} ${styles[list.value]}`}
				>
					<h2 className={`${list.lists && `sr-only`}`}>{list.name}</h2>
					{list.lists
						? <ul className={styles.subLists}>
							{list.lists.map((l) => (
								<li key={l.value} className={styles.list_sub}>
									<h3>{l.name}</h3>
									<List

										{...{ sectionId, listId: l.value }}
									/>
								</li>
							))}
						</ul>
						: <List {...{ sectionId, listId: list.value }} />
					}
				</section>
			))}
			<section className={`${styles.list} ${styles.notes}`}>
				<h2>Notes</h2>
				<Notes {...{ sectionId }} />
			</section>
		</Layout>
	);
};

export default WeekPage;
