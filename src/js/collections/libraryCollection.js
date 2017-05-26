/**
 * Created by jsherman on 3/30/17.
 */
var app = app || {};

// wrap within jQuery $
$(function () {

    app.LibCollection = Backbone.Collection.extend({
        model: app.SavedFood,

        searchTerm: '',

        // Nutritionix API request
        url: function() {
            return 'https://api.nutritionix.com/v1_1/search/' + this.searchTerm;
        },

        // custom parse needed otherwise fetch return complete raw response by default
        parse: function(response) {
            console.log( response.hits );
            // api response has a nested object 'fields' that holds the food nutrition data
            // created array to hold nested objects needed
            var formattedResponse = [];
            //  api has a nested object 'field' that contains the data needed for model
            response.hits.forEach(function(data){
                formattedResponse.push( _.clone( data.fields) );
            });
            return formattedResponse; // hits is object needed in api response
        }


});

});