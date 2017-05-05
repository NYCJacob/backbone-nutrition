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
            // console.log(foodData);

            // save food to saved food collection and leave rendering to
            // be handled by savedLibraryView
            // app.savedCollection.add(this.model.attributes.fields, {merge: true});
            var savedFood = new app.SavedFood();
            var foodFields = this.model.attributes.fields;
            console.log(foodFields);
            // TODO: there should be a better way to do this,  I tried .clone but didn't work
            // iterate over this.model fields
            for (var key in foodFields){
                savedFood.attributes[ key ] = foodFields[key];
            }
            console.log(savedFood);

            app.savedCollection.add(savedFood, {merge: true});

            console.log(app.savedCollection);

        },

        render: function () {
            // use $el to get access to jQuery html() function
            this.$el.html(this.template(this.model.attributes.fields));

            return this;
        }
    });

});