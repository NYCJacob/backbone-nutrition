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
            console.log('addFood event' + '\n');
            var foodData = this.model;
            console.log(foodData);
            var savedFoodView = new app.SavedFoodsView({
                model: foodData
            });
            // this.$('#saved-items').append(savedFoodView.render());
            // savedFoodView.setElement($('#saved-items'));
            savedFoodView.render();
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