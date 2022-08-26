import { Schema, model, models } from 'mongoose';

const SubscriberSchema = new Schema({
	name: String,
	email: String,
	id: Number,
	subscription: {
		isValid: Boolean,
	},
});

SubscriberSchema.static(`isFound`, async (id) => {
	const found = await Subscriber.findOne({ id }, async (err: any, doc: any) => {
		if (err) {
			console.log(`error finding function`);
			return false;
		}
	}).clone();
	console.log(`var found: `, found);

	if (found != null) return true;
	else return false;
});

const Subscriber = models.Subscriber || model(`Subscriber`, SubscriberSchema);
export default Subscriber;
