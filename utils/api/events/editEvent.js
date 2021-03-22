import {
	gql
} from '@apollo/client';

const EDIT_EVENT = gql`
	mutation EditTask(
		$event: EventInput!, 
		$section: SectionInput!
	) {
		addSection(section: $section) {
			sectionId
			id
		}
		editEvent(event: $event) {
			name
			startDate
			endDate
			id 
		}
	}
`;

export default EDIT_EVENT;
