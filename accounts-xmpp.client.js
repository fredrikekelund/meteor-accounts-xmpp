Meteor.loginWithXmpp = function (user, password, callback) {
	Accounts.callLoginMethod({
		methodArguments: [{
			user: user,
			password: password,
			xmpp: true
		}],
		userCallback: callback
	});
};
