
var searchWord = "Magic Missile" 
var proxyURL = "https://cors-anywhere.herokuapp.com/"
var queryURL = proxyURL + "http://dnd5eapi.co/api/spells/?name=" + searchWord

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response)
    console.log(response.results[0].url)
    $.ajax({
        url: response.results[0].url,
        method: "GET"
    }).then(function(response) {
        console.log(response)

        $("#name").html("<h1>" + response.name + "</h1>");
        $("#level").text("Spell Level: " + response.level);
        $("#school").text("School of Magic: " +response.school.name);
        //Make appear only when true//
        $("#ritual");
        ///////////////////////
        $("#castingTime").text("Casting Time: " + response.casting_time);
        $("#range").text("Spell Range: " + response.range);
        //Maybe not a thing?//
        $("#a-o-e");
        ////////////////////
        $("#componants").text("Componants: " + response.components);
        //Bug:word needs to be recoded//
        $("#material").text("Materials: " + response.material);
        /////////////////////////
        $("#duration").text("Duration: " + response.duration);
        $("#descript").text("Description: " + response.desc);
        $("#atHigherLevel").text("At Higher Levels: " + response.higher_level);
        $("#usedBy").text("Can be cast by: ")  
        for(var i = 0; i < response.classes.length; i++) {
            $("#usedBy").append(response.classes[i].name);
            if (i < response.classes.length - 1) {
                $("#usedBy").append(", ");
            }
        }
    });
});