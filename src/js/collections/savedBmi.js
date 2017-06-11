/**
 * Created by jsherman on 6/11/17.
 */
var app = app || {};

// wrap within jQuery $
$(function () {

    app.SavedBmi = Backbone.Collection.extend({
        model: app.SavedBMI,

        /** Save food item to localStorage. */
        localStorage: new Backbone.LocalStorage('user-bmi')

    });

});