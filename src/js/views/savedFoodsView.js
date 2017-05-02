/**
 * Created by jsherman on 4/13/17.
 */
var app = app || {};

// wrap within jQuery $
$(function () {
    app.SavedFoodsView = Backbone.View.extend({
        // el: '#saved-items',
        tagName: 'div',
        className: 'saved-foods',

        template: _.template( $( '#savedFoodTemplate' ).html() ),

        events: {
            'click .delete-food': 'deleteFood'
        },

        // render library by rendering each book in its collection
        render: function () {
            console.log('savedFoodsView render');
            // this.$el.append( this.template( this.model.attributes.fields ) );
            this.$el.html(this.template(this.model.attributes.fields));

            return this;
        },

        deleteFood: function() {
            console.log('deleteFood hit');
            //Delete model
            this.model.destroy();
            console.log(this);
            //Delete view
            this.remove();
        }
    });
});

