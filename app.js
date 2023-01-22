// 1. Create 52 cards 
// 2. Put the cards into the deck
// 3. Shuffle the cards
// 4. Give the player one or more cards randomly
// 5. Decide whether the player wins or loses
// 6. Reset the game


// Card variables - Create 52 cards
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nice', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];

// DOM variables - Set up some variables to access DOM
let yourScore = document.querySelector('#your-score');
let newGameBtn = document.querySelector('#new-game');
let hitBtn = document.querySelector('#hit-button');
let stayBtn = document.querySelector('#stay-button');

// Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

// Hide Hit and Stay buttons at the beginning of the game
hitBtn.style.display = 'none';
stayBtn.style.display = 'none';
showStatus(); // 

// Start new game
newGameBtn.addEventListener('click', function () {
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck(); // Store the 52 cards into 'deck'
    shuffleDeck(deck); // To shuffle the cards in the deck
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];

    newGameBtn.style.display = 'none';
    hitBtn.style.display = 'inline';
    stayBtn.style.display = 'inline';
    showStatus();
});

// Create an eventlistner for Hit and Stay buttons
hitBtn.addEventListener('click', function () {
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus(); // Update the status and the textarea
});

stayBtn.addEventListener('click', function () {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});


// Create a function to store 52 cards into the deck
// 'A value' of 'a suite' (ex: Ace of Hearts)
function createDeck() {
    // Create an empty array to store the cards
    let deck = [];

    for (let suitInx = 0; suitInx < suits.length; suitInx++) {
        for (let valueInx = 0; valueInx < values.length; valueInx++) {
            // Create 'card' object to have more clean codes
            let card = {
                suit: suits[suitInx],
                value: values[valueInx]
            };
            deck.push(card);
        }
    }
    return deck;
}

// To shuffle the cards in the deck
function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIdx]; // Temporarily hold the deck 
        deck[swapIdx] = deck[i];
        deck[i] = tmp;
    }
}

// To make '[Object, object]' into string
function getCardString(card) {
    return card.value + ' of ' + card.suit;
}

// Create a function to have the player cards
function getNextCard() {
    return deck.shift();
}

// Card numeric value
function getCardNumericValue(card) {
    switch (card.value) {
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
    }
}

// Get player and dealer's card actual score
function getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];
        score += getCardNumericValue(card);
        if (card.value === 'Ace') {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }
    return score;
}

// Update the scores
function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

// Check for end of game
function checkForEndOfGame() {
    updateScores(); // Make sure it's the current score
    
    if (gameOver) {
        // Let dealer take cards
        while(dealerScore < playerScore
             && playerScore <= 21
             && dealerScore <= 21) {
            dealerCards.push(getNextCard());
            updateScores();
        }
    }
    
    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    } else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    } else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        } else {
            playerWon = false;
        }
        
        // Don't need this functions. It's already in the showStatus function
        /*
        newGameBtn.style.display = 'inline';
        hitBtn.style.display = 'none';
        stayBtn.style.display = 'none';
        */
    }
}

// To set up the paragraph (title) - To show the game's status
function showStatus() {
    if (!gameStarted) { // '!' = Not, If the game is NOT started ..
        yourScore.innerText = " Welcome to Blackjack! ";
        return;
    }
    // Loop the entire deck - to prove
    /*
    for (var i = 0; i < deck.length; i++) {
        yourScore.innerText += '\n' + getCardString(deck[i]);
    */

    // String form of all the dealer's cards
    let dealerCardString = '';
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardString += getCardString(dealerCards[i]) + '\n'; // '\n' = a new line
    }

    // String form of all the player's cards
    let playerCardString = '';
    for (let i = 0; i < playerCards.length; i++) {
        playerCardString += getCardString(playerCards[i]) + '\n';
    }

    updateScores();

    // Display the dealer and player cards in HTML
    yourScore.innerText =
        'Dealer has:\n' +
        dealerCardString +
        '(score: ' + dealerScore + ')\n\n' +

        'Player has:\n' +
        playerCardString +
        '(score: ' + playerScore + ')\n\n';

    // If the game is over, print who won
    if (gameOver) {
        if (playerWon) {
            yourScore.innerText += "YOU WIN!";
        } else {
            yourScore.innerText += "DEALER WINS";
        }
        newGameBtn.style.display = 'inline';
        hitBtn.style.display = 'none';
        stayBtn.style.display = 'none';
    }

}



// To see if the 52 cards are correctly created
/*
for (let i = 0; i < deck.length; i++) {
	console.log(deck[i]);
}
*/


// Store 2 cards into playerCards variable
// let playerCards = [getNextCard(), getNextCard()];

// console.log("You're dealt: ");
// console.log(" " + getCardString(playerCards[0])); // Ace of Hearts
// console.log(" " + getCardString(playerCards[1])); // King of Hearts
// console.log(" " + playerCards[1]); // [object, Object]
