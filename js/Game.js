class Game {

    constructor() {
      let caller = this;
        request.get("js/data/cards.json", function(response) {
            var cards = JSON.parse(response);
            shuffleCards(cards);
            caller.board = new Board(cards);
        });


        function shuffleCards(myArray) {
            var i = myArray.length;
            if (i === 0) return false;
            while (--i) {
                var j = Math.floor(Math.random() * (i + 1));
                var tempi = myArray[i];
                var tempj = myArray[j];
                myArray[i] = tempj;
                myArray[j] = tempi;
            }
        }
    }
}
