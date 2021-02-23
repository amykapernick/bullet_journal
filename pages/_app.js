import React, { Fragment } from 'react';
import {
	ApolloProvider, ApolloClient, InMemoryCache
} from '@apollo/client';

import { startOfWeek } from 'date-fns';

import {
	weekId, weekString, monthId, monthString
} from '../utils/generateIds';

import '../src/scss/main.scss';

const App = ({ Component, pageProps }) => {
	const currentMonth = new Date(),
		currentWeek = startOfWeek(new Date(), { weekStartsOn: 1 }),
		weekDate = new Date(currentWeek),
		details = {
			weekId: weekId(weekDate),
			weekString: weekString(weekDate),
			monthId: monthId(currentMonth),
			monthString: monthString(currentMonth),
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

export default App;
