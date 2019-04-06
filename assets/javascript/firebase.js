//Initialize firebase
var config = {
    apiKey: "AIzaSyAULV8HQ9A5Uzh1V6BdGT9O9hLBuuuvObo",
    authDomain: "dnd-spells-ec615.firebaseapp.com",
    databaseURL: "https://dnd-spells-ec615.firebaseio.com",
    projectId: "dnd-spells-ec615",
    storageBucket: "dnd-spells-ec615.appspot.com",
    messagingSenderId: "968367721001"
  };
  firebase.initializeApp(config);

//when the user submits their new account info, this will be triggered, and automatically sign them in on success.
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  // Handle Errors here
});

//when the user enters their existing account into, this will be triggered, and sign them in on success.
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  // Handle Errors here
});

//when the user signs out, this will be triggered.
firebase.auth().signOut().then(function() {
  // Run code to get back to the login screen
}).catch(function(error) {
  // An error happened.
});

//This can be used when opening the website to see if a user is logged in currently, and respond appropriately:
var user = firebase.auth().currentUser;

if (user) {
  // User is signed in.
} else {
  // No user is signed in.
}

//Gets the unique user id for use of determining which spell deck belongs to them
var userID = firebase.User.uid;

//Gets the database core, the database of all spells added, and the database for the specific user currently logged in.
var database = firebase.database();
var spellbase = firebase.database().ref("allSpells");
var userbase = firebase.database().ref(userID);

//Pull the list of spells a user has added to their deck
var userList = userbase.ref("spellArray").get();