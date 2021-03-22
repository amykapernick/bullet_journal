import { useRouter } from 'next/router';
import React, {
	Fragment, useState
} from 'react';

import Layout from '../../../components/partials/layout';
import Notes from '../../../components/parts/notes';

const NotesPage = () => {
	const router = useRouter();
	const params = router.query;

	return (
		<Layout>
			<h1>Notes Page</h1>
			<Notes {...params} />
		</Layout>
	);
};

export default NotesPage;
