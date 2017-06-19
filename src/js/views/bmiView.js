/**
 * Created by jsherman on 5/7/17.
 */
"use strict";

var app = app || {};

// wrap within jQuery $
$(function () {
    app.BmiView = Backbone.View.extend({
        el: '#bmi-controls',

        model: app.SavedBMI,

        template: _.template( $('#bmiTemplate').html() ),

        // collection: app.bmiCollection,

        // see https://stackoverflow.com/questions/19503262/backbone-js-and-form-input-blur
        events: {
            'click button#submitBMI': 'searchBMI',
            'click button#bmi-head-btn': 'toggleBmiForm',
            'blur input#bmi-height': 'validateHeight',
            // 'change input#bmi-height': 'resetValidation',
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
            this.$activity = this.$( '#activity-level' );
            this.$activityGroup = this.$( '#activityGroup' );
            this.$bmiSearch = this.$( '#bmi-search' );
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

        //todo: input validate methods probably should be toggles so they can be cleared easier??
        // https://stackoverflow.com/questions/5680807/backbone-js-events-knowing-what-was-clicked#5680837

        resetValidation: function ( ev ) {
            console.log($(ev.target).attr('name'));
        },

        validateHeight: function () {
            var heightRegex = /^[0-9]{2}$/g;
            if ( this.$bmiHeight.val().match( heightRegex )  ) {
                this.$heightGroup.addClass( 'has-success');
                this.$bmiHeight.addClass( 'form-control-success' );
                return true;
            } else {
                this.$heightGroup.addClass( 'has-danger');
                this.$bmiHeight.addClass( 'form-control-danger' );
                return false;
            }
        },

        validateWeight: function () {
            var weightRegex = /^[0-9]{3}$/g;
            var weightInput = this.$bmiWeight.val();
            if ( weightInput.match( weightRegex ) ) {
                this.$weightGroup.addClass( 'has-success');
                this.$bmiWeight.addClass( 'form-control-success' );
                return true;
            } else {
                this.$weightGroup.addClass( 'has-danger');
                this.$bmiWeight.addClass( 'form-control-danger' );
                return false;
            }
        },

        validateAge: function () {
            var ageRegex = /^[0-9]{2}$/g;
            if ( this.$lifeAge.val().match( ageRegex )  ) {
                this.$ageGroup.addClass( 'has-success');
                this.$lifeAge.addClass( 'form-control-success' );
                return true;
            } else {
                this.$ageGroup.addClass( 'has-danger');
                this.$lifeAge.addClass( 'form-control-danger' );
                return false;
            }
        },

        validateGender: function () {
            var genderRegex = /^(f|m){1}$/g;
            if ( this.$lifeGender.val().match( genderRegex )  ) {
                this.$genderGroup.addClass( 'has-success');
                this.$lifeGender.addClass( 'form-control-success' );
                return true;
            } else {
                this.$genderGroup.addClass( 'has-danger');
                this.$lifeGender.addClass( 'form-control-danger' );
                return false;
            }
        },

        validateActivity: function () {
            var activityRegex = /^(sedentary|moderate|active)$/g;
            if ( this.$activity.val().match( activityRegex )  ) {
                this.$activityGroup.addClass( 'has-success');
                this.$activity.addClass( 'form-control-success' );
                return true;
            } else {
                this.$activityGroup.addClass( 'has-danger');
                this.$activity.addClass( 'form-control-danger' );
                return false;
            }
        },

        // saveBMI is not used now and really should be only be in the bmi-localstorage fork,
        // but I am leaving it for now in case I get a quick idea I want to test.  See README for more details
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
            // var userWeight = (this.$('#bmi-weight').val() * .45);    // this is a truncated conversion
            var userWeight = self.$bmiWeight.val();
            var userHeight = (self.$bmiHeight.val() * 2.54);
            var userAge = self.$lifeAge.val();
            var userGender = self.$lifeGender.val();
            //  check element values on submit button click event to cover
            // this covers when empty form-no blur event and select elements
            var weightValid = this.validateWeight();
            var heightValid = this.validateHeight();
            var ageValid = this.validateAge();
            var genderValid = this.validateGender();
            var activityValid = this.validateActivity();
            var onClickErrMsg = "Please check your answers.";
            if ( weightValid === false | heightValid === false | ageValid === false | genderValid === false | activityValid === false ){
                app.messenger.showMessage( onClickErrMsg );
            }

            var urlData =  {
                            "weight":{
                                "value": userWeight,
                                "unit":"lb"},
                            "height":{
                                "value": userHeight,
                                "unit":"cm"},
                            "sex": userGender,
                            "age": userAge
                            };

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
                self.preRender( data );   // need to get more data before rendering
            }).fail(function () {
                // console.log( 'ajax fail');
                var ajaxFail = 'There was a problem with the request, please check your answers.';
                app.messenger.showMessage( ajaxFail );
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
            var activeLevel = self.$activity.val();
            // age and gender are not returned back from api
            var gender = self.$lifeGender.val();
            var age = parseInt( self.$lifeAge.val() ) ;
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

            // check media size to hide form if too small
            // https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries
            // bootstrap col-sm is below 768px
            var mediaQueryList = window.matchMedia("(max-width: 767px)");
            if (mediaQueryList.matches) {
                /* The viewport is currently under 768px */
                self.$bmiSearch.hide("slow");  // hide form to give results text room on mobile
                // remove button disabled attribute so user can show form again
                $('#bmi-head-btn').removeAttr('disabled');
            }
            // send revised data object to render
            self.render( data );
        },

        toggleBmiForm: function () {
            this.$bmiSearch.toggle("slow");
        }

    });

});