import {
	gql
} from '@apollo/client';

const ADD_TASK = gql`
	mutation AddTask(
		$task: TaskInput!, 
		$section: SectionInput!
	) {
		addSection(section: $section) {
			sectionId
			id
		}
		addTask(task: $task) {
			name
			id
			completed
			due
		}
	}
`;

export default ADD_TASK;
