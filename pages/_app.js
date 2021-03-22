import '../src/scss/main.scss';

import {
	ApolloClient, 	ApolloProvider, InMemoryCache
} from '@apollo/client';
import React, { Fragment } from 'react';

const Main = ({ Component }) => {
	if (
		typeof window !== `undefined`
		&& window.location.search.match(/\?/)
	) {
		return (
			<Fragment>
				<ApolloProvider client={
					new ApolloClient({
						uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
						cache: new InMemoryCache()
					})
				}>
					<Component />
				</ApolloProvider>
			</Fragment>
		);
	}
};

export default Main;
