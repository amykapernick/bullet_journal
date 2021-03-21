import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { parse, add, sub } from 'date-fns';

const Header = () => (
	<header>
		<h1><Link href="/">Bullet Journal</Link></h1>
	</header>
);

export default Header;
