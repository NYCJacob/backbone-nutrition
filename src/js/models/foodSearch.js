/**
 * Created by jsherman on 3/30/17.
 */
var app = app || {};

// SEARCH MODEL
// -------------
//

app.Food = Backbone.Model.extend({
    // default attributes
    default: {
        item_name: ''
    }

});