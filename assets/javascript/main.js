var config = {
  apiKey: "AIzaSyAULV8HQ9A5Uzh1V6BdGT9O9hLBuuuvObo",
  authDomain: "dnd-spells-ec615.firebaseapp.com",
  databaseURL: "https://dnd-spells-ec615.firebaseio.com",
  projectId: "dnd-spells-ec615",
  storageBucket: "dnd-spells-ec615.appspot.com",
  messagingSenderId: "968367721001"
};
firebase.initializeApp(config);
var database = firebase.database();
var auth = firebase.auth();

var searchWord = "";
var proxyURL = "https://cors-anywhere.herokuapp.com/";
var baseURL = proxyURL + "http://dnd5eapi.co/api/spells/?name=";

$('.carousel.carousel-slider').carousel({
  fullWidth: true,
  indicators: true
});

$(document).ready(function () {
  $('.sidenav').sidenav();
});

$(document).ready(function () {
  $('#spell-adder').modal();
});

$("#logout").on("click", function () {
  auth.signOut();
});

var userID = auth.currentUser.uid;
var spellArray = database.ref("user/" + userID).once("array");

auth.onAuthStateChanged(function(user) {
  if (user) {
  } else {
    database.ref("user/" + userID).set({"array": spellArray});
    window.location.href = "../index.html";
  }
});

spellArray.forEach(function(entry) {
  searchWord = entry;
  var queryURL = baseURL + searchWord;
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

        $("#con").text("Concentration")
        if (response.concentration !== "yes") {
            $("#con").hide();
        }

        $("#ritual").text("Ritual");
        if (response.ritual !== "yes") {
            $("#ritual").hide();
        }

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
});