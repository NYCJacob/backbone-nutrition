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
            'change select.meal-type': 'updateMeal',
            'change input#servings' : 'updateServings'
        },

        initialize: function () {
          this.mealType = this.$('.meal-type');
          this.servings = this.$('#servings');
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
            // console.log('updateMeal hit');
            var updatedMeal = this.$('.meal-type').val();
            this.model.save( {meal_type: updatedMeal} );   // save persists to database unlike set
        },

        // update servings
        updateServings: function () {
          var updatedServings = '"'  + this.$('#servings').val() + '"';
          this.model.save( {servings: updatedServings} )
        },

        deleteFood: function() {
            //Delete model
            this.model.destroy();
            //Delete view
            this.remove();
        }
    });
});

