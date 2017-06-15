/**
 * Created by jsherman on 4/12/17.
 */
var app = app || {};

// wrap within jQuery $
$(function () {

    app.SavedCollection = Backbone.Collection.extend({
        model: app.SavedFood,

        /** Save food item to localStorage. */
        localStorage: new Backbone.LocalStorage('user-health')

    });

});