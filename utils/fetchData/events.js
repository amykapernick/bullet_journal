import {
	gql
} from '@apollo/client';

export const GET_EVENTS = gql`
		query GetEvents($section: String!) {
			events(section: $section) {
				name
				id
				startDate
				endDate
			}
		}
`;

export const ADD_EVENT = gql`
	mutation AddEvent($event: EventInput!) {
		addEvent(event: $event) {
			name
			id
			startDate
			endDate
		}
	}
`;

export const EDIT_EVENT = gql`
	mutation EditEvent($event: EventInput!) {
		editEvent(event: $event) {
			name
			id
			startDate
			endDate
		}
	}
`;

export const DELETE_EVENT = gql`
	mutation DeleteEvent($event: ID!) {
		deleteEvent(event: $event) {
			name
			id
			startDate
			endDate
		}
	}
`;
