/**
 * Created by jsherman on 3/30/17.
 */
// js/views/app.js

var app = app || {};

// wrap within jQuery $
$(function () {
    // initialize collections
    new app.LibraryView();  // collection to hold fetch results
    // app.savedCollection = new app.SavedCollection();  // collection to hold user saved items
    app.savedCollection = new app.SavedCollection();  // collection to hold user saved items

});