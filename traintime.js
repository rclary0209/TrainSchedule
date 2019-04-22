// 1. Initialize Firebase

  var config = {
    apiKey: "AIzaSyA6LeTtAdzgiH-3XtCbEQefoSVkb4QjvR0",
    authDomain: "fir-project1-4a1ea.firebaseapp.com",
    databaseURL: "https://fir-project1-4a1ea.firebaseio.com",
    projectId: "fir-project1-4a1ea",
    storageBucket: "fir-project1-4a1ea.appspot.com",
    messagingSenderId: "426299134355"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// 2. Create button for adding new trains - then update the html + update the database

$("#add-train").on("click", function(event) {
  event.preventDefault();



  // Grabs train input
  var name = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = moment($("#first-train-time").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency").val().trim();

// // 3. Create a way to retrieve train info from the terminal database.

//   // Creates local "temporary" object for holding new trains data
  var newTrain = {
    name,
    destination,
    firstTrain,
    frequency
  };

  console.log(newTrain);

//   // Uploads train data to the database
  database.ref().push(newTrain);

//   // Logs everything to console
  //console.log(newTrain.name);
  //console.log(newTrain.destination);
  //console.log(newTrain.arrival);
  //console.log(newTrain.frequency);

//   alert("Train successfully added");

//   // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
});

// // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());


//   // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainArrival = childSnapshot.val().firstTrain;
  var trainFrequency = childSnapshot.val().frequency;

//   // train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainArrival);
  console.log(trainFrequency);


    var convertedTime = moment(trainArrival, "X").format("HH:mm");
    var currentTime = moment();

    var convTimeObj = moment(convertedTime, "HH:mm").subtract(1, "years");

    var diffTime = currentTime.diff(convTimeObj, "minutes");

    var tRemainder = diffTime % trainFrequency;

    var tMinutesAway = trainFrequency - tRemainder;

    var nextTrain = currentTime.add(tMinutesAway, "minutes").format("hh:mm A");

//   // Prettify the train arrival
//   var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");


//   // 4. Create a way to calculate the months worked. Using difference between start and current time.
// //    Then use moment.js formatting to set difference in months.
// // 5. Calculate Total billed
//   // Calculate the months worked using hardcore math
//   // To calculate the months worked
//   var empMonths = moment().diff(moment(empStart, "X"), "months");
//   console.log(empMonths);

//   // Calculate the total billed rate
//   var empBilled = empMonths * empRate;
//   console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesAway),
  );

  
//   // Append the new row to the table
  $("#trainTable > tbody").append(newRow);
});

// // Example Time Math
// // -----------------------------------------------------------------------------
// // Assume Employee start date of January 1, 2015
// // Assume current date is March 1, 2016

// // We know that this is 15 months.
// // Now we will create code in moment.js to confirm that any attempt we use meets this tes

