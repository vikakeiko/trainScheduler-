  //  min as current time in min.
  var min = nowTime.getHours()*60 + nowTime.getMinutes();

  //  min0 starting time of the train
  var arrayTime = info.firstTime.split(":");
  var min0 = parseInt(arrayTime[0]) * 60 + parseInt(arrayTime[1]);

  if (min < min0) {
      min = min +24*60;
  }

  // difference bewteen min min0  =>  nextTrain in min.
  var nextTrain = info.freq - (  (min - min0) % info.freq) ;

  // min + nextTime  makes suer not greater than 24*60
  var nextTime = min + nextTrain;
  if (nextTime > 24*60) {
      nextTime -= 24*60;
  }



  // -------------
// database.ref().on("child_added", function (snapshot){
//     console.log(snapshot.val());  
//     var pInfo =  snapshot.val();
    


   //  var months = 2.34;
    
    
   //  months = (nowTime - pInfo.dateAdded)/(30*24*60*60);

   var timeSec = moment().format("X") - moment(pInfo.start, "MM/DD/YYYY").format("X");
   var timeMonth = parseInt(timeSec / (30*24*60*60));
   var total = pInfo.salary * timeMonth;
     
    var newRow = $("<tr>").html(`<td> ${pInfo.name} </td>
                                 <td> ${pInfo.role} </td>
                                 <td> ${pInfo.start} </td>
                                 <td> ${timeMonth} </td>
                                 <td> ${pInfo.salary} </td>
                                 <td> ${total} </td>
                                 `);
     $("#newRow").append(newRow); 
// -----------




  // // log from DB
    // database.ref().on("value", function (snapshot) {

    //     // Then we console.log the value of snapshot
    //     console.log(snapshot.val());

        // // Update the clickCounter variable with data from the database.
        // newTrain = snapshot.val().newTrain;

        // // Then we change the html associated with the number.
        // $("#click-value").text(snapshot.val().clickCount);

        // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
        // Again we could have named errorObject anything we wanted.
