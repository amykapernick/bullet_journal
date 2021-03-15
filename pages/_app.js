import React, { Fragment } from 'react';
import {
	ApolloProvider, ApolloClient, InMemoryCache
} from '@apollo/client';
import { useRouter } from 'next/router';
import App from 'next/app';

import { startOfWeek } from 'date-fns';

import {
	weekId, monthId
} from '../utils/generateIds';

import '../src/scss/main.scss';

const Main = ({ Component, pageProps }) => {
	const router = useRouter(),
		{ query } = router,
		currentMonth = new Date(),
		currentWeek = startOfWeek(new Date(), { weekStartsOn: 1 }),
		weekDate = new Date(currentWeek),
		details = {
			weekId: query.weekId || weekId(weekDate),
			monthId: query.monthId || monthId(currentMonth),
			...pageProps
		};

	return (
		<Fragment>
			<ApolloProvider client={new ApolloClient({
				uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
				cache: new InMemoryCache()
			})}>
				<Component {...details} />
			</ApolloProvider>
		</Fragment>
	);
};

Main.getInitialProps = (appContext) => {
	// calls page's `getInitialProps` and fills `appProps.pageProps`
	const appProps = App.getInitialProps(appContext);

	console.log(appProps);

	return { ...appProps };
};

export default Main;
