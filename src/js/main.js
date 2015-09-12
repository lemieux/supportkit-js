require('../stylesheets/main.less');
require('whatwg-fetch');
var SupportKit = require('./supportkit.jsx');

module.exports = global.SupportKit = new SupportKit();