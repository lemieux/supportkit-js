# [Smooch Javascript SDK](smooch.io)
*Smooch adds beautifully simple messaging to your app to keep your users engaged and coming back.*

[![Circle CI](https://circleci.com/gh/smooch/smooch-js.svg?style=svg)](https://circleci.com/gh/smooch/smooch-js) [![npm version](https://badge.fury.io/js/smooch.svg)](http://badge.fury.io/js/smooch) [![Bower version](https://badge.fury.io/bo/smooch.svg)](http://badge.fury.io/bo/smooch)

## Usage

### Script Tag

Add the following code towards the end of the `body` section on your page. Placing it at the end allows the rest of the page to load first.

```html
<script src="https://cdn.smooch.io/smooch.min.js"></script>
```


Initialize the plugin using this code snippet

```html
<script>
    Smooch.init({appToken: 'your_app_token'});
</script>
```

### Browserify

Install from npm

```
npm install smooch
```

Require and init

```javascript
var Smooch = require('smooch');

Smooch.init({appToken: 'your_app_token'});
```

### Bower

Install from bower

```
bower install smooch
```

Include in JS using preferred method and init

```javascript
Smooch.init({appToken: 'your_app_token'});
```

## API

### Individual functions

#### init(options)
Initializes the Smooch widget in the web page using the specified options. It returns a promise that will resolve when the widget is ready.

##### Options

| Option | Optional? | Default value | Description |
| --- | --- | --- | --- |
| appToken | No | - | Your app token |
| givenName | Yes | - | User's given name |
| surname | Yes | - | User's surname |
| email | Yes | - | User's email |
| jwt | Yes | - | Token to authenticate your communication with the server (see http://docs.supportkit.io/javascript/#authenticating-users-optional)
| userId | Yes | - | User's id |
| properties | Yes | - | An object with all properties you want to set on your user |
| emailCaptureEnabled | Yes | `false` | Enables prompt for email after the first user's message. You can retrieve that email in Slack using `/sk !profile`. We are aware of this limitation and are working on improving it. |
| customText | Yes | See the example below | Strings used in the widget UI. You can use these to either customize the text or translate it. |

```javascript
var skPromise = Smooch.init({
    appToken: 'your_app_token',
    givenName: 'Cool',
    surname: 'Person',
    email: 'their_email@whatever.com',
    // For secure mode
    jwt: 'your_jwt',
    userId: 'user_id',
    // Additional properties
    properties: {
        'anything': 'whatever_you_want'    
    },
    emailCaptureEnabled: false,
    customText: {
        headerText: 'How can we help?',
        inputPlaceholder: 'Type a message...',
        sendButtonText: 'Send',
        introText: 'This is the beginning of your conversation.<br/> Ask us anything!',
        settingsText: 'You can leave us your email so that we can get back to you this way.',
        settingsReadOnlyText: 'We\'ll get back to you at this email address if we missed you.',
        settingsInputPlaceholder: 'Your email address',
        settingsSaveButtonText: 'Save',
        settingsHeaderText: 'Email Settings',
        settingsNotificationText: 'In case we\'re slow to respond you can <a href="#" data-ui-settings-link>leave us your email</a>.'
    }
});


skPromise.then(function() {
    // do something
});

// pass it around...

skPromise.then(function() {
    //do something else
});


```


#### open()
Opens the conversation widget

```javascript
Smooch.open();
```

#### close()
Closes the conversation widget

```javascript
Smooch.close();
```

#### login(userId [, jwt])
Logs a user in the widget, retrieving the conversation that user already had on other browsers and/or devices. This will destroy and reinitialize the widget with the user's data. Note that you don't need to call this after `init`, it's already done internally. This returns a promise that resolves when the widget is ready again.
```
Smooch.login('some-id');

// in case you are using the jwt authentication
Smooch.login('some-id', 'some-jwt');

```

#### logout()
Logs out the current user and reinitialize the widget with an anonymous user.This returns a promise that resolves when the widget is ready again.

```
Smooch.logout();
```

#### destroy()
Destroys the widget and makes it disappear. The widget has to be reinitialized with `init`  to be working again because it also clears up the app token from the widget.

```
Smooch.destroy();
```

#### sendMessage(text)
Sends a message on the user's behalf

```javascript
Smooch.sendMessage('hello');
```

#### updateUser(user)
Updates user information

```javascript
Smooch.updateUser({
    givenName: 'Updated',
    surname: 'Name',
    email: 'updated@email.com',
    properties: {
      'justGotUpdated': true
    }
});
```

#### track(eventName)
Tracks an event for the current user. 

```javascript
Smooch.track('item-in-cart');
```

### Events
If you want to make sure your events are triggered, try to bind them before calling `Smooch.init`.

#### ready
```
// This event triggers when init completes successfully... Be sure to bind before calling init!
Smooch.on('ready', function(){
    console.log('the init has completed!');
});

Smooch.init(...);
```

#### destroy
```
// This event triggers when init completes successfully... Be sure to bind before calling init!
Smooch.on('destroy', function(){
    console.log('the widget is destroyed!');
});

Smooch.destroy();
```

### Embedded mode
You might want to embed SupportKit directly into your app instead of having a widget. To do this you need to enable it on init:

```javascript
var skInit = SupportKit.init({
    appToken: 'your_app_token',
    givenName: 'Cool',
    surname: 'Person',
    email: 'their_email@whatever.com',
    // For secure mode
    jwt: 'your_jwt',
    userId: 'user_id',
    // Additional properties
    properties: {
        'anything': 'whatever_you_want'    
    },

    embeddedMode: true,
    container: $('.some-container')
});


skInit.then(function(){
    SupportKit.renderWidget($('#chat-container'));
});
```

If you are building a static page where the container is always there, you can pass the element as the `container` options in init. 

If you are building a single page app, or any app that might cause the container to be render and removed without reloading the page, you might consider passing `renderOnInit: false` in the options to avoid render it immediately. Later, you can call `SupportKit.renderWidget(container)` which will reattach the widget to that container.

You might want to keep the promise returned on `init` around and render in the promise chain, so you know the sdk is properly initialize before rendering it.

### Single page app considerations
You might want to initialize the SDK right after login/page load and keep a reference somewhere so that whenever you want to render it, the load time is minimal. 

Also, don't forget to call `SupportKit.logout()` when logging your user out, especially if you don't have a page reload on login or logout. This will make sure to wipe all data from the conversation of the previous user.

If you are using the CDN version, you might want to use a script loader like `scriptjs` to make sure SupportKit is loaded in the page before using it.

## How to contribute

### Clone the git repo
```git clone https://github.com/smooch/smooch-js```

### Install Node.js and run the following

```npm install```
```npm install -g grunt```

### Essential Grunt Tasks

* ```grunt build``` dumps a plain and a minified file from all files in the folder ```src``` to dist/smooch.min.js
* ```grunt clean``` removes all files in the folder ```dist```
* ```grunt test:unit``` runs karma tests
