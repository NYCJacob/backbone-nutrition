/**
 * Created by jsherman on 4/13/17.
 */
var app = app || {};

// wrap within jQuery $
$(function () {
    app.SavedFoodsView = Backbone.View.extend({
        el: '#saved-items',
        // tagName: 'div',
        // className: 'saved-foods',

        template: _.template( $( '#savedFoodTemplate' ).html() ),

        events: {
            'click .delete-food': 'deleteFood'
        },

        initialize: function () {
            this.collection = new app.savedCollection();
            this.listenTo(this.collection, 'reset', this.render);  // reset will trigger render
        },

        // render library by rendering each book in its collection
        render: function () {
            console.log('savedFoodsView render');

            // $( '#saved-items' ).append( this.template( this.model.attributes.fields ) );
            this.$el.append( this.template( this.model.attributes.fields ) );
            return this;
        },

        deleteFood: function() {
            console.log('deleteFood hit');
            //Delete model
            this.model.destroy();

            //Delete view
            this.remove();
        }
    });
});

