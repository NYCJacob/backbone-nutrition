/**
 * Created by jsherman on 4/12/17.
 */
/**
 * Created by jsherman on 3/30/17.
 */
var app = app || {};

// SEARCH MODEL
// -------------
//

app.savedFood = Backbone.Model.extend({

    defaults: {
        item_name : '',
        nf_calories : '',
        nf_total_fat : '',
        nf_total_carbohydrate : '',
        nf_protein : '',
        nf_serving_size_qty : '',
        nf_serving_size_unit : ''
    }

});