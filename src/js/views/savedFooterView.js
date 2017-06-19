/**
 * Created by jsherman on 5/10/17.
 */
"use strict";

var app = app || {};

// wrap within jQuery
$(function () {
    app.SavedFooterView = Backbone.View.extend({
        el: '#saved-footer',

        template: _.template($('#savedFooterTemplate').html()),

        events: {},

        initialize: function () {
            this.render();
        },

        // render library by rendering each book in its collection
        render: function () {
            console.log('savedFooter render');
            this.$el.html(this.template(this.model.attributes));
            return this;
        }

    });
});