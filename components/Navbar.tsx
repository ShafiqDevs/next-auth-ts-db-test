import Link from 'next/link';
import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

type Props = {};

export default function Navbar({}: Props) {
	const { data: session } = useSession();
	return (
		<div className='flex gap-4 text-2xl justify-end m-4'>
			<Link href={`/`}>
				<a>home</a>
			</Link>
			{session && (
				<Link href={`/dashboard`}>
					<a>dashboard</a>
				</Link>
			)}
			{session ? (
				<h1
					onClick={() => {
						signOut();
					}}>
					signOut
				</h1>
			) : (
				<h1
					onClick={() => {
						signIn();
					}}>
					SignIn
				</h1>
			)}
		</div>
	);
}
