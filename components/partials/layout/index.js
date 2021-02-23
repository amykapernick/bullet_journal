import React, { Fragment } from 'react';
import {
	useLocation
} from 'react-router-dom';

import Header from '../header';

const Layout = ({ children, weekId, monthId }) => {
	// const className = `${useLocation().pathname.replace(/^\//, ``).split(`/`)[0]}`;

	console.log();

	return (
		<Fragment>
			<Header {...{ monthId, weekId }} />
			<main className={`className`}>
				{children}
			</main>
		</Fragment>
	);
};

export default Layout;
