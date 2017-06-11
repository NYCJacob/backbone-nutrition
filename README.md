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
currently all files are in src/ and you need to load index.html on a server.  A basic form submit should display 
results in the results div.

## Issues
- BMI api not very robust; need to to metric-standard conversions resulting in rounding errors
- Backbone does not permit sharing collections with different views.  This was worked around for the nutrition
api because one view fetched from api and another from localstorage.  This got more complicated with trying
to display saved bmi data when would fetch both ways to localstorage.  For purposes of this project the feature
was abandoned although the bmi data with sortable timestamp was completed and remains in the bmi-localstorage branch.
- need to implement build process
- saved food items all display with details resulting in only a few items showing on most displays.  
I could not find a way to have the Underscore template just set the most recent item as opened and the others
collapsed.