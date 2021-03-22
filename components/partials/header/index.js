import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

const Header = () => (
	<header>
		<h1><Link href="/">Bullet Journal</Link></h1>
	</header>
);

export default Header;
