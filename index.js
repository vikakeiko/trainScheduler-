// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCES7JLsfXTjvhkPX07b6huT3-9-gys4VE",
    authDomain: "project-1-79060.firebaseapp.com",
    databaseURL: "https://project-1-79060.firebaseio.com",
    projectId: "project-1-79060",
    storageBucket: "project-1-79060.appspot.com",
    messagingSenderId: "364651736987",
    appId: "1:364651736987:web:dc03d139fbb2c7f9"
  };

  firebase.initializeApp(firebaseConfig);

   // Create a variable to reference the database
  var database = firebase.database();


// Button for adding trains
$("#add-trains-btn").on("click", function(event){
    event.preventDefault();

    // Grabs user input 
    var trainName = $("train-name-input").val().trim();
    var trainDest = $("destination-input").val().trim();
    var trainFreq = $("frequesncy-input").val().trim();
    var trainArr = moment($("arrival-input").val().trim(), "MM/DD/YYYY").format("X");
    var trainAway = $("train-away-input").val().trim();

    // creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        destination: trainDest,
        frequesncy: trainFreq,
        arrival: trainArr,
        away: trainAway
    };

    // Uploads trains data to the database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequesncy);
    console.log(newTrain.arrival);
    console.log(newTrain.away);



})

