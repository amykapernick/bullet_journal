import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { parse } from 'date-fns';

import * as generate from '../../../utils/generateIds';

const Header = ({ weekId, monthId }) => {
	const page = weekId ? `week` : `month`;

	let prev,
		next;

	if (page === `week`) {
		const current = parse(weekId, `dd-MMM-yyyy`, new Date());

		prev = new Date(current).setDate(current.getDate() - 7);
		next = new Date(current).setDate(current.getDate() + 7);
	} else if (page === `month`) {
		const current = parse(monthId, `MMM-yyyy`, new Date());

		prev = new Date(current).setDate(current.getDate() - 7);
		next = new Date(current).setDate(current.getDate() + 7);
	}

	return (
		<header className="header">
			<h1><Link href="/">Bullet Journal</Link></h1>
			<nav>
				<ul>
					<li><Link href="/week">Weekly View</Link></li>
					<li><Link href="/month">Monthly View</Link></li>
					{page === `week`
						&& <Fragment>
							<li>
								<a href={`/week/${generate.weekId(new Date(prev))}`}>
									Previous Week
								</a>
							</li>
							<li>
								<a href={`/week/${generate.weekId(new Date(next))}`}>
									Next Week
								</a>
							</li>
						</Fragment>
					}
					{page === `month`
						&& <Fragment>
							<li>
								<a href={`/month/${generate.monthId(new Date(prev))}`}>
									Previous Month
								</a>
							</li>
							<li>
								<a href={`/month/${generate.monthId(new Date(next))}`}>
									Next Month
								</a>
							</li>
						</Fragment>
					}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
