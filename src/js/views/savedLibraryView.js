/**
 * Created by jsherman on 5/1/17.
 */

var app = app || {};

// wrap within jQuery
$(function () {
    app.SavedLibraryView = Backbone.View.extend({
        // el: '#saved-items',
        el: '#saved-container',

        model: app.SavedFood,

        template: _.template( $('#savedFooterTemplate').html() ),

        collection: app.savedCollection,
        events: {
        },

        initialize: function () {
            this.$savedItems = this.$('#saved-items');
            this.$footer = this.$('#saved-footer');
            console.log( this.$savedItems );
            console.log( this.$footer );
            // this.collection = new app.savedCollection();
            // this.collection = app.savedCollection;   // savedCollection initialized in app.js
            //TODO: not sure why this.collection seems to work when collection: not in constructor
            this.listenTo(this.collection, 'add update change', this.render);
            // get localstorage data
            this.collection.fetch();
            // this.render();
        },

        // render
        render: function () {
            this.$savedItems.html("");
            // track totals and loop through collection
            var totals = 0;
            this.collection.forEach(function (item) {
                totals +=  parseInt( item.attributes.nf_calories, 10) ;
                this.renderSaved(item);
            }, this);
            this.renderFooter(totals);
        },

        // render saved-footer
        renderFooter: function (totals) {
          this.$footer.html(this.template( {total_calories: totals} ));
        },


        // render food item
        renderSaved: function (item) {
            var savedFoodView = new app.SavedFoodView({
                model: item
            });
            // this.$el.append(savedFoodView.render().el);
            this.$savedItems.append(savedFoodView.render().el);
        },

        // save food when add clicked in library view which sends here
        saveFood: function( clicked ){
            // console.log( this.collection );
            this.collection.create( clicked );
        }

    });

});