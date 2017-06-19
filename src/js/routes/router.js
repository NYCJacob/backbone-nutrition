/**
 * Created by jsherman on 6/14/17.
 */
"use strict";

var Router = Backbone.Router.extend({
    routes: {
        "start" : "startView",
        "bmi"  :  "startBmi",
        "search" : "startSearch"
    },

    default: function (action) {
    },

    startView: function () {
        app.startView.showMainMenu();
    },

    startBmi: function () {
        app.startView.startBMI();
    },

    startSearch: function () {
        app.startView.startFoodSearch();
    }


});

app.router = new Router();
Backbone.history.start();