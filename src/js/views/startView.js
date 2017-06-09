/**
 * Created by jsherman on 6/6/17.
 */

var app = app || {};

// wrap within jQuery $
$(function () {
    // globals to use data across views
    app.bmiData = {};
    app.nutritionData = {};

    app.StartView = Backbone.View.extend({
        el: '#app-view',

        events: {
            'click button#bmi-start': 'startBMI',
            'click button#food-start': 'startFoodSearch',
            'click div#main-menu-toggle': 'showMainMenu'
         },

        initialize: function () {
            // cache dom elements
            this.$appHello = this.$('#app-hello');
            this.$menuIcon = this.$('#main-menu-toggle');
            this.$appUX = this.$('#app-ux-container');
            this.$bmiControl = this.$('#bmi-controls');
            this.$searchView = this.$('#search-view');
        },

        // render bmi
        render: function ( data ) {

            return this;
        },

        startBMI: function () {
            this.$appUX.removeClass("collapse");
            this.$bmiControl.removeClass("collapse");
            app.bmiView = new app.BmiView();
        },

        startFoodSearch: function () {
            this.$appHello.addClass("collapse");
            this.$menuIcon.removeClass("collapse");
            this.$appUX.removeClass("collapse");
            this.$searchView.removeClass( "collapse" );
        },

        showMainMenu: function () {
            this.$menuIcon.addClass("collapse");
            this.$appHello.removeClass("collapse");
            this.$appUX.addClass("collapse");
            this.$bmiControl.addClass("collapse");
        }
    });

});
