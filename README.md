# accounts-xmpp

> Integrates the Meteor accounts system with XMPP servers

## Usage

A host and domain to log in to can be configured on the server by setting an `xmpp` property on the `Accounts` object like so:

```js
Accounts.xmpp = {
    host: "192.168.2.222",
    domain: "users"
};
```

Like any other Meteor login method, you can authenticate user credentials by running:

```js
Meteor.loginWithXmpp(username, password, function(error, result) {
    if (error) {
        console.log("Login error", error);
    } else {
        console.log("Login successful", Meteor.user());
    }
});
```

## License

MIT © [Fredrik Ekelund](http://fredrik.computer)
