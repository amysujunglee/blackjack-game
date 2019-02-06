/*

Blackjack Game
by Amy Lee

To see more works:
amysujunglee.com, github.com/amysujunglee

*/

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
let yourScore = document.getElementById('your-score');
let newGameBtn = document.getElementById('new-game');
let hitBtn = document.getElementById('hit-button');
let stayBtn = document.getElementById('stay-button');

// Game variables
let gameStarted = false,
	gameOver = false,
	playerWon = false,
	dealerCard = [],
	playerCard = [],
	dealerScore = 0,
	playerScore = 0,
	deck = [];

// Hide Hit and Stay buttons at the beginning of the game
hitBtn.style.display = 'none';
stayBtn.style.display = 'none';
showStatus(); // 

// Start new game
newGameBtn.addEventListener('click', function() {
	gameStarted = true;
	gameOver = false;
	playerWon = false;

	deck = createDeck(); // Store the 52 cards into 'deck'
	shuffleDeck(deck); // To shuffle the cards in the deck
	dealerCard = [getNextCard(), getNextCard()];
	playerCard = [getNextCard(), getNextCard()];
	
	newGameBtn.style.display = 'none';
	hitBtn.style.display = 'inline';
	stayBtn.style.display = 'inline';
	showStatus();
});


// Create a function to store 52 cards into the deck
// 'A value' of 'a suite' (ex: Ace of Hearts)
function createDeck () {
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
function getNextCard () {
	return deck.shift();
}

// To set up the paragraph (title) - To show the game's status
function showStatus() {
	if (!gameStarted) { // '!' = Not, If the game is NOT started ..
		yourScore.innerText = " Welcome to Blackjack! ";
	return;
	}
	// Loop the entire deck - to prove
	for (var i = 0; i < deck.length; i++) {
		yourScore.innerText += '\n' + getCardString(deck[i]);
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

