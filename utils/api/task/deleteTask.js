import {
	gql
} from '@apollo/client';

const DELETE_TASK = gql`
	mutation DeleteTask($task: ID!) {
		deleteTask(task: $task) {
			name
			id
			completed
			due
		}
	}
`;

export default DELETE_TASK;
