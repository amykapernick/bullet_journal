import React, {
	useState, useEffect, Fragment, useRef
} from 'react';
import {
	gql, useQuery, ApolloClient, InMemoryCache, useMutation
} from '@apollo/client';

import { GET_NOTE, EDIT_NOTE, ADD_NOTE } from '../../../utils/fetchData/notes';

const Notes = ({ section }) => {
	const { loading, error, data } = useQuery(GET_NOTE, {
			variables: {
				section
			}
		}),
		ref = useRef(),
		[editNote] = useMutation(EDIT_NOTE),
		[addNote] = useMutation(ADD_NOTE);

	// useEffect(() => {
	// 	if (!loading && !error && data?.note == null) {
	// 		addNote({
	// 			variables: {
	// 				note: {
	// 					section: {
	// 						sectionId: section,
	// 					},
	// 					notes: ``
	// 				},
	// 				section: {
	// 					sectionId: section,
	// 					period: `week`
	// 				}
	// 			}
	// 		});
	// 	}
	// }, [loading]);

	return (
		<Fragment>
			<label className="sr-only">Edit Notes</label>
			{/* <textarea
				ref={ref}
				name="notes"
				onChange={() => {
					editNote({
						variables: {
							note: {
								section: {
									sectionId: section
								},
								notes: ref.current.value
							}
						}
					});
				}}
				defaultValue={data?.note?.notes}
			>
			</textarea> */}
		</Fragment>
	);
};

export default Notes;
