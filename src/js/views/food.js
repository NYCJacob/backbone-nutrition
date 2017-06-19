/**
 * Created by jsherman on 4/2/17.
 */

/**
 * Created by jsherman on 3/26/17.
 */
// site/js/views/book.js
"use strict";

var app = app || {};

// wrap within jQuery $
$(function () {
    app.FoodView = Backbone.View.extend({
        // el: '#searchResults',
        tagName: 'div',
        className: 'foodContainer',
        template: _.template($('#foodTemplate').html()),

        events: {
            'click .add-food': 'addFood'
        },

        addFood: function (e) {
            e.preventDefault();

            console.log( this.model );

            // need to get to other view for proper collection.sync method to localstorage
            // this created issues sending api result data to different collection that
            // uses localstorage for fetch.
            //  This was solved and then model results parsed to simplify but then
            //  passing this.model like this:
            //  app.savedLibraryView.saveFood( this.model );
            // seemed to trigger wrong fetch method as api request was resent returning a 404
            var clickedFood = _.clone( this.model.attributes );
            app.savedLibraryView.saveFood( clickedFood );

        },

        render: function () {
            // use $el to get access to jQuery html() function
            // console.log( this.model );
            this.$el.html(this.template(this.model.attributes));

            return this;
        }
    });

});


