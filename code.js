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