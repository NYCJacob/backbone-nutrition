/**
 * Created by jsherman on 5/29/17.
 */
"use strict";

var app = app || {};

// wrap within jQuery $
$(function () {
    app.messageView = Backbone.View.extend({

        el: '#user-message',

        template: _.template( $( '#user-message' ).html() ),

        events: {
        },

        initialize: function () {
            // this will hold message text passed to view object
            this.message = '';
        },

        // render library by rendering each book in its collection
        render: function () {
            this.$el.html( this.message );
            return this;
        },

        showMessage: function ( message ) {
            this.message = message;
            this.render();
            this.$el.show("slow");

        },

        hideMessage: function () {
            this.$el.hide();
        }
    });

    app.messenger = new app.messageView();
});
