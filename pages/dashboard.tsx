import { getSession, GetSessionParams } from 'next-auth/react';
import axios from 'axios';
import db from '../utils/db';
import Subscriber from '../utils/models/subscriber';
type Props = {
	session: any;
	SubscrionStatus: Boolean;
};
const subscribe = async () => {};

export default function dashboard(props: Props) {
	return (
		<div>
			<h1>Dashboard Page</h1>
			{props.SubscrionStatus ? (
				<h1>Already subscribed</h1>
			) : (
				<>
					<h1>you have to sub here</h1>
					<button
						className='border-2 p-4 mt-7 bg-blue-500 hover:bg-gray-800'
						onClick={subscribe}>
						Subscribe
					</button>
				</>
			)}
		</div>
	);
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	console.log(session?.user);
	if (await checkSubscrion(session?.user)) {
		return {
			props: {
				session,
				SubscrionStatus: true,
			},
		};
	}
	return {
		props: {
			session,
		},
	};
}

const checkSubscrion = async (user: any) => {
	db.connect();
	const found = await Subscriber.findOne({ id: user?.id });
	if (found?.subscription?.isValid) {
		return true;
	} else return false;
};
