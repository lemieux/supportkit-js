var Marionette = require('backbone.marionette');

var template = require('../../templates/chat.tpl');

module.exports = Marionette.LayoutView.extend({
    id: 'sk-container',

    template: template,

    className: 'sk-noanimation sk-close',

    triggers: {
        'focus @ui.wrapper': 'focus',
        'click @ui.bubble': 'toggle'
    },

    modelEvents: {
        'change': 'open'
    },

    ui: {
        bubble: '#sk-bubble-overlay',
        wrapper: '#sk-wrapper'
    },

    regions: {
        header: '[data-region-header]',
        notifications: '[data-region-notifications]',
        settings: '[data-region-settings]',
        main: '[data-region-main]',
        footer: '[data-region-footer]'
    },

    initialize: function() {
        this.toggle = this.toggle.bind(this);
    },

    open: function() {
        this.enableAnimation();
        this.$el.removeClass('sk-close').addClass('sk-appear');
    },

    close: function() {
        this.enableAnimation();
        this.$el.removeClass('sk-appear').addClass('sk-close');
    },

    toggle: function() {
        this.enableAnimation();
        this.$el.toggleClass('sk-appear sk-close');
    },

    enableAnimation: function() {
        this.$el.removeClass('sk-noanimation');
    }
});
