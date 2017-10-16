var apiKey = '5c50d3a7da5ec314';

function computeHowNice(degreesF) {
    if (degreesF < 0) return "It is too cold to exist here.  Move.";
    if (degreesF >=0 && degreesF <=32) return "It is very cold";
    if (degreesF >32 && degreesF<=72) return "It is chilly";
    if (degreesF >72 && degreesF <=90) return "It is nice";
    if (degreesF >90) return "It is hot";
}

function search() {
    executeSearch(document.getElementById("userinput").value);
}

function executeSearch(value) {
    $.ajax(constructApiString(value)).done(function(data, status){
        if (data && data.response && data.response.error) {
            document.getElementById("hownice").innerHTML = data.response.error.description;
            document.getElementById("pic").src ="";
        }
        else {
            document.getElementById("hownice").innerHTML = computeHowNice(parseFloat(data.current_observation.feelslike_f));
            if (data.current_observation.display_location && data.current_observation.display_location.full) {
                document.getElementById("whereat").innerHTML = data.current_observation.display_location.full;
            }
            
            document.getElementById("pic").src = data.current_observation.icon_url;
        }
    }).fail(function() { //something goes wrong that i can't account for in a manual test
        document.getElementById("hownice").innerHTML ="OMG FAIL";

    });
}

function constructApiString(value) {
    return "http://api.wunderground.com/api/" + apiKey + "/conditions/q/" + value + ".json";
}

