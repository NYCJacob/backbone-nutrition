/**
 * Created by jsherman on 5/26/17.
 */

app.SavedBMI = Backbone.Model.extend({

    defaults: {
        weight : '',
        height : '',
        age : '',
        bmi_prime : '',
        bmi_risk : '',
        bmi_status : '',
        bmi_value : '',
        bmr_value : '',
        ideal_weight : ''
    }

});