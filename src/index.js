import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import {
	ApolloProvider, ApolloClient, InMemoryCache
} from '@apollo/client';

import { startOfWeek } from 'date-fns';
import Layout from './components/partials/layout';
import Home from './pages/home';
import Week from './pages/weekly';
import Month from './pages/monthly';

import {
	weekId, weekString, monthId, monthString
} from './utils/generateIds';

function App() {
	const currentMonth = new Date(),
		currentWeek = startOfWeek(new Date(), { weekStartsOn: 1 }),
		weekDate = new Date(currentWeek),
		details = {
			weekId: weekId(weekDate),
			weekString: weekString(weekDate),
			monthId: monthId(currentMonth),
			monthString: monthString(currentMonth)
		};

	return (
		<Router>
			<Layout {...details}>
				<ApolloProvider client={new ApolloClient({
					uri: process.env.GRAPHQL_URL,
					cache: new InMemoryCache()
				})}>
					<Switch>
						<Route exact path="/">
							<Home {...details} />
						</Route>
						<Route path="/week/:weekId?">
							<Week {...details} />
						</Route>
						<Route exact path="/month/:monthId?">
							<Month {...details} />
						</Route>
					</Switch>
				</ApolloProvider>
			</Layout>
		</Router>
	);
}

ReactDOM.render(<App />, document.getElementById(`app`));
