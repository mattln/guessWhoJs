class Player {
    constructor(isHuman = true) {
        this.isHuman = isHuman;
        this.card = null;

        this.cardsOnBoard = null;
        this.questionsOnBoard = null;
    }

    removeOwnCardFromBoard() {
        var index = this.cardsOnBoard.indexOf(this.card);
        this.cardsOnBoard.splice(index, 1);
    }

    playTurn(opponentCard) {
        var question = this.questionsOnBoard.shift();

        if (opponentCard[question.propertyToCheck] === question.expectedValue) {
            this.removeCardWithoutProperty(question.propertyToCheck, question.expectedValue);
        } else {
            this.removeCardWithProperty(question.propertyToCheck, question.expectedValue);
        }

        if (this.cardsOnBoard.length <= 14) {
            var cardToGuess = this.cardsOnBoard.pop();
            if (cardToGuess.name === opponentCard.name) {
                messages.set("You lose! Your opponent guessed who you are!");
                return false;
            }
        }

        return true;
    }

    removeCardWithProperty(propertyName, propertyValue) {
        for (var i = 0; i < this.cardsOnBoard.length; i++) {
            if (this.cardsOnBoard[i][propertyName] === propertyValue) {
                this.cardsOnBoard.splice(i, 1);
            }
        }
    }

    removeCardWithoutProperty(propertyName, propertyValue) {
        for (var i = 0; i < this.cardsOnBoard.length; i++) {
            if (this.cardsOnBoard[i][propertyName] !== propertyValue) {
                this.cardsOnBoard.splice(i, 1);
            }
        }
    }
}
