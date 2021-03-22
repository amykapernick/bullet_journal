import {
	gql
} from '@apollo/client';

const FETCH_NOTES = gql`
	query FetchNotes(
		$section: String!
	) {
		note(
			section: $section
		) {
			notes
			id
		}
	}
`;

export default FETCH_NOTES;
