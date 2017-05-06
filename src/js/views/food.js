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
            // var savedFood = new app.SavedFood();
            // var foodFields = this.model.attributes.fields;
            // var savedFoodModel = this.model.clone();
            //
            // TODO: there should be a better way to do this,  I tried .clone but didn't work
            console.log(this.model);

            app.savedCollection.add( this.model, {merge: true});
            this.model.save();
            console.log(app.savedCollection);

        },

        render: function () {
            // use $el to get access to jQuery html() function
            this.$el.html(this.template(this.model.attributes));

            return this;
        }
    });

});