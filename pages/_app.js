import React, { Fragment } from 'react';
import {
	ApolloProvider, ApolloClient, InMemoryCache
} from '@apollo/client';

import '../src/scss/main.scss';

const Main = ({ Component }) => {
	console.log(``);

	return (
		<Fragment>
			<ApolloProvider client={new ApolloClient({
				uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
				cache: new InMemoryCache()
			})}>
				<Component />
			</ApolloProvider>
		</Fragment>
	);
};

export default Main;
