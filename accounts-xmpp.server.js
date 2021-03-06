var client;

XmppClient = function() {
	return client;
};

Accounts.registerLoginHandler("xmpp", function (options) {
	if (!options.xmpp) {
		return undefined;
	}

	check([options.user, options.password], [String]);

	var config = ServiceConfiguration.configurations.findOne({service: "xmpp"}),
		username = (config.domain) ? options.user + "@" + config.domain : options.user,
		user, userId, result, receivedResponse;

	client = new Xmpp.Client({
		host: config.host,
		jid: username,
		password: options.password
	});

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
