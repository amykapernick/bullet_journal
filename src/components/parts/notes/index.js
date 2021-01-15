import React, {
	useState, useEffect, Fragment
} from 'react';
import {
	gql, useQuery, ApolloClient, InMemoryCache, useMutation
} from '@apollo/client';

import { GET_NOTE } from '../../../utils/fetchData/notes';

const Notes = ({ section }) => {
	const { loading, error, data } = useQuery(GET_NOTE, {
			variables: {
				section
			}
		}),
		changeLabel = (e) => {
			if (e) {
				const newNotes = e.target.value;

				// setNotes(newNotes);

				// saveLocal(notes);
			}
		};

	// console.log(data);

	// useEffect(() => { saveLocal(notes); }, [notes]);

	return (
		<Fragment>
			<label className="sr-only">Edit Notes</label>
			<textarea
				name="notes"
				onChange={(e) => { changeLabel(e); }}
				defaultValue={data?.note?.notes}
			>
			</textarea>
		</Fragment>
	);
};

export default Notes;
