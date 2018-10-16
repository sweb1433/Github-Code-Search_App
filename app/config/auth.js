module.exports = {
	'facebookAuth': {
		'clientID': process.env.F_CLINT_ID,
		'clientSecret': process.env.F_CLIENT_SECRET,
		'callbackURL': process.env.F_CALLBACK_URL,
	},
	'googleAuth': {
		'clientID': process.env.G_CLINT_ID,
		'clientSecret': process.env.G_CLIENT_SECRET,
		'callbackURL': process.env.G_CALLBACK_URL,
	}
}
