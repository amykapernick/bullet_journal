import React, {
	Fragment, useState
} from 'react';
import { useRouter } from 'next/router';

import Layout from '../../../../components/partials/layout';

import List from '../../../../components/parts/list'


const ListPage = () => {
	const router = useRouter()
	const params = router.query;

	return (
		<Layout>
			<h1>List Page</h1>
			<List {...params} />
		</Layout>
	);
};

export default ListPage;
