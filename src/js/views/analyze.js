/**
 * Created by jsherman on 6/9/17.
 */

var app = app || {};

// wrap within jQuery $
$(function () {
    app.AnalyzeView = Backbone.View.extend({
        el: '#analyzeCard',

        events: {
            'click #headingFour': 'startAnalysis'
        },

        initialize: function () {
            // cache dom elements
;
        },

        render: function ( data ) {

            return this;
        },

        startAnalysis: function () {
            console.log( "start analysis");
            console.log( app.bmiData );
            console.log( app.nutritionData );
        }

    });

});
