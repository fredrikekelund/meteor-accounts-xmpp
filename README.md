# [fredrik:accounts-xmpp](https://atmospherejs.com/fredrik/accounts-xmpp)

> Integrates the Meteor accounts system with XMPP servers

## Install

```sh
$ meteor add fredrik:accounts-xmpp
```

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

### Interfacing with the XMPP client

The XMPP client (ie. the connection to the server) can be accessed from a server side method called `XmppClient`.

[fredrik:node-xmpp](https://atmospherejs.com/fredrik/node-xmpp) is a Meteor wrapper for [node-xmpp](https://github.com/node-xmpp/node-xmpp) that you can use for sending messages to the client.

Here's an example of what you can do after having logged in and added the fredrik:node-xmpp package:

```js
var client = XmppClient(),
    sendData = function(client, to, data) {
        var stanza = new Xmpp.Element("message", {
            to: to,
            type: "chat"
        });

        stanza.c("body").t(data);
        client.send(stanza);
    };

sendData(client, "fredrik@users", "hello");
```

## License

MIT © [Fredrik Ekelund](http://fredrik.computer)
