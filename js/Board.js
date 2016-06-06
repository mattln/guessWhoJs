class Board {
    constructor(cards) {
        this.cards = cards;

        request.get("views/board.html", function(response) {
            document.getElementsByTagName("body")[0].innerHTML = response;
            populateTable(cards);
        });

        function populateTable(myArray) {
            var table = document.getElementsByTagName("td");
            for (var i = 0; i < myArray.length; i++) {
                table[i].innerHTML = myArray[i].name;
            }
        }
    }
}
