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
    new app.StartView();
    new app.LibraryView();
    app.savedLibraryView = new app.SavedLibraryView({collection: app.savedCollection});
    app.analyzeView = new app.AnalyzeView();

    // initialize bootstrap tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // debug code
    // app.savedCollection.on('all',function(eventName) {
    //     console.log(eventName);
    // });

});