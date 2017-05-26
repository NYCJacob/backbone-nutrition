/**
 * Created by jsherman on 3/30/17.
 */
// js/views/app.js

var app = app || {};

// wrap within jQuery $
$(function () {
    // initialize collections
    app.savedCollection = new app.SavedCollection();  // collection to hold user saved items
    // initial search collection instantiated on fetch in view

    // initialize views
    new app.LibraryView();
    app.savedLibraryView = new app.SavedLibraryView({collection: app.savedCollection});
    app.bmiView = new app.BmiView();


    // debug code
    // app.savedCollection.on('all',function(eventName) {
    //     console.log(eventName);
    // });

});