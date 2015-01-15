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