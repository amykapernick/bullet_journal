import {
	gql
} from '@apollo/client';

export const GET_TASKS = gql`
		query GetTasks($list: String!, $section: String!) {
			tasks(list: $list, section: $section) {
				name
				id
				completed
				due
			}
		}
`;

export const ADD_TASK = gql`
	mutation AddTask($task: TaskInput!) {
		addTask(task: $task) {
			name
			id
			completed
			due
		}
	}
`;

export const EDIT_TASK = gql`
	mutation EditTask($task: TaskInput!) {
		editTask(task: $task) {
			name
			id
			completed
			due
		}
	}
`;

export const DELETE_TASK = gql`
	mutation DeleteTask($task: ID!) {
		deleteTask(task: $task) {
			name
			id
			completed
			due
		}
	}
`;
