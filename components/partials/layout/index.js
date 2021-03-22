import React, { Fragment, useEffect, useState } from 'react';

import Header from '../header';

const Layout = ({
	children, className
}) => {
	const [authorised, setAuthorised] = useState(false);

	if (typeof window !== `undefined`) {
		const params = {};
		window.location.search.replace(/^\?/, ``).split(`&`).forEach((i) => {
			const values = i.split(`=`);

			params[values[0]] = values[1];
		});

		if (params?.auth_token) {
			window.localStorage.setItem(`auth_token`, params.auth_token);
		}
	}

	useEffect(() => {
		if (typeof window !== `undefined`) {
			const auth = window.localStorage.getItem(`auth_token`);

			if (auth == process.env.NEXT_PUBLIC_LOGIN_AUTH) {
				setAuthorised(true);
			}
		}
	}, []);

	return (
		<Fragment>
			<Header />
			<main className={`${className}`}>
				{authorised
					? <Fragment>{children}</Fragment>
					: <p>Looks like you don't have permission to view this app</p>
				}
			</main>
		</Fragment>
	);
};

export default Layout;
