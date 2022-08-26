import mongoose, { Error } from 'mongoose';

const connect = async () => {
	let validConnection = false;
	if (mongoose.connections[0].readyState === 1) {
		console.log(`already connected to DB.`);
		validConnection = true;
	} else {
		console.log(`attempting to connect to DB.`);
		const db = await mongoose
			.connect(process.env.DB_URL as string)
			.then(() => {
				if (mongoose.connections[0].readyState === 1) {
					console.log(`connected to DB.`);
					validConnection = true;
				}
			})
			.catch((err: Error) => {
				console.error(err.message);
				validConnection = false;
			});
	}
	return validConnection;
};

const disconnect = async () => {
	console.log(`Disconnecting from DB...`);
	await mongoose.disconnect();
	console.log(`Disconnected from DB.`);
};

const db = { connect, disconnect };
export default db;
