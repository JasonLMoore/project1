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


var proxyURL = "https://cors-anywhere.herokuapp.com/";
var baseURL = proxyURL + "http://dnd5eapi.co/api/spells/?name=";
var spellArray = [];

$('.carousel.carousel-slider').carousel({
  fullWidth: true,
  indicators: true
});

$(document).ready(function () {
  $('.sidenav').sidenav();
  $('#spell-adder').modal();
  $('#dice-roller').modal();
});

$('#roll').on('click', function () {
  animateDice();
});

function animateDice() {
  var userInput = $('#user-input').val();
  if ( userInput !== "") {
    $('.d20').animate({
      borderSpacing: 360
    }, {
      step: function (now, fx) {
        $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
        $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
        $(this).css('transform', 'rotate(' + now + 'deg)');
      },
      duration: 2000,
      complete: diceRoll,
    }, 'linear');
  }
}

function diceRoll() {
  $('.d20').removeAttr('style');
  var userInput = $('#user-input').val();
  if (userInput !== "") {
    var result = droll.roll(userInput);
    var resultDiv = $('<div>');
    $('.results').html(resultDiv);
    resultDiv.text(result);
    $('#user-input').val("");
  }
}

$('.roll').on('click', function () {
  $('.results').empty();
});


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log("user: ", user);
    var userID = user.uid;
    console.log("ID: " + userID);
    var spellList = database.ref("user/" + userID + "/spells");
    console.log("spelllist: ", spellList);

    spellList.once('value').then(function(snapshot) {
      snapshot.forEach(function (child) {
        spellArray.push(child.val());
      });
      
    });
    console.log("sarray:" + spellArray);
    
    $("#logout").on("click", function () {
      if (spellArray != null) {
        spellList.setValue(null);
        spellArray.forEach(function (entry) {
          var newSpell = spellList.push();
          newSpell.set({ entry });
        });
      }
      firebase.auth().signOut();
    });
    if (spellArray.length != 0)  {
    spellArray.forEach(createCard);}

  } else {

    window.location.href = "../index.html";
  }
});


function createCard(entry) {
  
  var queryURL = baseURL + entry;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log("response: ", response)
    console.log("response.results: " + response.results[0].url)

    $.ajax({
      url: response.results[0].url,
      method: "GET"
    }).then(function (response) {
      console.log("response2:" + response)

      var name = $("<div>").attr("id", "name").html("<h1>" + response.name + "</h1>");

      var level = $("<div>").attr("id", "level").text("Spell Level: " + response.level);
      if (response.level < 1) {
        level.text("Spell Level: Cantrip");
      }

      var school = $("<div>").attr("id", "school").text("School of Magic: " + response.school.name);
      var con = $("<div>").attr("id", "con")
      if (response.concentration === "yes") {
        school.text("Concentration")
      }

      var ritual = $("<div>").attr("id", "ritual")
      if (response.ritual === "yes") {
        ritual.text("Ritual");
      }

      var castTime = $("<div>").attr("id", "castingTime").text("Casting Time: " + response.casting_time);

      var range = $("<div>").attr("id", "range").text("Range: " + response.range);

      var comp = $("<div>").attr("id", "componants").text("Componants: " + response.components);

      var material = $("<div>").attr("id", "material")
      if (response.material === undefined) {
        material.hide()
      } else {
        response.material = response.material.split('â€™').join('\'');
        material.text("Materials: " + response.material);
      }

      var duration = $("<div>").attr("id", "duration").text("Duration: " + response.duration);

      var desc = $("<div>").attr("id", "descript").text("Description: ");
      for (n = 0; n < response.desc.length; n++) {
        response.desc[n] = response.desc[n].split('â€™').join('\'');
        desc.append(response.desc[n] + " ");
      }


      var highLvl = $("<div>").attr("id", "atHigherLevel").text("At Higher Levels: " + response.higher_level);
      if (response.higher_level === undefined) {
        highLvl.hide();
      }

      var usedBy = $("<div>").attr("id", "usedBy").text("Can be cast by: ")
      for (var i = 0; i < response.classes.length; i++) {
        usedBy.append(response.classes[i].name);
        if (i < response.classes.length - 1) {
          usedBy.append(", ");
        }
      }

      var cardID = 1

      var spellCard = $("<div>").attr("class", "carousel-item grey white-text spell-card");

      spellCard.attr("id", "spell-ID" + cardID);
      spellCard.attr("href", "card" + cardID);
      spellCard.append(
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
      $("#carousel-slider").append(spellCard);
      cardID++
    });
  });
}

$("#add-spell").on("click", createCard($("#new-spell").val().trim()))
