/**
 * Created by jsherman on 3/30/17.
 */

var app = app || {};

// wrap within jQuery $
$(function () {
    app.LibraryView = Backbone.View.extend({
        // el: '#search-view',
        el: '#app-view',

        events: {
            'click button#submitBtn': 'searchFood'
        },

        initialize: function () {
            this.collection = new app.LibCollection();
            this.$searchResults = $('#searchResults');

            this.listenTo(this.collection, 'reset', this.render);  // reset on fetch return will trigger render
        },

        // render library by rendering each book in its collection
        render: function () {
            // clear prior results
            this.$searchResults.html('');
            this.collection.each(function (item) {
                // console.log(item);
                this.renderFood(item);
            }, this);
        },

        // render food item
        renderFood: function (item) {
            var foodView = new app.FoodView({
                model: item
            });
            this.$searchResults.append(foodView.render().el);
        },

        searchFood: function (e) {
            e.preventDefault();

            // sets search term in collect for fetch
            this.collection.searchTerm = $('#search-terms').val();

            var parameters = {
                'results': '0:12', // 10 items
                'fields':  'item_id,' +
                    'brand_name,' +
                    // 'upc,' +    upc is a one-way search does not get returned
                    'item_name,' +
                    'nf_calories,' +
                    'nf_total_fat,' +
                    'nf_total_carbohydrate,' +
                    'nf_protein,' +
                    'nf_serving_size_qty,' +
                    'nf_serving_size_unit',
                    'appId': '21a44b1b',
                    'appKey': 'c306b7fb48fd92654d48050c1ad5f58a'
            };

                // Make GET request to Nutritionix
            // Instead of using the success parameter to call a method,
            // reset triggers the render method
            this.collection.fetch({
                reset: true,
                // see this post for passing param  http://stackoverflow.com/questions/6659283/backbone-js-fetch-with-parameters#6659501
                data: $.param(parameters),
                error: this.searchError
            });

        },

        searchSuccess: function () {
            console.log('request success');
        },

        searchError: function () {
            console.log('request error')
        }

    });

});
