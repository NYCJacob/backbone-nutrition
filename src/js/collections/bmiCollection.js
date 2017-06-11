/**
 * Created by jsherman on 5/26/17.
 */
var app = app || {};

// wrap within jQuery $
$(function () {

    app.BmiCollection = Backbone.Collection.extend({
        model: app.SavedBMI,

        /** Save food item to localStorage. */
        localStorage: new Backbone.LocalStorage('user-bmi'),

        parse: function ( response ) {
            console.log( response );
            console.log( _.sortBy(response, 'timestamp').reverse() );
            // sortBy returns ascending order but need most recent first- descending order
            return _.sortBy(response, 'timestamp').reverse();
        }

    });
    app.bmiCollection = new app.BmiCollection();  //collection for bmi mainly to use localstorage

});