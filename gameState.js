export const generateDeck = () => {
    const suits = ["♥", "♦", "♣", "♠️"];
    const ranks = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const deck = [];
    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push([suit, rank]);
        });
    });

    // Shuffle the deck
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};

export const dealCards = (deck, numberOfPlayers, cardsPerPlayer = 6) => {
    const players = [];

    for (let i = 0; i < numberOfPlayers; i++) {
        const playerCards = deck.splice(0, cardsPerPlayer); // Deal cards from the deck
        players.push(playerCards);
    }

    const attacker = players[0];  // Example: First player as attacker
    const defender = players[1];  // Example: Second player as defender
    const trump = deck[deck.length - 1][0];
    return { players, attacker, defender, deck, trump };  // Return remaining deck and players
};

export const switchTurn = (state) => {
    const currentTurn = state.currentTurn;
    state.currentTurn = currentTurn === state.attacker ? state.defender : state.attacker;
};
