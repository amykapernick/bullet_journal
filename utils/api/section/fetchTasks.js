import {
	gql
} from '@apollo/client';

const FETCH_TASKS = gql`
	query FetchTasks(
		$section: String!
		$list: String!
	) {
		tasks(
			section: $section
			list: $list
		) {
			name
			due
			id
			completed
		}
	}
`

export default FETCH_TASKS