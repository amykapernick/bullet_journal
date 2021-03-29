import React, {
	Fragment
} from 'react';

import Layout from '../components/partials/layout';
import List from '../components/parts/list';
import Notes from '../components/parts/notes';
import styles from '../src/scss/pages/overview.module.scss';

const IndexPage = ({
	weekId, weekString, monthId, monthString, day
}) => (
	<Layout className={styles.overview}>
		<h1 className="sr-only">Overview</h1>
		<p className={`${styles.title} ${styles.week}`}>{weekString}</p>
		<p className={`${styles.title} ${styles.month}`}>{monthString}</p>
		<section className={`${styles.list} ${styles.goals} ${styles.goals_w}`}>
			<h2>Goals</h2>
			<List {...{ sectionId: weekId, listId: `goals` }} />
		</section>
		<section className={`${styles.list} ${styles.today}`}>
			<h2>Today</h2>
			<List {...{ sectionId: weekId, listId: day }} />
		</section>
		<section className={`${styles.list} ${styles.events}`}>
			<h2>Events</h2>
			<List {...{ sectionId: monthId, listId: `events` }} />
		</section>
		<section className={`${styles.list} ${styles.goals} ${styles.goals_m}`}>
			<h2>Goals</h2>
			<List {...{ sectionId: monthId, listId: `goals` }} />
		</section>
		<section className={`${styles.list} ${styles.notes} ${styles.notes_w}`}>
			<h2>Week</h2>
			<Notes {...{ sectionId: weekId }} />
		</section>
		<section className={`${styles.list} ${styles.notes} ${styles.notes_m}`}>
			<h2>Month</h2>
			<Notes {...{ sectionId: monthId }} />
		</section>
	</Layout>
);

export default IndexPage;
