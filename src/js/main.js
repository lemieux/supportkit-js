'use strict';
require('./bootstrap');

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var uuid = require('uuid');
var urljoin = require('urljoin');
var bindAll = require('lodash.bindall');

var AppUser = require('./models/appUser');
var ChatController = require('./controllers/chatController');
var endpoint = require('./endpoint');
var api = require('./utils/api');
var storage = require('./utils/localStorage');

var SK_STORAGE = 'sk_deviceid';

// appends the compile stylesheet to the HEAD
require('../stylesheets/main.less');

/**
 * Contains all Smooch API classes and functions.
 * @name Smooch
 * @namespace
 *
 * Contains all Smooch API classes and functions.
 */
var Smooch = function() {
    bindAll(this);
    this._widgetRendered = false;

    this.user = new AppUser();
};

_.extend(Smooch.prototype, Backbone.Events, {
    VERSION: '2.0.0',

    defaultText: {
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
    },

    _checkReady: function(message) {
        if (!this.ready) {
            throw new Error(message || 'Can\'t use this function until the SDK is ready.');
        }
    },

    init: function(options) {
        if (this.ready) {
            return Promise.resolve();
        }

        if (/lebo|awle|pide|obo|rawli/i.test(navigator.userAgent)) {
            var link = $('<a>')
                .attr('href', 'https://smooch.io?utm_source=widget')
                .text('In app messaging by smooch');

            $(function() {
                $('body').append(link);
            });

            this.ready = true;
            return Promise.resolve();
        }

        // TODO: alternatively load fallback CSS that doesn't use
        // unsupported things like transforms
        if (!$.support.cssProperty('transform')) {
            return Promise.reject(new Error('Smooch is not supported on this browser. ' +
                    'Missing capability: css-transform'));
        }


        this.ready = false;
        options = options || {};

        // if the email was passed at init, it can't be changed through the web widget UI
        var readOnlyEmail = !_.isEmpty(options.email);
        var emailCaptureEnabled = options.emailCaptureEnabled && !readOnlyEmail;
        var uiText = _.extend({}, this.defaultText, options.customText);

        this.options = _.defaults(options, {
            embeddedMode: false,
            renderOnInit: true,
            emailCaptureEnabled: emailCaptureEnabled,
            readOnlyEmail: readOnlyEmail,
            uiText: uiText
        });

        if (typeof options === 'string') {
            options = {
                appToken: options
            };
        }

        if (typeof options === 'object') {
            endpoint.appToken = options.appToken;
            if (options.serviceUrl) {
                endpoint.rootUrl = options.serviceUrl;
            }
        } else {
            return Promise.reject(new Error('init method accepts an object or string'));
        }

        if (!endpoint.appToken) {
            return Promise.reject(new Error('init method requires an appToken'));
        }

        endpoint.sdkVersion = this.VERSION;

        return this.login(options.userId, options.jwt);
    },

    login: function(userId, jwt) {
        // clear unread for anonymous
        if (!this.user.isNew() && userId && !this.user.get('userId')) {
            // the previous user had no userId and it's switching to one with an id
            this._chatController.clearUnread();
        }

        if (this.options.embeddedMode && this.options.renderOnInit && !this.options.container) {
            throw new Error('A container should be provided if the widget is in embedded mode');
        }

        this.isEmbedded = this.options.embeddedMode;
        this.container = $(this.options.container);
        this.renderOnInit = this.options.renderOnInit;

        this._cleanState();

        var data = {
            device: {
                id: this.getDeviceId(),
                platform: 'web',
                info: {
                    sdkVersion: this.VERSION,
                    URL: document.location.host,
                    userAgent: navigator.userAgent,
                    referrer: document.referrer,
                    browserLanguage: navigator.language,
                    currentUrl: document.location.href,
                    currentTitle: document.title
                }
            }
        };

        if (userId) {
            data.userId = userId;
            endpoint.userId = userId;
        }

        if (jwt) {
            endpoint.jwt = jwt;
        }

        return api.call({
            url: 'v1/init',
            method: 'POST',
            data: data
        })
            .then(_(function(res) {
                this.user.set(_.extend({
                    conversation: {}
                }, res.appUser));
                
                return this.user.save(_.pick(this.options, AppUser.EDITABLE_PROPERTIES), {
                    wait: true
                });
            }).bind(this))
            .then(_(function() {
                if (this.renderOnInit) {
                    var container = this.isEmbedded ? this.container : $('body');
                    return this._renderWidget(container);
                } else {
                    this.trigger('ready');
                }
            }).bind(this))
            .catch(function(err) {
                var message = err && (err.message || err.statusText);
                console.error('Smooch init error: ', message);
                // rethrow error to be handled outside
                throw err;
            });
    },

    logout: function() {
        return Promise.resolve(this.ready ? this.login() : undefined);
    },

    getDeviceId: function() {
        var deviceId;

        // get device ID first from local storage, then cookie. Otherwise generate new one
        deviceId = storage.getItem(SK_STORAGE) ||
            uuid.v4().replace(/-/g, '');

        storage.setItem(SK_STORAGE, deviceId);

        return deviceId;
    },

    resetUnread: function() {
        this._checkReady();
        this._chatController.resetUnread();
    },

    sendMessage: function(text) {
        this._checkReady('Can not send messages until init has completed');
        return this._chatController.sendMessage(text);
    },

    open: function() {
        this._checkReady();
        this._chatController.open();
    },

    close: function() {
        this._checkReady();
        this._chatController.close();
    },

    updateUser: function(userInfo) {
        if (typeof userInfo !== 'object') {
            return new Promise(function(resolve, reject) {
                reject(new Error('updateUser accepts an object as parameter'));
            });
        }
        var user = this.user;

        return new Promise(function(resolve, reject) {
            user.save(userInfo, {
                wait: true,
                parse: true
            }).then(function() {
                resolve(user);
            }).catch(reject);
        });
    },

    track: function(eventName, userProps) {
        this._checkReady();
        var data = {
            name: eventName
        };

        if (userProps) {
            data.appUser = userProps;
        }

        return api.call({
            url: urljoin(this.user.url(), 'events'),
            method: 'POST',
            data: data
        }).then(function(response) {
            if (response.conversationUpdated) {
                this.user.get('conversation').fetch();
            }
            return response;
        }.bind(this)).catch(function(err) {
            console.error('SupportKit track error: ', err.message);
            // rethrow error to be handled outside
            throw err;
        });

    },

    _checkConversationState: function() {
        if (!this._chatController.conversation || this._chatController.conversation.isNew()) {
            this._chatController._initConversation();
        }
    },

    _renderWidget: function(container) {
        this._chatController = new ChatController({
            model: this.user,
            readOnlyEmail: this.options.readOnlyEmail,
            emailCaptureEnabled: this.options.emailCaptureEnabled,
            uiText: this.options.uiText,
            isEmbedded: this.isEmbedded
        });

        return this._chatController.getWidget().then(function(widget) {
            container.append(widget.el);
            this._widgetRendered = true;

            _(function() {
                this._chatController.scrollToBottom();
            }).chain().bind(this).delay();

            this.ready = true;
            this.trigger('ready');
            return;
        }.bind(this));
    },

    _cleanState: function() {
        this.user.clear();

        if (this._widgetRendered) {
            this._chatController.destroy();
        }

        endpoint.reset();
        this.ready = false;
        this._widgetRendered = false;
    },

    destroy: function() {
        this._cleanState();
        delete endpoint.appToken;
    }
});

module.exports = global.Smooch = new Smooch();
