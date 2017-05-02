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
            'click .add-food': 'addFood'
        },

        addFood: function (e) {
            e.preventDefault();
            // console.log('addFood event' + '\n');
            // console.log(foodData);
            // console.log(this.el);

            // save food to saved food collection and leave rendering to
            // be handled by savedLibraryView
            app.savedCollection.add(this.model.attributes.fields, {merge: true});
            console.log(app.savedCollection);

        },

        render: function () {
            // use $el to get access to jQuery html() function
            this.$el.html(this.template(this.model.attributes.fields));

            return this;
        }
    });

});