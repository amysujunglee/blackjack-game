let suites = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nice', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];

let deck = [];

for (let suiteInx = 0; suiteInx < suites.length; suiteInx++) {

	for (let valInx = 0; valInx < values.length; valInx++) {

		deck.push(values[valInx] + ' of ' + suites[suiteInx]);
	}
}

for (let i = 0; i < deck.length; i++) {
	console.log(deck[i]);
}