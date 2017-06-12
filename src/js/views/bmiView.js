/**
 * Created by jsherman on 5/7/17.
 */

var app = app || {};

// wrap within jQuery $
$(function () {
    app.BmiView = Backbone.View.extend({
        el: '#bmi-view',

        model: app.SavedBMI,

        template: _.template( $('#bmiTemplate').html() ),

        // collection: app.bmiCollection,

        // see https://stackoverflow.com/questions/19503262/backbone-js-and-form-input-blur
        events: {
            'click button#submitBMI': 'searchBMI',
            'blur input#bmi-height': 'validateHeight',
            'blur input#bmi-weight': 'validateWeight',
            'blur input#life-age': 'validateAge',
            'blur input#lifeGender': 'validateGender',
            'blur input#activity-level': 'validateActivity'
        },

        initialize: function () {
            this.$bmiResults = this.$( '#bmi-results' );
            this.$bmiHeight = this.$( '#bmi-height' );
            this.$heightGroup = this.$( '#heightGroup' );
            this.$bmiWeight = this.$( '#bmi-weight' );
            this.$weightGroup = this.$( '#weightGroup' );
            this.$lifeAge = this.$( '#life-age' );
            this.$ageGroup = this.$( '#ageGroup' );
            this.$lifeGender = this.$( '#lifeGender' );
            this.$genderGroup = this.$( '#genderGroup' );
            this.$activity = this.$( '#activity' );
            this.$activityGroup = this.$( '#activityGroup' );
        },

        // render bmi
        render: function ( data ) {
            var weights = data.ideal_weight.match(/(\d+\.\d+|\d+)/g);  // regex to extract decimal metric weights
            // convert kg to lbs and round to int
            var weightLB_0 = Math.round(weights[0] * 2.20462);
            var weightLB_1 = Math.round(weights[1] * 2.20462);
            // replace idea_weight fields
            data.ideal_weight =  data.ideal_weight.replace(weights[0], weightLB_0);
            data.ideal_weight = data.ideal_weight.replace(weights[1], weightLB_1);
            // global option not available on string to string replacement like with regex
            data.ideal_weight = data.ideal_weight.replace('kg', 'lb');
            data.ideal_weight = data.ideal_weight.replace('kg', 'lb');

            // store data to global
            app.bmiData = data;
            // send data via _template to results div not el
            this.$bmiResults.html(this.template( data ));
            return this;
            },

        validateHeight: function () {
            var heightRegex = /^[0-9]{2}$/g;
            if ( this.$bmiHeight.val().match( heightRegex )  ) {
                this.$heightGroup.addClass( 'has-success');
                this.$bmiHeight.addClass( 'form-control-success' );
            } else {
                this.$heightGroup.addClass( 'has-danger');
                this.$bmiHeight.addClass( 'form-control-danger' );
            }
        },

        validateWeight: function () {
            var weightRegex = /^[0-9]{3}$/g;
            var weightInput = this.$bmiWeight.val();
            if ( weightInput.match( weightRegex ) ) {
                this.$weightGroup.addClass( 'has-success');
                this.$bmiWeight.addClass( 'form-control-success' );
            } else {
                this.$weightGroup.addClass( 'has-danger');
                this.$bmiWeight.addClass( 'form-control-danger' );
            }
        },

        validateAge: function () {
            var ageRegex = /^[0-9]{2}$/g;
            if ( this.$lifeAge.val().match( ageRegex )  ) {
                this.$ageGroup.addClass( 'has-success');
                this.$lifeAge.addClass( 'form-control-success' );
            } else {
                this.$ageGroup.addClass( 'has-danger');
                this.$lifeAge.addClass( 'form-control-danger' );
            }
        },

        validateGender: function () {
            var genderRegex = /^(f|m){1}$/g;
            if ( this.$lifeGender.val().match( genderRegex )  ) {
                this.$genderGroup.addClass( 'has-success');
                this.$lifeGender.addClass( 'form-control-success' );
            } else {
                this.$genderGroup.addClass( 'has-danger');
                this.$lifeGender.addClass( 'form-control-danger' );
            }
        },

        validateActivity: function () {
            var activityRegex = /^(sedentary|moderate|active)$/g;
            if ( this.$activity.val().match( activityRegex )  ) {
                this.$activityGroup.addClass( 'has-success');
                this.$activity.addClass( 'form-control-success' );
            } else {
                this.$activityGroup.addClass( 'has-danger');
                this.$activity.addClass( 'form-control-danger' );
            }
        },

        saveBMI: function (e) {
            e.preventDefault();
            console.log( 'saveBMI' );
            // save to collection (local storage)
            var currentBMI = {
                timestamp : Math.floor( Date.now()/1000 ),
                weight : Math.ceil( app.bmiData.weight.lb ) ,    // rounding up for kg-lb conversion error
                height : app.bmiData.height[ 'ft-in' ],
                bmi_prime : app.bmiData.bmi.prime,
                bmi_risk : app.bmiData.bmi.risk,
                bmi_status : app.bmiData.bmi.status,
                bmi_value : app.bmiData.bmi.value,
                bmr_value : app.bmiData.bmr.value,
                ideal_weight : app.bmiData.ideal_weight
            };
            this.collection.create( currentBMI );
        },

        searchBMI: function (e) {
            e.preventDefault();
            var self = this;
            // using ajax rather than another collection.fetch call because of non REST api

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

            // for json POST request see
            // http://stackoverflow.com/questions/12693947/jquery-ajax-how-to-send-json-instead-of-querystring#12693986
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
            }).done(function( data ){  // data is a json object returned from api
                // self.render(data);
                self.preRender( data );   // need to get more data before rendering
            }).fail(function () {
                console.log( 'ajax fail');
            }); // ajax end
        },

        // preRender finds EER to render with BMI data
        // no api for EER was found so created the rda objects  :(
        preRender: function ( data ) {
            var self = this;
            // EER is the calories requirement which based factoring in activity level
            var EER = 0;
            // console.log( data );
            // activity level is not sent to nutritionix but used for rda object value lookup
            var activeLevel = this.$( '#activity-level' ).val();
            var gender = this.$('#life-gender').val();   // could not find a way to pass this value from ajax
            var age = parseInt( this.$('#life-age').val() ) ;
            // this will be the new age value for the eer object age index
            var ageIndex;

            // find age slot
            switch ( true ) {
                case age > 75 :
                    ageIndex = '76';
                    break;
                case  age <= 13 :
                    ageIndex = '13';
                    break;
                case  age > 13 && age < 19:
                    ageIndex = '18';
                    break;
                case  age > 18 && age < 31:
                    ageIndex = '30';
                    break;
                case  age > 30 && age < 51:
                    ageIndex = '50';
                    break;
                case  age > 50 && age < 71:
                    ageIndex = '70';
                    break;
                default:
                    console.log( 'age switch error');
            }

            // find gender
            if ( gender === 'f' ) {
                EER = femalesEER[ ageIndex ][activeLevel];
            } else if ( gender === 'm'){
                EER = malesEER[ ageIndex ][activeLevel];
            } else {
                console.log( "gender error" );
            }

            //  append EER to BMI data object
            data.eer = EER;

            // send revised data object to render
            self.render( data );
        }

    });

});