// 1. Initialize Firebase
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

// 2. Button for adding trains
$("#go").on("click", function (event) {
    event.preventDefault();

    // Grabs user input 
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainFreq = $("#frequesncy-input").val().trim();
    var arrTime = moment($("#first-arrival-input").val().trim(), "HH:mm").format("X");
//  console.log(arrTime)
     // creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        dest: trainDest,
        freq: trainFreq,
        arri: arrTime,
    };

    // Uploads trains data to the database
    database.ref().push(newTrain);

    // console.log(newTrain.name);
    // console.log(newTrain.dest);
    // console.log(newTrain.freq);
    // console.log(newTrain.arri);


    



    // alert("Train schedule successfully added");

    // clears all of the inputs 
    $("#train-name-input").empty();
    $("#destination-input").empty();
    $("#frequesncy-input").empty();
    $("#first-arrival-input").empty();
});

// 3. Creat firebase event for adding trains to the database and a row in the html when a user adds an entry

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val()); // object containing the data from the recently added information
    var tInfo = childSnapshot.val();

        // store everything into a variable 
    var trainName = tInfo.name;
    var trainDest = tInfo.dest;
    var trainFreq = tInfo.freq;
    var arrTime = tInfo.arri;

        // trains info 
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFreq);
    console.log(arrTime);


    //  var tFreq = 3;



    // var minFromStart = (( nowHours - startHours) % 24)*60 + (nowMin - startMin) % 60;
    //    var minToNext = minFromStart % tFreq
       
    // //    math 
    //    if (minToNext > 24*60) {
    //        minToNext -= 24*60;
    //    }

 


    /* ( test )
    First Train of the day is 6:10AM
    Assume Train comes every 3 mins.
    Assume the current time is 6:35Am
    35 - 10 = 25min
    25 % 3 = 1(remainder) 
    3 - 1 = 2 mins away 
    2 + 6:35 = 6:37 */

    // // frequency 
    // var tFreq = 3;

    // first time train starts
    // var FirstT = moment.unix(arrTime).format("MM/DD/YYYY");





    // Create the new row
    var newRow = $("<tr>").append(
    $("<td>").text(tInfo.name),
    $("<td>").text(tInfo.dest),
    $("<td>").text(tInfo.freq),
    $("<td>").text(tInfo.arri),
    // $("<td>").text(remainderT)
    );

    // append the new row to the table 
    $("#train-table > tbody").append(newRow);

})

