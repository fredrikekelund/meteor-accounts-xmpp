if (Meteor.isServer) {
	if (ServiceConfiguration.configurations.find({service: "xmpp"}).count() === 0) {
		ServiceConfiguration.configurations.insert({
			service: "xmpp",
			host: "192.168.2.222",
			domain: "users"
		});
	}
}

if (Meteor.isClient) {
	Tinytest.addAsync("Log in with XMPP", function (test, done) {
		var username = window.prompt("Username"),
			password = window.prompt("Password");

		Meteor.loginWithXmpp(username, password, function(error, result) {
			if (error) {
				test.fail("Login error");
				console.log(error);
			} else {
				test.ok("Login successful");
				console.log(Meteor.user());
			}

			done();
		});
	});
}
