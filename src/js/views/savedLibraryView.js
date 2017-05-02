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
            //TODO: need to set collection to var to allow foods view to set food model to this collection
            this.collection = new app.savedCollection();
            this.listenTo(this.collection, 'reset', this.render);  // reset will trigger render
        },

        // render library by rendering each book in its collection
        render: function () {
            this.collection.each(function (item) {
                console.log(item);
                this.renderSavedFood(item);
            }, this);
        },

        // render food item
        renderSavedFood: function (item) {
            var savedFoodView = new savedFoodView({
                model: item
            });
            this.$el.append(savedFoodView.render().el);
        }

    });

});