import '../src/scss/main.scss';

import {
	ApolloClient, 	ApolloProvider, InMemoryCache
} from '@apollo/client';
import {
	format, isMonday, parse, subDays
} from 'date-fns';
import nextMonday from 'date-fns/nextMonday';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

import generateSection from '../utils/generateSection';
import parseSection from '../utils/parseSection';

const Main = ({ Component }) => {
	const router = useRouter();
	const params = router.query;
	let date = new Date();
	const day = format(date, `EEEE`).toLowerCase();

	if (params?.sectionId) {
		date = parseSection(params.sectionId[0]);
	} else if (!isMonday(date)) {
		date = subDays(nextMonday(date), 7);
	}

	const details = {
		date,
		day,
		...generateSection(date)
	};

	return (
		<Fragment>
			<ApolloProvider client={
				new ApolloClient({
					uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
					cache: new InMemoryCache()
				})
			}>
				<Component {...details} />
			</ApolloProvider>
		</Fragment>
	);
};

export default Main;
