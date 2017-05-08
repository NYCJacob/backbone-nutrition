/**
 * Created by jsherman on 4/2/17.
 */

/**
 * Created by jsherman on 3/26/17.
 */
// site/js/views/book.js

var app = app || {};

// wrap within jQuery $
$(function () {
    app.FoodView = Backbone.View.extend({
        // el: '#searchResults',
        tagName: 'div',
        className: 'foodContainer',
        template: _.template($('#foodTemplate').html()),

        events: {
            'click .add-food': 'addFood'
        },

        addFood: function (e) {
            e.preventDefault();
            //
            // TODO: there should be a better way to do this,  I tried .clone but didn't work
           console.log(this.model);

            var clickedFood = {
                item_id : this.model.attributes.fields.item_id,
                brand_name : this.model.attributes.fields.brand_name,
                upc : this.model.attributes.fields.upc,
                item_name : this.model.attributes.fields.item_name,
                nf_calories : this.model.attributes.fields.nf_calories,
                nf_total_fat : this.model.attributes.fields.nf_total_fat,
                nf_total_carbohydrate : this.model.attributes.fields.nf_total_carbohydrate,
                nf_protein : this.model.attributes.fields.nf_protein,
                nf_serving_size_qty : this.model.attributes.fields.nf_serving_size_qty,
                nf_serving_size_unit : this.model.attributes.fields.nf_serving_size_unit,
                meal_type: 'unknown'
            };
            // need to get to other view for proper collection.sync method to localstorage
            app.savedLibraryView.saveFood(clickedFood);

            // console.log(app.savedCollection);
        },

        render: function () {
            // use $el to get access to jQuery html() function
            // console.log( this.model );
            this.$el.html(this.template(this.model.attributes));

            return this;
        }
    });

});


