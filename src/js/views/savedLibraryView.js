/**
 * Created by jsherman on 5/1/17.
 */
"use strict";

var app = app || {};

// wrap within jQuery
$(function () {
    app.SavedLibraryView = Backbone.View.extend({
        el: '#saved-container',

        model: app.SavedFood,

        template: _.template( $('#savedFooterTemplate').html() ),

        collection: app.savedCollection,

        events: { },

        initialize: function () {
            this.$savedItems = this.$('#saved-items');
            this.$footer = this.$('#saved-footer');
            this.modelCount = 0;
            //  array to stored saved food nutritionix index to prevent duplicate entries
            this.savedIndex = [];
            this.listenTo(this.collection, 'add update change', this.render);
            // get localstorage data
            this.collection.fetch();
        },

        // render
        render: function () {
            this.$savedItems.html("");
            // track totals and loop through collection
            var totalCals = 0;
            var totalFat = 0;
            var totalCarbs = 0;
            var totalProtein = 0;

            this.collection.forEach(function (item) {
                // https://stackoverflow.com/questions/10003683/javascript-get-number-from-string
                var servingsInt = item.get("servings").match(/\d+/)[0];
                totalCals +=  parseInt( ( item.get("nf_calories") * servingsInt ), 10);
                totalFat +=  parseInt( ( item.get("nf_total_fat") * servingsInt ), 10);
                totalCarbs +=  parseInt( ( item.get("nf_total_carbohydrate") * servingsInt ), 10);
                totalProtein +=  parseInt( ( item.get("nf_protein") * servingsInt ), 10);
                this.renderSaved(item);
            }, this);
            // object to pass totals to template via render
            var totals = { cals: totalCals, carbs: totalCarbs, fat: totalFat, protein: totalProtein};
            // pass totals to global var
            app.nutritionData = totals;
            this.renderFooter(totals);
        },

        // render saved-footer
        renderFooter: function (totals) {
          this.$footer.html(this.template( totals ));
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
            // clicked is a regular javascript object at this point

            // check for dup food based on nutritionix id
            var exists = this.collection.findWhere( {item_id: clicked.item_id} );
            if (typeof exists != 'object') {
                // clear possible prior message
                app.messenger.hideMessage();
                // add attribute for html accordian attributes for proper templating
                this.modelCount++;
                clicked.modelCount = this.modelCount;
                // add quotes to id for use in html id accordian attribute
                clicked.href = '"' + '#collapse' + this.modelCount + '"';
                clicked.divId = '"' + 'collapse' + this.modelCount + '"';
                clicked.headingLabel = '"' + 'heading' + this.modelCount + '"';
                clicked.ariaControl = '"' + 'collapse' + this.modelCount + '"';
                // clicked object key:values map to model
                this.collection.create( clicked );
            }else {
                // console.log( "model exists");
                app.messenger.showMessage( "model exists");
            }


        }

    });

});