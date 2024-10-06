export const initializeUI = (watchedState) => {
  const dealCardsButton = document.querySelector('.deal_cards');

  if (dealCardsButton) {
    dealCardsButton.style.display = 'block';
    dealCardsButton.addEventListener('click', () => {
      console.log(watchedState.round);
      watchedState.round = false;
    });
  }

  const dialogue = document.querySelector('.players_number_dialogue');
  if (dialogue) {
    dialogue.style.display = 'none';
  }
};
