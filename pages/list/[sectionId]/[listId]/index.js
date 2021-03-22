import { useRouter } from 'next/router';
import React, {
	Fragment, useState
} from 'react';

import Layout from '../../../../components/partials/layout';
import List from '../../../../components/parts/list';

const ListPage = () => {
	const router = useRouter();
	const params = router.query;

	if (!params?.sectionId || !params?.listId) return <p>Looks like something went wrong</p>;

	return (
		<Layout>
			<h1>List Page</h1>
			<List {...params} />
		</Layout>
	);
};

export default ListPage;
