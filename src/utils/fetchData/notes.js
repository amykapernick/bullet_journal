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

export const EDIT_NOTE = gql`
	mutation editNote($note: NoteInput!) {
		editNote(note: $note) {
			id
			notes
			section {
				sectionId
			}
		}
	}
`;

export const ADD_NOTE = gql`
	mutation addNote($note: NoteInput!, $section: SectionInput!) {
		addSection(section: $section) {
			sectionId
			period
		}
		addNote(note: $note) {
			id
			notes
			section {
				sectionId
			}
		}
	}
`;
