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

var searchWord = $("#new-spell").val().trim();
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
        
      var name = $("<div>").attr("id", "name").html("<h1>" + response.name + "</h1>");

      var level = $("<div>").attr("id", "level").text("Spell Level: " + response.level);
      if (response.level < 1) {
        $("id", "level").text("Spell Level: Cantrip");
      }

      var school = $("<div>").attr("id", "school").text("School of Magic: " + response.school.name);
      var con = $("<div>").attr("id", "con")
      if (response.concentration === "yes") {
        $("id", "con").text("Concentration")
      }
            
      var ritual = $("<div>").attr("id", "ritual")
      if (response.ritual === "yes") {
        $("id", "ritual").text("Ritual");
      }

      var castTime = $("<div>").attr("id", "castingTime").text("Casting Time: " + response.casting_time);

      var range = $("<div>").attr("id", "range").text("Range: " + response.range);

      var comp = $("<div>").attr("id", "componants").text("Componants: " + response.components);

      var material = $("<div>").attr("id", "material")
      if (response.material === undefined) {
        $("#material").hide()
      } else {
        response.material = response.material.split('â€™').join('\''); 
        $("id", "material").text("Materials: " + response.material);
      }
        
      var duration = $("<div>").attr("id", "duration").text("Duration: " + response.duration);

      var desc = $("<div>").attr("id", "descript").text("Description: ");
      for (n = 0; n < response.desc.length; n++){
        response.desc[n] = response.desc[n].split('â€™').join('\'');
        $("id", "descript").append(response.desc[n] + " ");
      }

        
      var highLvl = $("<div>").attr("id", "atHigherLevel").text("At Higher Levels: " + response.higher_level);
      if (response.higher_level === undefined) {
        $("id", "atHigherLevel").hide();
      }

      var usedBy = $("<div>").attr("id", "usedBy").text("Can be cast by: ")  
      for(var i = 0; i < response.classes.length; i++) {
        $("id", "usedBy").append(response.classes[i].name);
        if (i < response.classes.length - 1) {
          $("id", "usedBy").append(", ");
        }
      }
      
      var cardID = 1
      
      var spellCard = $("<div>").attr("class", "carousel-item grey white-text spell-card");
      
      $(spellCard).attr("id", "spell-ID" + cardID);
      $(spellCard).attr("href", "card" + cardID);
      $(spellCard).append(
        name,
        level,
        school,
        con,
        ritual,
        castTime,
        range,
        comp,
        material,
        duration,
        desc,
        highLvl,
        usedBy
      );
      $("id", "carousel-slider").append(spellCard);
      cardID++
      

    });
  });
});

