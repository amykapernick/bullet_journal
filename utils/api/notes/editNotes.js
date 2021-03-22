import {
	gql
} from '@apollo/client';

const EDIT_NOTES = gql`
	mutation EditNotes(
		$note: NoteInput!, 
	) {
		editNote(note: $note) {
			notes
			id
		}
	}
`;

export default EDIT_NOTES;
