var config = {
  apiKey: "AIzaSyAULV8HQ9A5Uzh1V6BdGT9O9hLBuuuvObo",
  authDomain: "dnd-spells-ec615.firebaseapp.com",
  databaseURL: "https://dnd-spells-ec615.firebaseio.com",
  projectId: "dnd-spells-ec615",
  storageBucket: "dnd-spells-ec615.appspot.com",
  messagingSenderId: "968367721001"
};
firebase.initializeApp(config);

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

$("#logout").on("click", function () {
  firebase.auth().signOut();
  // sessionStorage.setItem("sessionID", null);
});

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {} else {
    window.location.href = "../index.html";
  }
});