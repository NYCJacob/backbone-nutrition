# Backbone Nutionion API app
This is a nutrition and health app using Backbone.  It is an optional project for the Udacity Frontend Nanodegree.
The idea is to get the user to focus on caloric intake.  This is the key to losing weight. 

The purpose is mostly to gain master Backbone but also to explore an app idea I have had for some time.
There are alot of diet apps out there.  However to loose weight diet is the key and understanding huge
amount of calories we eat is key.  The link to the Mayo Clinic in the analysis tab explains this.

Also, I found this government site very similar but has a terrible UX.  It does seem to get food group
data which the Nutritionix api does not provide.  The USDA api seemed cumbersome but I may spend some time
exploring it in the future.

Unfortunately, I could not locate api resources that did what I wanted.  Part of this project looks up from 
Javascript objects I where I had to enter a lot of data because there was no api.

I hope to explore this app using another framework and perhaps set up some micro api servers.

## Installation
src/ contains the development code and /dist contains minified distribution code.

## Issues
- no workflow such as gulp implemented. Nothing is compressed or minified etc. 
- BMI api not very robust; need to to metric-standard conversions resulting in rounding errors
- Backbone does not permit sharing collections with different views.  This was worked around for the nutrition
api because one view fetched from api and another from localstorage.  This got more complicated with trying
to display saved bmi data when would fetch both ways to localstorage.  For purposes of this project the feature
was abandoned although the bmi data with sortable timestamp was completed and remains in the bmi-localstorage branch.
- need to implement build process
- saved food items all display with details resulting in only a few items showing on most displays.  
I could not find a way to have the Underscore template just set the most recent item as opened and the others
collapsed.
- only basic client-side form validation but it does use Bootstrap v4 form error classes in the BMI view.  
I could not find a way to make any of the form validation plugins work within Backbone.  The Backbone
validation plugin requires a model which is not being used in the BMI view because of the poor api.
- select elements not validating on client side because not blur event or easy work around.
- bmi 'submit' will send empty form because required attribute will not work here because not using submit event 
- a lot of effort was made to implement client side validation using backbone and bootstrap classes but it was not so easy
and not yet 100%.

## ps
- as I was finishing up this project I saw this article in the New York Times  
More Than 10 Percent of World’s Population Is Obese, Study Finds https://nyti.ms/2tcPubT