/**
 * Created by jsherman on 6/14/17.
 */

var Router = Backbone.Router.extend({
    routes: {
        "*action" : "default"
    },

    default: function (action) {
        console.log(action);
    }

});

app.router = new Router();
Backbone.history.start();