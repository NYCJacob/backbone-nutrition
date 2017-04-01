/**
 * Created by jsherman on 3/30/17.
 */
var app = app || {};

// SEARCH MODEL
// -------------
//

app.Food = Backbone.Model.extend({

    defaults: {
        id: '',
        sortOrder: 0,
        name: '',
        fat: 0,
        carbs: 0,
        protein: 0,
        calories: 0,
        servingSize: 0,
        servingUnit: ''
    }

});