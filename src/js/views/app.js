/**
 * Created by jsherman on 3/30/17.
 */
// js/views/app.js

var app = app || {};

// wrap within jQuery $
$(function () {
// this needs to be hidden
    app.NUTRITIONIX_ID = '21a44b1b';
    app.NUTRITIONIX_KEY = 'c306b7fb48fd92654d48050c1ad5f58a';
    app.TEST_TERM = 'taco';  // not needed if in url for testing
    app.TEST_ITEM = '773200712034';  // just testing upc item search
    app.nutritionix_searchUrl = 'https://api.nutritionix.com/v1_1/search/taco';
    app.nutritionix_upcUrl = 'https://api.nutritionix.com/v1_1/item';

// top level app view
    app.AppView = Backbone.View.extend({
        // bind to existing element rather than create tag
        el: '#searchView',

        // cache template to displaying results
        searchResultsTemplate: _.template( $('#searchResultsTemplate').html() ),

        // events
        events: {
            'submit': 'sendRequest'
        },

        // initializing
        initialize: function () {
            this.$input = this.$('#search-terms');
        },

        // render should go here

        // method calls
        sendRequest: function () {
            console.log('sendRequest fired');
                $.ajax({
                    url: app.nutritionix_searchUrl,
                    type: "GET",
                    data: {
                        appId: NUTRITIONIX_ID,
                        appKey: NUTRITIONIX_KEY
                    }
                }).done(function (data){
                    console.log(data);
                }).fail(function () {
                    console.log("ajax failed");
                })
        }

});

});