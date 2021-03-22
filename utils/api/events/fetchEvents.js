import {
	gql
} from '@apollo/client';

const FETCH_EVENTS = gql`
	query FetchEvents(
		$section: String!
	) {
		events(
			section: $section
		) {
			name
			startDate
			endDate
			id  
			section {
				sectionId
			}
		}
	}
`;

export default FETCH_EVENTS;
