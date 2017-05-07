/**
 * Created by jsherman on 5/7/17.
 */

var app = app || {};

// wrap within jQuery $
$(function () {
    app.BmiView = Backbone.View.extend({
        el: '#bmi-view',

        events: {
            'click button#submitBMI': 'searchBMI'
        },

        initialize: function () {
        },

        // render bmi
        render: function () {
            this.collection.each(function (item) {
                // console.log(item);
                this.renderFood(item);
            }, this);
        },

        searchBMI: function (e) {
            e.preventDefault();
            // using ajax rather than another collection.fetch call
            // TODO: multiple api calls with one collection?

            // Make GET request to https://bmi.p.mashape.com/
            var bmiUrl = 'https://bmi.p.mashape.com/';
            var userWeight = this.$('#bmi-weight').val();
            var userHeight = this.$('#bmi-height').val();
            var userAge = this.$('#life-age').val();
            var userGender = this.$('#life-gender').val();

            $.ajax({
                type: 'POST',
                url: bmiUrl,
                dataType: 'json',
                beforeSend: function(xhr) {
                    // xhr.setRequestHeader("X-Mashape-Authorization", "Nzn548SCl8mshyrCNNESZSV21Z8Tp1WXG8ojsn5nVLLUM88cJr");
                    xhr.setRequestHeader("X-Mashape-Authorization", "9Q2PQEr5DGmsh7Z3MtZSf4kjEOByp1IvpWajsnkN3LT1dwrFE5");
                },
                data: {
                    "weight": {
                        "value": userWeight,
                        "unit": 'lb'
                    },
                    "height": {
                        "value": userHeight,
                        "unit": 'in'
                    },
                    "age": userAge,
                    "gender": userGender
                },
                done: function(data) { console.log(data); },
                fail: function(err) { alert(err); }
            })
        },

        searchSuccess: function () {
            console.log('request success');
        },

        searchError: function () {
            console.log('request error')
        }

    });

});