/**
 * Created by jsherman on 5/1/17.
 */

var app = app || {};

// wrap within jQuery $
$(function () {
    app.SavedLibraryView = Backbone.View.extend({
        el: '#saved-items',

        events: {
        },

        initialize: function () {
            // this.collection = new app.savedCollection();
            // this.collection = app.savedCollection;   // savedCollection initialized in app.js
            this.listenTo(app.savedCollection, 'add update change', this.render);

        },

        // render library by rendering each book in its collection
        render: function () {
            console.log('savedLibraryView render');
            this.collection.each(function (item) {
                this.renderSavedFood(item);
            }, this);
        },

        // render food item
        renderSavedFood: function (item) {
            var savedFoodView = new SavedFoodView({
                model: item
            });
            this.$el.append(savedFoodView.render().el);
        }

    });

});