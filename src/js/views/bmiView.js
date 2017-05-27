/**
 * Created by jsherman on 5/7/17.
 */

var app = app || {};

// wrap within jQuery $
$(function () {
    app.BmiView = Backbone.View.extend({
        el: '#bmi-view',

        // model: app.SavedBMI,
        template: _.template( $('#savedFooterTemplate').html() ),

        events: {
            'click button#submitBMI': 'searchBMI'
        },

        initialize: function () {

        },

        // render bmi
        render: function ( data ) {
            this.$el.html(this.template( data ));
            return this;
            },

        searchBMI: function (e) {
            e.preventDefault();

            var self = this;
            // using ajax rather than another collection.fetch call
            // TODO: multiple api calls with one collection?

            // Make JSON request to https://bmi.p.mashape.com/
            // could only get api to work using default metric values
            var bmiUrl = 'https://bmi.p.mashape.com/';
            var userWeight = (this.$('#bmi-weight').val() * .45);    // this is a truncated conversion
            var userHeight = (this.$('#bmi-height').val() * 2.54);
            var userAge = this.$('#life-age').val();
            var userGender = this.$('#life-gender').val();
            var urlData =  {
                "weight":{"value": userWeight,"unit":"kg"},
                "height":{"value": userHeight,"unit":"cm"},
                "sex": userGender, "age": userAge};

            // for json POST request see http://stackoverflow.com/questions/12693947/jquery-ajax-how-to-send-json-instead-of-querystring#12693986
            $.ajax({
                type: 'POST',
                url: bmiUrl,
                contentType: "application/json",
                // dataType: 'json',
                beforeSend: function(xhr) {
                    // xhr.setRequestHeader("X-Mashape-Authorization", "Nzn548SCl8mshyrCNNESZSV21Z8Tp1WXG8ojsn5nVLLUM88cJr");
                    xhr.setRequestHeader("X-Mashape-Authorization", "9Q2PQEr5DGmsh7Z3MtZSf4kjEOByp1IvpWajsnkN3LT1dwrFE5");
                },
                // data request needs to be JSON per api docs
                data: JSON.stringify(urlData)
            }).done(function( data ){
                // data is a json object returned from api
                self.render(data);
            });  // done promise
        },

        searchSuccess: function () {
            console.log('request success');
        },

        searchError: function () {
            console.log('request error')
        }

    });

});