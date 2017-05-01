/**
 * Created by jsherman on 4/13/17.
 */
var app = app || {};

// wrap within jQuery $
$(function () {
    app.SavedFoodsView = Backbone.View.extend({
        el: '#saved-items',
        // tagName: 'div',
        // className: 'saved-foods',

        template: _.template( $( '#savedFoodTemplate' ).html() ),

        events: {
            'click button#delete': 'deleteFood'
        },

        initialize: function () {
            this.collection = new app.savedCollection();
            this.listenTo(this.collection, 'reset', this.render);  // reset will trigger render
        },

        // render library by rendering each book in its collection
        render: function () {
            console.log('savedFoodsView render');
            console.log(this.model.attributes);
            console.log(this.template);
            console.log(this.el);

            this.$el.append( this.template( this.model.attributes.fields ) );
            return this;
        }
    });
});

