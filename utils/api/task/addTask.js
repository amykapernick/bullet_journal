import {
	gql
} from '@apollo/client';

const ADD_TASK = gql`
	mutation AddTask(
		$task: TaskInput!
	) {
		addTask(task: $task) {
			name
			id
			completed
			due
		}
	}
`;

export default ADD_TASK;
