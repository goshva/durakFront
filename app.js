import onChange from './node_modules/on-change/index.js';
import render from './view.js';
import { generateDeck, dealCards, switchTurn } from './gameState.js';
import { appHeight } from './resize.js';
import { initializeUI } from './ui.js';
import { chooseDefenderCard } from './chooseLowestCard.js'; // Import the new module

const app = () => {
  const state = {
    init: false,
    active_suit: '',
    attacker: '',
    deck: '',
    defender: '',
    passes: 0,
    players: [],
    players_count: '',
    ranks: '',
    suits: '',
    round: true,
    currentTurn: '', // New variable to track whose turn it is
    trumpSuit: '',    // Keep track of the trump suit
    lastAttackerCard: null, // Store the attacker's last played card
  };

  // Function to handle a player's move
  const handlePlayerMove = (player, card) => {
    if (state.currentTurn === player) {
      console.log(`${player} plays ${card}`);
      state.passes += 1;
      state.lastAttackerCard = card; // Store the last attacker's card

      // Switch turn after the move
      switchTurn(state);

      // Now handle the defender's automatic move
      if (state.currentTurn === state.defender) {
        const defenderCard = chooseDefenderCard(state.lastAttackerCard, state.defender, state.trumpSuit); // Use the module to choose the right defender card
        if (defenderCard) {
          console.log(`Defender plays ${defenderCard}`);
          handlePlayerMove(state.defender, defenderCard); // Defender plays the selected card
        } else {
          console.log("Defender has no valid card to play.");
        }
      }

      console.log(`Now it's ${state.currentTurn}'s turn`);
    } else {
      console.log("It's not your turn!");
    }
  };

  // Watch and render the state changes
  const watchedState = onChange(state, render(state, handlePlayerMove)); // Pass handlePlayerMove

  // Initialize the game setup (number of players and card dealing)
  const playersNumberButtons = document.querySelectorAll('.players_number_button');
  playersNumberButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const playersNumber = parseInt(button.dataset.playersNumber, 10);
      let deck = generateDeck();

      const { players, attacker, defender, deck: remainingDeck, trump } = dealCards(deck, playersNumber);
      console.log(trump);

      watchedState.deck = remainingDeck;
      watchedState.attacker = attacker;
      watchedState.defender = defender;
      watchedState.players = players;
      watchedState.players_count = playersNumber;
      watchedState.suits = ["♥", "♦", "♣", "♠️"];
      watchedState.ranks = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];
      watchedState.currentTurn = attacker; // Set the first turn to the attacker
      watchedState.trumpSuit = trump;      // Set the trump suit for the game

      initializeUI(watchedState);
      watchedState.init = true;
    });
  });
};

appHeight();
app();
