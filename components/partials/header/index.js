import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { parse, add, sub } from 'date-fns';

import * as generate from '../../../utils/generateIds';

const Header = ({ weekId, monthId }) => {
	const page = weekId ? `week` : `month`;

	let prev,
		next;

	if (page === `week`) {
		const current = parse(weekId, `dd-MMM-yyyy`, new Date());

		prev = sub(current, { days: 7 });
		next = add(current, { days: 7 });
	} else if (page === `month`) {
		const current = parse(monthId, `MMM-yyyy`, new Date());

		prev = sub(current, { months: 1 });
		next = add(current, { months: 1 });
	}

	return (
		<header className="header">
			<h1><Link href="/">Bullet Journal</Link></h1>
			<nav>
				<ul>
					<li><Link href="/week">
						<a>Weekly View</a>
					</Link></li>
					<li><Link href="/month"><a>Monthly View</a></Link></li>
					{page === `week`
						&& <Fragment>
							<li>
								<Link href={`/week/${generate.weekId(new Date(prev))}`}>
									<a>Previous Week</a>
								</Link>
							</li>
							<li>
								<Link href={`/week/${generate.weekId(new Date(next))}`}>
									<a>Next Week</a>
								</Link>
							</li>
						</Fragment>
					}
					{page === `month`
						&& <Fragment>
							<li>
								<Link href={`/month/${generate.monthId(new Date(prev))}`}>
									<a>Previous Month</a>
								</Link>
							</li>
							<li>
								<Link href={`/month/${generate.monthId(new Date(next))}`}>
									<a>Next Month</a>
								</Link>
							</li>
						</Fragment>
					}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
