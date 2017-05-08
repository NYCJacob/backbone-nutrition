/**
 * Created by jsherman on 3/30/17.
 */
var app = app || {};

// wrap within jQuery $
$(function () {

    app.LibCollection = Backbone.Collection.extend({
        model: app.Food,

        searchTerm: '',

        // Nutritionix API request
        url: function() {
            return 'https://api.nutritionix.com/v1_1/search/' + this.searchTerm;
        },

        // custom parse needed otherwise fetch return complete raw response by default
        parse: function(response) {
            return response.hits; // hits is object needed in api response
        }


});

});