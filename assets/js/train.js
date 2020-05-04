$(document).ready(function(){
    // Initialize Firebase
    // Make sure to match the configuration to the script version number in the HTML
    // (Ex. 3.0 != 3.7.0)
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDtW8hfELIfL4zUPrDKBSJMqBuoin4IW3E",
        authDomain: "aanielson-695a2.firebaseapp.com",
        databaseURL: "https://aanielson-695a2.firebaseio.com",
        projectId: "aanielson-695a2",
        storageBucket: "aanielson-695a2.appspot.com",
        messagingSenderId: "643409531585",
        appId: "1:643409531585:web:a89f79b86cdb386849fa40",
        measurementId: "G-Y10051H55D"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // A variable to reference the database.
    var database = firebase.database();

    //create global variables
    var name;
    var destination;
    var firstTrain;
    var frequency = 0;

    //Capture Button Click
    $("#add-train").on("click", function(event) {
        //Capture user inputes and store them into variables
        //console log each of the user inputs to confirm we are receiving them correctly
        event.preventDefault();
        name = $("#name-input").val().trim();
        console.log(name);
        
        destination = $("#destination-input").val().trim();
        console.log(destination);
        
        firstTrainHour = ($("#first-train-hour").val() + ":");
        firstTrainMinute = $("#first-train-minute").val()
        firstTrain = firstTrainHour + firstTrainMinute;
        console.log(firstTrain);

        frequency = $("#frequency-input").val();
        console.log(frequency);

        //push the variables to the database
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $('form')[0].reset();
    });

    database.ref().on('child_added', function(childSnapshot) {
        var firstTrainNew = moment(childSnapshot.val().firstTrain, 'HH:mm');
        // Difference between the current and firstTrain
        var diffTIme = moment().diff(moment(firstTrainNew), 'minutes');
        var remainder = diffTIme % childSnapshot.val().frequency;
        // Minutes until next train
        var minAway = childSnapshot.val().frequency - remainder;
        // Next train time
        var nextTrain = moment().add(minAway, 'minutes');
        
        //output all of the new information into the relevant HTML sections
        var createRow = function(data) {
            //create a new table row element
            var tRow = $("<tr>");
            // Methods run on jQuery selectors return the selector they we run on
            // This is why we can create and save a reference to a td in the same statement we update its text
            var trainName = $("<td>").text(childSnapshot.val().name);
            var trainDestination = $("<td>").text(childSnapshot.val().destination);
            var freqMin = $("<td>").text(childSnapshot.val().frequency);
            var nextTrainDisplay = $("<td>").text(moment(nextTrain).format('HH:mm'));
            var minAwayDisplay = $("<td>").text(minAway);
            //append the newly create table data to the rable row
            tRow.append(trainName, trainDestination, freqMin, nextTrainDisplay, minAwayDisplay);
            //append the table row to the table body
            $("tbody").append(tRow);
        };
        createRow();
    });
});

document.querySelectorAll('input[type=number]')
  .forEach(e => e.oninput = () => {
    // Always 2 digits
    if (e.value.length >= 2) e.value = e.value.slice(0, 2);
    // 0 on the left (doesn't work on FF)
    if (e.value.length === 1) e.value = '0' + e.value;
    // Avoiding letters on FF
    if (!e.value) e.value = '00';
  });
