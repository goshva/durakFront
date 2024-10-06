import onChange from './node_modules/on-change/index.js';
import render from './view.js';
import { generateDeck, dealCards, switchTurn } from './gameState.js';
import { appHeight } from './resize.js';
import { initializeUI } from './ui.js';

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
  };

  // Function to handle a player's move
  const handlePlayerMove = (player, card) => {
    if (state.currentTurn === player) {
      console.log(`${player} plays ${card}`);
      state.passes += 1;

      // Switch turn after the move
      switchTurn(state);
      console.log(`Now it's ${state.currentTurn}'s turn`);
    } else {
      console.log("It's not your turn!");
    }
  };

  // Watch and render the state changes
  const watchedState = onChange(state, render(state, handlePlayerMove)); // Pass handlePlayerMove here

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

      initializeUI(watchedState);
      watchedState.init = true;
    });
  });
};

appHeight();
app();
