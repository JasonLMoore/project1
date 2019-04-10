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
      resultDiv.text(result.total);
      $('#user-input').val("");
      console.log(result);
 });

 $('#roll-dice').on('click', function () {
    $('.results').val("")
 })