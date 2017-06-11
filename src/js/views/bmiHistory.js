/**
 * Created by jsherman on 6/11/17.
 */
var app = app || {};

// wrap within jQuery $
$(function () {
    app.BmiHistory = Backbone.View.extend({
        el: '#bmi-history',

        model: app.SavedBMI,

        template: _.template($('#bmiHistoryTemplate').html()),

        collection: app.bmiCollection,

        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render);  // reset on fetch return will trigger render
            this.$bmiHistoryTable = this.$('#bmi-table');
            this.$bmiTbody = this.$('#bmi-tbody');
            this.collection.fetch();
        },

        render: function () {
            this.$bmiHistoryTable.removeClass('display-none');
            // loop through collection retrieved from localstorage via fetch and render each
            this.collection.forEach(function ( item ) {
                this.renderSavedBmi(item);
            });

            return this;
        },

        renderSavedBmi: function ( item ) {
            this.$bmiTbody.append( this.template( item ))
        }

    })

});