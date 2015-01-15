Package.describe({
	name: "fredrik:accounts-xmpp",
	summary: "XMPP integration for Meteor accounts",
	version: "0.1.0",
	git: "https://github.com/fredrikekelund/meteor-accounts-xmpp.git"
});

Package.onUse(function (api) {
	api.use("froatsnook:sleep", "server");
	api.use("fredrik:node-xmpp", "server");
	api.use("accounts-base", ["client", "server"]);
	api.imply("accounts-base", ["client", "server"]); // Export Accounts (etc) to packages using this one.
	api.use("check");

	api.addFiles("accounts-xmpp.config.js", ["client", "server"]);
	api.addFiles("accounts-xmpp.client.js", "client");
	api.addFiles("accounts-xmpp.server.js", "server");
});

Package.onTest(function (api) {
	api.use("tinytest");
	api.use("fredrik:accounts-xmpp");
	api.addFiles("accounts-xmpp.test.js", "client");
});
