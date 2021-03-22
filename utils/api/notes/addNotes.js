import {
	gql
} from '@apollo/client';

const ADD_NOTES = gql`
	mutation AddNotes(
		$note: NoteInput!, 
		$section: SectionInput!
	) {
		addSection(section: $section) {
			sectionId
			id
		}
		addNote(note: $note) {
			notes
			id
		}
	}
`;

export default ADD_NOTES;
