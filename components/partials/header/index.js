import {
	addDays, addMonths, format, parse, subDays, subMonths
} from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

import styles from './header.module.scss';

const Header = ({ sectionId = `` }) => {
	let next = false;
	let prev = false;
	let period = `week`;

	if (sectionId?.match(/\d{2}-\w{3}-\d{4}/)) {
		const week = parse(
			sectionId,
			`dd-MMM-yyyy`,
			new Date()
		);

		next = format(
			addDays(week, 7),
			`dd-MMM-yyyy`
		).toLowerCase();
		prev = format(
			subDays(week, 7),
			`dd-MMM-yyyy`
		).toLowerCase();
	} else if (sectionId?.match(/\w{3}-\d{4}/)) {
		period = `month`;

		const month = parse(
			sectionId,
			`MMM-yyyy`,
			new Date()
		);

		next = format(
			addMonths(month, 1),
			`MMM-yyyy`
		).toLowerCase();
		prev = format(
			addMonths(month, 1),
			`MMM-yyyy`
		).toLowerCase();
	}

	return (
		<header className={styles.header}>
			<p className={styles.title}><Link href="/"><a>Bullet Journal</a></Link></p>
			<nav className={styles.nav}>
				<ul>
					<li>
						<Link href="/week"><a>Weekly View</a></Link>
					</li>
					<li>
						<Link href="/month"><a>Monthly View</a></Link>
					</li>
					{prev
						&& <li>
							<Link href={`/${period}/${prev}`}><a>Previous {period}</a></Link>
						</li>
					}
					{next
						&& <li>
							<Link href={`/${period}/${next}`}><a>Next {period}</a></Link>
						</li>
					}

				</ul>
			</nav>
		</header>
	);
};

export default Header;
