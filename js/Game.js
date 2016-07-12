class Game {
    constructor() {
        let caller = this;

        caller.phase = null;

        messages.set("Pick your card!!!");

        caller.HumanPlayer = new Player();
        caller.AiPlayer = new Player(false);

        request.get("js/data/cards.json", function(response) {
            var cards = JSON.parse(response);
            shuffleItem(cards);
            caller.board = new Board(cards, clickCard, startGame);
        });

        request.get("js/data/questions.json", function(response) {
            var questions = JSON.parse(response);
            shuffleItem(questions);
            caller.roster = new Roster(questions, clickQuestion);
        });

        function shuffleItem(myArray) {
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

        function clickCard(e) {
            if (e.target.nodeName !== "TD" || caller.phase === null) {
                return;
            }

            if (e.target !== e.currentTarget) {
                var cardId = e.target.getAttribute("data-id");
                if (caller.phase === "selectCharacter") {
                    caller.HumanPlayer.card = caller.board.getCard(cardId);
                    caller.AiPlayer.card = caller.board.getRandomCard(cardId);
                    //console.log(caller.HumanPlayer);
                    //console.log(caller.AiPlayer);

                    messages.set("Pick your question!!");

                    caller.phase = "askQuestion";

                }
            }
            e.stopPropagation();
        }

        function clickQuestion(e) {
            if (e.target.nodeName !== "TD" || caller.phase === null) {
                return;
            }

            if (e.target !== e.currentTarget) {
                var questionId = e.target.getAttribute("data-id");
                if (caller.phase === "askQuestion") {
                    var opponentCard = caller.AiPlayer.card;
                    var question = caller.roster.getQuestion(questionId);


                    console.log(opponentCard);
                    console.log(question);
                    console.log(opponentCard[question.propertyToCheck]);

                    if (opponentCard[question.propertyToCheck] === question.expectedValue) {
                        caller.board.removeCardWithoutProperty(question.propertyToCheck, question.expectedValue);
                        //console.log("yey!");
                        //console.log(opponentCard[question.expectedValue]);
                    } else {
                        caller.board.removeCardWithProperty(question.propertyToCheck, question.expectedValue);
                        //console.log("try again!!!");
                    }

                    caller.roster.remove(e.target);



                    //                    caller.phase = null;
                }
            }
            e.stopPropagation();
        }

        function startGame() {
            caller.phase = "selectCharacter";
        }
    }
}
