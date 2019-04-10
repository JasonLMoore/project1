
var searchWord = "Vampiric Touch" 
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
        if (response.level < 1) {
            $("#level").text("Spell Level: Cantrip");
        }

        $("#school").text("School of Magic: " +response.school.name);
        //Make appear only when true//

        $("#con").text("Concentration")
        if (response.concentration !== "yes") {
            $("#con").hide();
        }

        $("#ritual").text("Ritual");
        if (response.ritual !== "yes") {
            $("#ritual").hide();
        }


        ///////////////////////
        $("#castingTime").text("Casting Time: " + response.casting_time);

        $("#range").text("Range: " + response.range);

        $("#componants").text("Componants: " + response.components);

        if (response.material === undefined) {
            $("material").hide()
        } else {
            response.material = response.material.split('â€™').join('\''); 
            $("#material").text("Materials: " + response.material);
        }
        
        $("#duration").text("Duration: " + response.duration);

        $("#descript").text("Description: ");
        for (n = 0; n < response.desc.length; n++){
            response.desc[n] = response.desc[n].split('â€™').join('\'');
            $("#descript").append(response.desc[n] + " ");
        }

        
        $("#atHigherLevel").text("At Higher Levels: " + response.higher_level);
        if (response.higher_level === undefined) {
            $("#atHigherLevel").hide();
        }

        $("#usedBy").text("Can be cast by: ")  
        for(var i = 0; i < response.classes.length; i++) {
            $("#usedBy").append(response.classes[i].name);
            if (i < response.classes.length - 1) {
                $("#usedBy").append(", ");
            }
        }

    });
});

//itemDescription = itemDescription.split('â€™').join('\'');
//fix apostrophie itemDescription = itemDescription.split(',-').join('').split('.,').join('.');


