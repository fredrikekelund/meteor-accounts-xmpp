Meteor.loginWithXmpp = function (user, password, callback) {
	Accounts.callLoginMethod({
		methodArguments: [{
			user: user,
			password: password
		}],
		userCallback: callback
	});
};
