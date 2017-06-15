/**
 * Created by jsherman on 6/14/17.
 */

var Router = Backbone.Router.extend({
    routes: {
        "*action" : "default",
        "start" : "startView",
        "bmi"  :  "startBmi",
        "search" : "startSearch"
    },

    default: function (action) {
        console.log(action);
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