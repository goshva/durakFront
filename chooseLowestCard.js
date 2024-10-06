// chooseLowestCard.js

// Function to choose a card with a higher rank or trump card to defend
export const chooseDefenderCard = (attackerCard, defenderHand, trumpSuit) => {
    const rankOrder = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const [attackerSuit, attackerRank] = attackerCard;

    // Find all cards of the same suit as the attacker that are of higher rank
    let validCards = defenderHand.filter(card => {
        const [suit, rank] = card;
        return suit === attackerSuit && rankOrder.indexOf(rank) > rankOrder.indexOf(attackerRank);
    });

    if (validCards.length > 0) {
        // Sort the valid cards by rank and return the lowest card that can beat the attacker's card
        validCards.sort((a, b) => rankOrder.indexOf(a[1]) - rankOrder.indexOf(b[1]));
        return validCards[0];
    } else {
        // If no higher-ranked card in the same suit, look for trump cards
        let trumpCards = defenderHand.filter(card => card[0] === trumpSuit);
        if (trumpCards.length > 0) {
            trumpCards.sort((a, b) => rankOrder.indexOf(a[1]) - rankOrder.indexOf(b[1]));
            return trumpCards[0]; // Return the lowest trump card
        }
    }

    // If no suitable card to defend, return null
    return null;
};
