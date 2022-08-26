import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import db from '../../../utils/db';
import Subscriber from '../../../utils/models/subscriber';

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		// ...add more providers here
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			// console.log({ user, account, profile });
			const dbConnection = await db.connect();
			const Found = await Subscriber.isFound(user.id);
			// if user already exists then just login
			console.log(Found);
			if (Found) {
				console.log(`singing user in...`);
				return true;
			} else {
				console.log(`creating user....`);
				const isAuthorised = await registerUserToDB(user);
				return isAuthorised ? true : false;
			}
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			if (user) {
				token.id = user.id;
			}
			// console.log({ token, user, account, profile });
			return token;
		},
		async session({ session, user, token }) {
			// console.log({ session, user, token });
			if (session) {
				session.user.id = token.id;
			}
			return session;
		},
	},
});

const registerUserToDB = async (user) => {
	let isAuthorised = false;
	const newUser = {
		name: user.name,
		email: user.email,
		id: user.id,
		subscription: {
			isValid: false,
		},
	};
	try {
		const result = await Subscriber.insertMany([newUser]);
		console.log(result);
		isAuthorised = true;
	} catch (e) {
		console.log(e);
	}
	return isAuthorised;
};
