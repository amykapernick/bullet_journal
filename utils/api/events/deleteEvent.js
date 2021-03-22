import {
	gql
} from '@apollo/client';

const DELETE_EVENT = gql`
	mutation DeleteEvent($event: ID!) {
		deleteEvent(event: $event) {
			name
			startDate
			endDate
			id  
		}
	}
`;

export default DELETE_EVENT;
