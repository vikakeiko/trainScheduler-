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

  var database = firebase.database();
console.log("hi")

// Button for adding trains
$("#go").on("click", function(event){
    event.preventDefault();

    // Grabs user input 
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainFreq = $("#frequesncy-input").val().trim();
    var trainArr = moment($("#first-arrival-input").val().trim(), "MM/DD/YYYY").format("X");

    // creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        destination: trainDest,
        frequesncy: trainFreq,
        arrival: trainArr,
    };

    // Uploads trains data to the database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequesncy);
    console.log(newTrain.arrival);

    // log from DB
    database.ref().on("value", function(snapshot) {

        // Then we console.log the value of snapshot
        console.log(snapshot.val());
  
        // // Update the clickCounter variable with data from the database.
        // newTrain = snapshot.val().newTrain;
  
        // // Then we change the html associated with the number.
        // $("#click-value").text(snapshot.val().clickCount);
  
        // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
        // Again we could have named errorObject anything we wanted.
      })

    alert("Train schedule successfully added");

    // clears all of the text-boxes 
    $("#train-name-input").empty();
    $("#destination-input").empty();
    $("#frequesncy-input").empty();
    $("#first-arrival-input").empty();



})

