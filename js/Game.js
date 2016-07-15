class Game {
    constructor() {
        let caller = this;

        document.querySelector("#guessButtons").addEventListener("click", decideToGuess, false);

        caller.phase = null;

        messages.set("Pick your card!!!");

        caller.HumanPlayer = new Player();
        caller.AiPlayer = new Player(false);

        request.get("js/data/cards.json", function(response) {
            var cards = JSON.parse(response);
            shuffleItem(cards);
            caller.board = new Board(cards, clickCard, startGame);
            caller.AiPlayer.cardsOnBoard = JSON.parse(JSON.stringify(cards));
        });

        request.get("js/data/questions.json", function(response) {
            var questions = JSON.parse(response);
            shuffleItem(questions);
            caller.roster = new Roster(questions, clickQuestion);
            caller.AiPlayer.questionsOnBoard = JSON.parse(JSON.stringify(questions));
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
                    caller.AiPlayer.removeOwnCardFromBoard();

                    messages.set("Pick your question!!");

                    caller.phase = "askQuestion";

                } else if (caller.phase === "guessWho") {
                    if (caller.board.getCard(cardId).name === caller.AiPlayer.card.name) {
                        messages.set("Congratulations, you guessed who!!");
                    } else {
                        messages.set("You lost! too bad, next time maybe!");

                    }
                    caller.phase = null;
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

                    if (opponentCard[question.propertyToCheck] === question.expectedValue) {
                        caller.board.removeCardWithoutProperty(question.propertyToCheck, question.expectedValue);
                    } else {
                        caller.board.removeCardWithProperty(question.propertyToCheck, question.expectedValue);
                    }

                    caller.roster.remove(e.target);

                    caller.phase = "decideToGuess";
                    document.getElementById("guessButtons").className = "";

                }
            }
            e.stopPropagation();
        }

        function startGame() {
            caller.phase = "selectCharacter";
        }

        function decideToGuess(e) {
            if (e.target.nodeName !== "BUTTON" || caller.phase !== "decideToGuess") {
                return;
            }

            if (e.target.id === "decideToPass") {
                caller.phase = "aiTurn";
                messages.set("Your opponent is playing!");
                if (caller.AiPlayer.playTurn(caller.HumanPlayer.card) === true) {
                  caller.phase = "askQuestion";
                  messages.set("It is now your turn! Pick a question!");
                }
            } else {
                messages.set("Guess Who!");

                caller.phase = "guessWho";
            }

            document.getElementById("guessButtons").className = "hide";


        }
    }
}
