// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var config = {

}
firebase.initializeApp(config);
var database = firebase.database();

//Capture Button Click
$("#add-train").on("click", function(event) {
    //Capture user inputes and store them into variables
    //console log each of the user inputs to confirm we are receiving them correctly
    var name = $("#name-input").val().trim();
    $("#name-display").html(name);

    var destination = $("#destination-input").val().trim();
    $("#destination-display").html(destination);

    var firstTrain = $("#first-train-input").val().trim();
    $("#first-train-display").html(DOMMatrixReadOnly);

    var frequency = $("#frequency-input").val().trim();
    $("#frequency-display").html(frequency);
    
    console.log(name);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    //output all of the new information into the relevant HTML sections
    var createRow = function(data) {
        //create a new table row element
        var tRow = $("<tr>");
        // Methods run on jQuery selectors return the selector they we run on
        // This is why we can create and save a reference to a td in the same statement we update its text
        var trainName = $("<td>").text(name);
        var trainDestination = $("<td>").text(destination);
        var freqMin = $("<td>").text(frequency);
        ///need to use math to adjust firstTrain variable into the next train
        var nextTrain = $("<td>").text();
        ///need to use math to adjust firstTrain variable/nextTrain var into the minutes away
        var minAway = $("<td>").text();
        //append the newly create table data to the rable row
        tRow.append(trainName, trainDestination, freqMin, nextTrain, minAway);
        //append the table row to the table body
        $("tbody").append(tRow);
    };

    //push the variables to the database
    database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    })
});