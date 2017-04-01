/**
 * Created by jsherman on 3/30/17.
 */

var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: '#search-view',

    template: _.template( $( '#searchResultsTemplate' ).html() ),

    events:{
       'click button#submitBtn': 'searchFood'
    },

    initialize:function () {
        this.collection = new app.LibCollection();
        this.$searchResults = $('#searchResults');
    },

    render: function() {
        // Clear out old results
        this.$searchResults.html('');

        this.$searchResults.html( this.template( this.collection.toJSON() ) );

        return this;

    },

    searchFood: function (e) {
        e.preventDefault();

        // sets search term in collect for fetch
        this.collection.searchTerm = $('#search-terms').val();

        var parameters = {
            'results': '0:10', // 10 items
            'fields': 'item_name,' +
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
        this.collection.fetch({
            // see this post for passing param  http://stackoverflow.com/questions/6659283/backbone-js-fetch-with-parameters#6659501
            data: $.param(parameters),
            success: this.searchSuccess,
            error: this.searchError
        });

        // clear form data
        // TODO clear form when needed
    },

    searchSuccess: function () {
        console.log('request success');
    },

    searchError: function () {
        console.log('request error')
    }

});