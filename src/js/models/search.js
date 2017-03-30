/**
 * Created by jsherman on 3/30/17.
 */
var app = app || {};

// SEARCH MODEL
// -------------
//

app.Search = Backbone.model.extend({
    // default attributes
    default: {
        item_name: ''
    },

    // save the search results
    saveSearch: function () {
        this.save({error: function () {
            console.log('Error on saveSearch');
        }})
    }

})