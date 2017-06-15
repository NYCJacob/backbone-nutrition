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

        template: _.template( $('#analyzeTemplate').html() ),

        initialize: function () {
            // cache dom elements
            this.$analyzeMsg = this.$( '#analyzeMsg' );
        },

        render: function ( data ) {
            this.$analyzeMsg.html(this.template( data ));
            return this;
        },

        startAnalysis: function () {
            // set url router
            app.router.navigate("analyze");

            var self = this;
            var weightAnalysis;
            var dietAnalysis;
            // difference between ideal weight and actual weight using high end of ideal weight range
            var weightDelta;
            console.log( app.bmiData );
            console.log( app.nutritionData );
            // test for needed data if missing send msg to user
            if  ( _.isEmpty( app.bmiData ) && _.isEmpty( app.nutritionData ) ) {
                app.messenger.showMessage( 'There is no BMI data nor nutritional data.  Both are needed.' );
            } else if ( _.isEmpty( app.bmiData ) ) {
                app.messenger.showMessage( 'There is no BMI data.' );
            } else if ( _.isEmpty( app.nutritionData ) ) {
                app.messenger.showMessage( 'There is no nutrition data.' );
            }

            // parse ideal weight string for upper range integer
            // https://stackoverflow.com/questions/10003683/javascript-get-number-from-string
            var idealRange = app.bmiData.ideal_weight.match(/\d+/g);
            var idealWeightLower = parseInt( idealRange[0] );
            var idealWeightUpper = parseInt( idealRange[1] );
            var weightInt = parseInt(app.bmiData.weight.lb);

            // compare ideal and actual weight
            // negative overweight means person is overweight
            var overWeight = idealWeightUpper - weightInt;
            // negative underWeight means person is under weight
            var underWeight = weightInt - idealWeightLower;
            // weightMsg holds weight msg text
            var weightMsg;
            if ( overWeight < 0 ) {
                weightMsg = 'You are over your ideal weight by ' + Math.abs( overWeight )  + ' pounds.';
            } else if ( underWeight < 0 ) {
                weightMsg = 'You are under your ideal weight by ' + Math.abs( underWeight )  + ' pounds.';
            } else {
                weightMsg = 'You are within your ideal weight range.';
            }


            // compare eer calories to total calories

            // send msg to render via an object for _template
            var msgData = {};
            msgData.weightMsg = weightMsg;
            msgData.eer = app.bmiData.eer;
            msgData.cals = app.nutritionData.cals;
            self.render( msgData );

        }

    });

});
