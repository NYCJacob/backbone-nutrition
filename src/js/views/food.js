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
            'click .add-food': 'addFood',
            'click button#saveFoodBtn' : 'saveFood'
        },

        addFood: function (e) {
            e.preventDefault();
            console.log('addFood event' + '\n');
            var foodData = this.model;
            console.log(foodData);
            console.log(this.el);
            var savedFoodView = new app.SavedFoodsView({
                model: foodData
            });
            // this.$('#saved-items').append(savedFoodView.render());
            // savedFoodView.setElement($('#saved-items'));
            savedFoodView.render();
        },

        render: function () {
            // use $el to get access to jQuery html() function
            this.$el.html(this.template(this.model.attributes.fields));

            return this;
        }
    });

});