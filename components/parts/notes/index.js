import {
	useMutation,
	useQuery
} from '@apollo/client';
import React from 'react';

import { ADD_NOTES, EDIT_NOTES, FETCH_NOTES } from "../../../utils/api/notes";

const Notes = ({ sectionId }) => {
	const options = {
		variables: {
			section: sectionId,
		},
		context: process.env.NEXT_PUBLIC_AUTH_TOKEN
	};
	const {
		loading, error, data
	} = useQuery(FETCH_NOTES, options);
	const [addNotes] = useMutation(ADD_NOTES);
	const [editNotes] = useMutation(EDIT_NOTES);
	const updateNotes = (e) => {
		const notes = e.target.value;

		if (data?.note?.id) {
			editNotes({
				variables: {
					note: {
						section: sectionId,
						notes,
						id: data.note.id
					}
				}
			});
		} else {
			addNotes({
				variables: {
					note: {
						section: sectionId,
						notes
					},
					section: {
						sectionId,
					}
				}
			});
		}
	};

	if (loading) return <p>Notes is loading</p>;

	if (error) return <p>Whoops, looks like something went wrong</p>;

	return (
		<textarea
			name={`${sectionId}_notes`}
			defaultValue={data?.note?.notes}
			onBlur={(e) => updateNotes(e)}
		></textarea>
	);
};

export default Notes;
