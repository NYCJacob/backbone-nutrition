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
            this.modelCount = 0;
            // this.collection = new app.savedCollection();
            // this.collection = app.savedCollection;   // savedCollection initialized in app.js
            //TODO: not sure why this.collection seems to work when collection: not in constructor
            this.listenTo(this.collection, 'add update change', this.render);
            // get localstorage data
            this.collection.fetch();
        },

        // render
        render: function () {
            this.$savedItems.html("");
            // track totals and loop through collection
            var totals = 0;
            this.collection.forEach(function (item) {
                totals +=  parseInt( item.attributes.nf_calories, 10);
                // add quotes to id for use in html id accordian attribute
                item.attributes.id = '"' + item.attributes.id + '"';
                item.attributes.href = '"' + '#collapse' + item.attributes.modelCount + '"';
                item.attributes.divId = '"' + 'collapse' + item.attributes.modelCount + '"';
                item.attributes.headingLabel = '"' + 'heading' + item.attributes.modelCount + '"';
                item.attributes.ariaControl = '"' + 'collapse' + item.attributes.modelCount + '"';

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
            // add attribute for html accordian attributes for proper templating
            this.modelCount++;
            clicked.modelCount = this.modelCount;
            this.collection.create( clicked );
        }

    });

});