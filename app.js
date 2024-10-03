import onChange from './node_modules/on-change/index.js';
import render from './view.js';
import { generateDeck, dealCards } from './gameState.js';
import { appHeight } from './resize.js';
import { initializeUI } from './ui.js';

const app = () => {
  const state = {
    init: false,
    active_suit: '',
    attacker: '',
    deck: '',
    defender: '',
    passes: '',
    players: '',
    players_count: '',
    ranks: '',
    suits: '',
    round: true,
  };

  const watchedState = onChange(state, render(state));

  const playersNumberButtons = document.querySelectorAll('.players_number_button');
  playersNumberButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const playersNumber = parseInt(button.dataset.playersNumber, 10);
      let deck = generateDeck();  // Generate a full deck of cards

      const { players, attacker, defender, deck: remainingDeck,trump } = dealCards(deck, playersNumber);  // Deal cards
console.log(trump)
      watchedState.deck = remainingDeck;  // Update state with remaining deck
      watchedState.attacker = attacker;
      watchedState.defender = defender;
      watchedState.players = players;
      watchedState.players_count = playersNumber;
      watchedState.suits = ["♥", "♦", "♣", "♠️"];
      watchedState.ranks = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];

      initializeUI(watchedState);
      watchedState.init = true;
    });
  });
};

appHeight();
app();
