import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import * as generate from '../../../utils/generateIds';

const Header = ({ monthId, weekId }) => {
	const router = useRouter();
	console.log(router.query);
	// const id = (page === `week`) ? weekId : monthId

	console.log(router);

	// console.log(router);
	// const paths = useLocation().pathname.replace(/^\//, ``).split(`/`),
	// 	page = paths[0],
	// 	id = (page === `week`) ? weekId : monthId,
	// 	currentDate = paths[1] ? new Date(paths[1]) : new Date(id),
	// 	getDate = currentDate.getDate(),
	// 	getMonth = currentDate.getMonth(),
	// 	prevWeek = new Date(currentDate).setDate(getDate - 7),
	// 	nextWeek = new Date(currentDate).setDate(getDate + 7),
	// 	prevMonth = new Date(currentDate).setMonth(getMonth - 1),
	// 	nextMonth = new Date(currentDate).setMonth(getMonth + 1);

	return (
		<header className="header">
			<h1><Link href="/">Bullet Journal</Link></h1>
			<nav>
				<ul>
					<li><Link href="/week">Weekly View</Link></li>
					<li><Link href="/month">Monthly View</Link></li>
					{/* {page === `week`
						&& <Fragment>
							<li>
								<a href={`/week/${generate.weekId(new Date(prevWeek))}`}>
									Previous Week
								</a>
							</li>
							<li>
								<a href={`/week/${generate.weekId(new Date(nextWeek))}`}>
									Next Week
								</a>
							</li>
						</Fragment>
					}
					{page === `month`
						&& <Fragment>
							<li>
								<a href={`/month/${generate.monthId(new Date(prevMonth))}`}>
									Previous Month
								</a>
							</li>
							<li>
								<a href={`/month/${generate.monthId(new Date(nextMonth))}`}>
									Next Month
								</a>
							</li>
						</Fragment>
					} */}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
