type userType = {
	name: string;
	email: String;
	id: Number;
	subscription: subscriptionType;
};

type subscriptionType = {
	isValid: Boolean;
};

export default userType;
