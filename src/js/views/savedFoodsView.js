/**
 * Created by jsherman on 4/13/17.
 */
var app = app || {};

// wrap within jQuery $
$(function () {
    app.SavedFoodView = Backbone.View.extend({
        // el: '#saved-items',
        tagName: 'div',
        className: 'saved-foods',

        template: _.template( $( '#savedFoodTemplate' ).html() ),

        events: {
            'click .delete-food': 'deleteFood',
            'change select.meal-type': 'updateMeal'
        },

        initialize: function () {
          this.mealType = this.$('.meal-type');
        },

        // render library by rendering each book in its collection
        render: function () {
            console.log('savedFoodsView render');
            // this.$el.append( this.template( this.model.attributes.fields ) );
            this.$el.html(this.template(this.model.attributes));

            return this;
        },

        // update meal value on dropdown select
        updateMeal: function () {
            console.log('updateMeal hit');
            // todo: storing element reference in init function not working- b/c not in dom at init?
            // console.log( this.mealType.val() );
            console.log( this.$('.meal-type').val() ) ;
            var updatedMeal = this.$('.meal-type').val();
            this.model.set( {meal_type: updatedMeal} );
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

