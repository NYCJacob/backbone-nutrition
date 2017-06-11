/**
 * Created by jsherman on 5/26/17.
 */

app.SavedBMI = Backbone.Model.extend({

    defaults: {
        weight : '',
        height : '',
        // age : '',     // age not returned by bmi although needed in ajax request to return values
        bmi_prime : '',
        bmi_risk : '',
        bmi_status : '',
        bmi_value : '',
        bmr_value : '',
        ideal_weight : ''
    }

});