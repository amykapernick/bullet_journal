import {
	gql
} from '@apollo/client';

export const GET_NOTE = gql`
		query GetNote($section: String!) {
			note(section: $section) {
				id
				notes
				section {
					sectionId
				}
			}
		}
`;

// export const EDITNOTE = gql``;

// export const ADD_TASK = gql`
// 	mutation AddTask($task: TaskInput!) {
// 		addTask(task: $task) {
// 			name
// 			id
// 			completed
// 			due
// 		}
// 	}
// `;
