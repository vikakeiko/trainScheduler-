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
    var arrTime = $("#first-arrival-input").val().trim();
    
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
    var nowTime = new Date();
    //  min as current time in min.
    var min = nowTime.getHours() * 60 + nowTime.getMinutes();
    

    //  min0 starting time of the train
    var arrayTime = tInfo.arri.split(":");

    // arrayTime["00", "00"]
    var min0 = parseInt(arrayTime[0]) * 60 + parseInt(arrayTime[1]);

    if (min < min0) {
        min = min + 24 * 60;
    }

    // difference bewteen min min0  =>  nextTrain in min.
    var nextTrain = tInfo.freq - ((min - min0) % tInfo.freq);

    // min + nextTime  makes suer not greater than 24*60
    var nextTime = min + nextTrain;
    if (nextTime > 24 * 60) {
        nextTime -= 24 * 60;
    }




    // // my logic
    // var minFromStart = ((nowHours - startHours) % 24) * 60 + (nowMin - startMin) % 60;
    // console.log("currentTime: " + moment(mitFromStart).format("hh:mm"));


    // var minToNext = minFromStart % tFreq


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



    console.log(tInfo.arri);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(tInfo.name),
        $("<td>").text(tInfo.dest),
        $("<td>").text(tInfo.freq),
        $("<td>").text(parseInt(nextTime / 60).toString().padStart(2, "0") + ":" +
            (nextTime % 60).toString().padStart(2, "0")),
           
        $("<td>").text(nextTrain)
    );

    // append the new row to the table 
    $("#display").append(newRow);
})

