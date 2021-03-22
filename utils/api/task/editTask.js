import {
	gql
} from '@apollo/client';

const EDIT_TASK = gql`
	mutation EditTask(
		$task: TaskInput!, 
		$section: SectionInput!
	) {
		addSection(section: $section) {
			sectionId
			id
		}
		editTask(task: $task) {
			name
			id
			completed
			due
			list
			section {
				sectionId
			}
		}
	}
`;

export default EDIT_TASK;
