import {
	gql
} from '@apollo/client';

const ADD_EVENT = gql`
	mutation AddEvent(
		$event: EventInput!, 
		$section: SectionInput!
	) {
		addSection(section: $section) {
			sectionId
			id
		}
		addEvent(event: $event) {
			name
			startDate
			endDate
			id 
		}
	}
`;

export default ADD_EVENT;
