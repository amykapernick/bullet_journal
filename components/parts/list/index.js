import React, {
	useState, useEffect, Fragment
} from 'react';
import {
	useQuery, useMutation
} from '@apollo/client';

import ListItem from '../listItem'

import generateSectionName from '../../../utils/list/generateSectionName'
import {ADD_SECTION, FETCH_TASKS} from '../../../utils/api/section'


const List = ({ listId = '', sectionId = '' }) => {
	const section = generateSectionName(sectionId)
	const options = {
		variables: {
			section: sectionId,
			list: listId
		},
		context: process.env.NEXT_PUBLIC_AUTH_TOKEN
	}
	const {loading, error, data} = useQuery(FETCH_TASKS, options)

	if(loading) return <p>List is loading</p>

	if(error) return <p>Whoops, looks like something went wrong</p>

	return (
		<Fragment>
			<h2>{section}</h2>
			<ul>
				{data.tasks.map(item => (
					<ListItem {...item} />
				))}
			</ul>
		</Fragment>
	)
}

export default List