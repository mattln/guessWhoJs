class Board {
    constructor(cards, clickCard, startGame) {
        this.cards = cards;

        request.get("views/board.html", function(response) {
            document.getElementById("board").innerHTML = response;
            populateTable(cards);
            startGame();

            document.querySelector("#boardTable").addEventListener("click", clickCard, false);

        });
        
        function populateTable(myArray) {
            var table = document.getElementsByTagName("td");
            for (var i = 0; i < myArray.length; i++) {
                table[i].setAttribute("data-id", i); // aggiunto il numero della carta nell'array nell'elemento.
                table[i].innerHTML = myArray[i].name;
            }
        }
    }

    getCard(id) {
        return this.cards[id];
    }

    getRandomCard(idToExclude) {
        let cards = this.cards;

        return cards[getRandomNumber(idToExclude)];

        function getRandomNumber(numberToExclude) {
            var randomNumber = Math.floor(Math.random() * cards.length);
            if (randomNumber === numberToExclude) {
              return getRandomNumber(numberToExclude);
            }
            return randomNumber;
        }
    }
}
