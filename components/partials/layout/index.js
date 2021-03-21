import React, { Fragment } from 'react';

import Header from '../header';

const Layout = ({
	children, className
}) => (
	<Fragment>
		<Header />
		<main className={`${className}`}>
			{children}
		</main>
	</Fragment>
);

export default Layout;
