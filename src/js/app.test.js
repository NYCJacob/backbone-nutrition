/**
 * Created by jsherman on 3/29/17.
 */
var app = app || {};

$(function () {
// this needs to be hidden
    var NUTRITIONIX_ID = '21a44b1b';
    var NUTRITIONIX_KEY = 'c306b7fb48fd92654d48050c1ad5f58a';
    var TEST_TERM = 'taco';
    var TEST_ITEM = '773200712034';  // just testing upc item search

//GET "https://api.nutritionix.com/v1_1/search/taco?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&appId=21a44b1b&appKey=c306b7fb48fd92654d48050c1ad5f58a"

    app.nutritionix_searchUrl = 'https://api.nutritionix.com/v1_1/search/taco';
    app.nutritionix_upcUrl = 'https://api.nutritionix.com/v1_1/item';

    app.search = function (TEST_TERM) {
        $.ajax({
            url: app.nutritionix_searchUrl,
            type: "GET",
            data: {
                appId: NUTRITIONIX_ID,
                appKey: NUTRITIONIX_KEY
            }
        }).done(function (data){
            console.log(data);
        }).fail(function () {
            console.log("ajax failed");
        })
    };

    app.searchUpc = function (item) {
        var itemURL = app.nutritionix_upcUrl;
        $.ajax({
            url: itemURL,
            type: "GET",
            data: {
                upc: item,
                appId: NUTRITIONIX_ID,
                appKey: NUTRITIONIX_KEY
            }
        }).done(function (data){
            console.log(data);
        }).fail(function () {
            console.log("ajax failed");
        })
    };

    app.search(TEST_TERM);
    app.searchUpc(TEST_ITEM);


});
