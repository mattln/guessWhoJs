class Roster {
  constructor(questions, eventCallback) {
    this.questions = questions;

    request.get("views/questions.html", function(response) {
        document.getElementById("questions").innerHTML = response;
        populateTable(questions);

        document.querySelector("#questionsBoard").addEventListener("click", eventCallback, false);

    });

    function populateTable(myArray) {
        var table = document.getElementById("questions").getElementsByTagName("td");
        for (var i = 0; i < myArray.length; i++) {
            table[i].setAttribute("data-id", i);
            table[i].innerHTML = myArray[i].question;
        }
    }
  }

  getQuestion(id) {
      return this.questions[id];
  }

  remove(question) {
    question.className += "hide";

    }
}
