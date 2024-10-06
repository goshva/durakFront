import handleCard from "./cardStyles.js"; // Import card styles

// Mapping of card suits to image folder names
const suitsMapping = {
    "♥": 'hearts',
    "♦": 'diamonds',
    "♣": 'clubs',
    "♠️": 'spades',
};

// Function to render the deck of cards
const renderDeck = (deck) => {
    const lastCard = deck[deck.length - 1];
    const container = document.querySelector('.deck_flex');
    renderLastCard(lastCard, container);
    deck.forEach(() => renderBackCard(container, 'deck_card'));
    const deckCards = document.querySelectorAll('.deck_card');
    let i = -25;
    let j = deck.length - 1;
    deckCards.forEach((image) => {
        image.style.top = `${i * 2}px`;
        image.classList.add(`deck_card_number_${j}`);
        j -= 1;
        i += 1;
    });
};

// Helper function to render the last card in the deck
const renderLastCard = (card, container) => {
    const [symbol, rank] = card;
    const suit = suitsMapping[symbol];
    const image = document.createElement('img');
    image.classList.add('card_img');
    image.classList.add('lastCard');
    image.src = `/img/${suit}${rank}.png`;
    container.appendChild(image);
};

// Helper function to render the back of a card (for face-down cards)
const renderBackCard = (container, className) => {
    const div = document.createElement('div');
    div.classList.add('grid-item');
    const image = document.createElement('img');
    image.classList.add('card_img');
    image.classList.add('card_back');
    image.classList.add(className);
    image.src = '/img/card-back.png';
    div.appendChild(image);
    container.appendChild(div);
};

// Function to render player roles (attacker/defender icons)
const renderPlayerRoles = (players, attacker, defender) => {
    const defenderIcon = new Image();
    defenderIcon.classList.add('icon');
    defenderIcon.src = './img/defender-icon.svg';

    const attackerIcon = new Image();
    attackerIcon.classList.add('icon');
    attackerIcon.src = './img/attacker-icon.svg';

    for (let i = 0; i < players.length; i += 1) {
        const playerRoleTextEl = document.querySelector(`.player${i}-role`);
        if (JSON.stringify(players[i]) === JSON.stringify(attacker)) {
            playerRoleTextEl.appendChild(attackerIcon);
        } else if (JSON.stringify(players[i]) === JSON.stringify(defender)) {
            playerRoleTextEl.appendChild(defenderIcon);
        }
    }
};

// Function to render each card for a player
const renderCard = (card, container, cardsNumber, passes, index, players, handlePlayerMove) => {
    const [symbol, rank] = card;
    const suit = suitsMapping[symbol];
    const image = document.createElement('img');
    const div = document.createElement('div');
    div.classList.add('grid-item');
    image.classList.add('card_img');
    image.classList.add('player-cards');
    image.classList.add(`cards_number-hover`);
    image.src = `/img/${suit}${rank}.png`;

    // Handle card click for making a move (for attacker)
    image.addEventListener('click', () => {
        const currentPlayer = players[0];  // Assume currentPlayer is the first in the list
        handlePlayerMove(currentPlayer, card); // Call handlePlayerMove on click
    }, { once: true });

    div.appendChild(image);
    container.appendChild(div);
};



// Function to render cards for a player (either face-up or face-down)
const renderCards = (players, player, container, isCurrentPlayer, passes, index, handlePlayerMove) => {
    passes = 0;
    if (isCurrentPlayer) {
        player.forEach((card) => {
            renderCard(card, container, player.length, passes, index, players, handlePlayerMove);
            passes += 1;
        });
    } else {
        player.forEach(() => renderBackCard(container, 'player-cards'));
    }
};

// Function to render all player cards
const renderPlayerCards = (players, currentPlayer, passes, handlePlayerMove) => {
    let i = 0;
    players.forEach((player) => {
        const playerCardsDiv = document.querySelector(`.player${i}CardsContainer`);
        const isCurrentPlayer = player === currentPlayer;
        renderCards(players, player, playerCardsDiv, isCurrentPlayer, passes, i, handlePlayerMove);
        i += 1;
    });
};

// Function to render player names
const renderPlayersNames = (players_count) => {
    for (let i = 0; i < players_count; i += 1) {
        const playerNameTextEl = document.querySelector(`.player${i}-name`);
        playerNameTextEl.textContent = `Player ${i + 1}`;
    }
};

// Main function to run the app and render the game state
const runApp = (players, passes, attacker, defender, deck, players_count, handlePlayerMove) => {
    renderDeck(deck); // Call renderDeck to display the deck
    renderPlayerRoles(players, attacker, defender); // Render player roles (attacker/defender)
    renderPlayersNames(players_count); // Render player names
    renderPlayerCards(players, players[0], passes, handlePlayerMove); // Pass handlePlayerMove
};

// Export the main render function
export default (state, handlePlayerMove) => (path, value) => {
    const { init, attacker, deck, defender, passes, players, players_count } = state;
    if (init) {
        switch (path) {
            case 'init':
                runApp(players, passes, attacker, defender, deck, players_count, handlePlayerMove);
                break;
            case 'deck':
                renderDeck(value);
                break;
            case 'players':
                renderPlayerCards(value, value[0], passes, handlePlayerMove);
                break;
            case 'attacker':
                renderPlayerRoles(players, attacker, defender);
                break;
            case 'defender':
                renderPlayerRoles(players, attacker, defender);
                break;
            case 'passes':
                renderPlayerCards(value, value[0], passes, handlePlayerMove);
                break;
            case 'round':
                dealingCards(players_count, players, attacker, defender);
                break;
            default:
                break;
        }
    }
};
