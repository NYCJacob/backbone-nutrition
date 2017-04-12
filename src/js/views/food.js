/**
 * Created by jsherman on 4/2/17.
 */

/**
 * Created by jsherman on 3/26/17.
 */
// site/js/views/book.js

var app = app || {};

// wrap within jQuery $
$(function () {
    app.FoodView = Backbone.View.extend({
        // el: '#searchResults',
        tagName: 'div',
        className: 'foodContainer',
        template: _.template($('#foodTemplate').html()),

        events: {
            'click .save': 'saveFood'
        },

        deleteFood: function () {
            //Delete model
            this.model.destroy();

            //Delete view
            this.remove();
        },

        render: function () {
            // use $el to get access to jQuery html() function
            this.$el.html(this.template(this.model.attributes.fields));
            // this.template(this.model.attributes.fields);

            return this;
        }
    });

});