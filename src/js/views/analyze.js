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

        },

        render: function ( data ) {

            return this;
        },

        startAnalysis: function () {
            console.log( app.bmiData );
            console.log( app.nutritionData );
            // test for needed data

            if  ( _.isEmpty( app.bmiData ) && _.isEmpty( app.nutritionData ) ) {
                app.messenger.showMessage( 'There is no BMI data nor nutritional data.  Both are needed.' );
            } else if ( _.isEmpty( app.bmiData ) ) {
                app.messenger.showMessage( 'There is no BMI data.' );
            } else if ( _.isEmpty( app.nutritionData ) ) {
                app.messenger.showMessage( 'There is no nutrition data.' );
            }

        }

    });

});
