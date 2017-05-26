/**
 * Created by jsherman on 4/12/17.
 */

var app = app || {};

// this is identical to food model

app.SavedFood = Backbone.Model.extend({

    defaults: {
            //item_id is from nutrinix api result
            item_id: '',
            brand_name: '',
            item_name : '',
            nf_calories : '',
            nf_total_fat : '',
            nf_total_carbohydrate : '',
            nf_protein : '',
            nf_serving_size_qty : '',
            nf_serving_size_unit : '',
        // meal_type is not from nutrinix but will come from user input
            meal_type: 'unknown'
    }

});