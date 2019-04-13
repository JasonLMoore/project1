var elem1 = document.querySelector('#modal1');
var elem2 = document.querySelector('#modal2');
var config = {
  apiKey: "AIzaSyAULV8HQ9A5Uzh1V6BdGT9O9hLBuuuvObo",
  authDomain: "dnd-spells-ec615.firebaseapp.com",
  databaseURL: "https://dnd-spells-ec615.firebaseio.com",
  projectId: "dnd-spells-ec615",
  storageBucket: "dnd-spells-ec615.appspot.com",
  messagingSenderId: "968367721001"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location.href = "./pages/main.html";
  } else {
  }
});

$(".login-form").keyup(function(e) {
  if(e.which === 13){
    $(".btn-small").click();
  }
})

$(".btn-small").on('click', function () {
  var username = $("#username").val().trim();
  var password = $("#password").val().trim();
  if (username === "" || password === "") {
    var instance = M.Modal.init(elem1);
    instance.open();
  } else {
    firebase.auth().signInWithEmailAndPassword(username, password).then(function () {

      window.location.href = "./pages/main.html";
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // Handle Errors here, such as invalid login info
      var instance = M.Modal.init(elem2);
      instance.open();
    });
  }
});


$("#create-login").on('click', function () {
  
  var username = $("#username").val().trim();
  var password = $("#password").val().trim();

  firebase.auth().createUserWithEmailAndPassword(username, password).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    // Handle Errors here
    console.log(errorMessage);
  });
});

