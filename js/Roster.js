class Roster {
  constructor(questions) {
    this.question = questions;

    request.get("views/questions.html", function(response) {
        document.getElementById("questions").innerHTML = response;
        populateTable(questions);

    });

    function populateTable(myArray) {
        var table = document.getElementsByTagName("td");
        for (var i = 0; i < myArray.length; i++) {
            table[i].innerHTML = myArray[i].question;
        }
    }
  }
}
