Accounts.registerLoginHandler("xmpp", function (options) {
	check([options.user, options.password], [String]);

	var username = (Accounts.xmpp.domain) ? options.user + "@" + Accounts.xmpp.domain : options.user,
		client = new Xmpp.Client({
			host: Accounts.xmpp.host,
			jid: username,
			password: options.password
		}),
		user, userId, result, receivedResponse;

	client.on("online", Meteor.bindEnvironment(function(data) {
		receivedResponse = true;

		username = (data.jid.domain) ? data.jid.user + "@" + data.jid.domain : data.jid.user;
		user = Meteor.users.findOne({username: username});

		result = {
			userId: (user) ? user._id : Meteor.users.insert({username: username})
		};
	}));

	client.on("error", Meteor.bindEnvironment(function(error) {
		receivedResponse = true;
		result = {
			error: new Meteor.Error(403, "Incorrect login credentials")
		};
	}));

	while (!receivedResponse) {
		Meteor.sleep(50);
	}

	return result;
});
