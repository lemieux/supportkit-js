require('../stylesheets/main.less');
require('whatwg-fetch');
var SupportKit = require('./SupportKit.jsx');

if(!window.React) {
    window.React = require('react');
}

module.exports = global.SupportKit = new SupportKit();