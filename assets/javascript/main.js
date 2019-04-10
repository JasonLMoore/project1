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
});

$(document).ready(function () {
  $('#spell-adder').modal();
  $('#dice-roller').modal();
});

 $('#roll').on('click', function () {
      var userInput = $('#user-input').val();
      var result = droll.roll(userInput);
      var resultDiv = $('<div>');
      $('.results').html(resultDiv);
      resultDiv.text(result);
      $('#user-input').val("");
      console.log(result);
 });

 $('.roll').on('click', function () {
    $('.results').empty();
 });

$("#logout").on("click", function () {
  firebase.auth().signOut();
  // sessionStorage.setItem("sessionID", null);
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  } else {
    window.location.href = "../index.html";
  }
});
