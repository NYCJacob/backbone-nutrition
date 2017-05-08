/**
 * Created by jsherman on 5/1/17.
 */

var app = app || {};

// wrap within jQuery
$(function () {
    app.SavedLibraryView = Backbone.View.extend({
        el: '#saved-items',

        // model: app.SavedFood,

        //collection: app.savedCollection,
        events: {
        },

        initialize: function () {
            this.render();
            // this.collection = new app.savedCollection();
            // this.collection = app.savedCollection;   // savedCollection initialized in app.js
            //TODO: not sure why this.collection seems to work when collection: not in constructor
            this.listenTo(this.collection, 'add update change', this.render);

        },

        // render library by rendering each book in its collection
        render: function () {
            // console.log('savedLibraryView render');
            // console.log( this.el );
            // this.collection = app.savedCollection;
            this.$el.html("");
            this.collection.forEach(function (item) {
            // app.savedCollection.each(function (item) {
                this.renderSaved(item);
            }, this);
        },

        // render food item
        renderSaved: function (item) {
            var savedFoodView = new app.SavedFoodView({
                model: item
            });
            this.$el.append(savedFoodView.render().el);
        }

    });

});