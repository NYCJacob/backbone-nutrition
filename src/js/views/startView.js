/**
 * Created by jsherman on 6/6/17.
 */


/**
 * Created by jsherman on 5/7/17.
 */

var app = app || {};

// wrap within jQuery $
$(function () {
    app.StartView = Backbone.View.extend({
        el: '#app-view',

        events: {
            'click button#bmi-start': 'startBMI',
            'click div#main-menu-toggle': 'showMainMenu'
         },

        initialize: function () {
            this.$appHello = this.$('#app-hello');
            this.$menuIcon = this.$('#main-menu-toggle')
        },

        // render bmi
        render: function ( data ) {

            return this;
        },

        startBMI: function () {
            this.$appHello.addClass("collapse");
            this.$menuIcon.removeClass("collapse")
        },

        showMainMenu: function () {
            this.$menuIcon.addClass("collapse");
            this.$appHello.removeClass("collapse")
        }
    });

});

