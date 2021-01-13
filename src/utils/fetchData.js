import {
	gql, useQuery, ApolloClient, InMemoryCache
} from '@apollo/client';

const client = new ApolloClient({
	uri: `http://localhost:7071/api/graphql`,
	cache: new InMemoryCache()
});

export const GET_TASKS = gql`
		query {
			tasks {
				name
			}
		}
`;
