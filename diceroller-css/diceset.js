class DiceSet {
    constructor(owner, dateSaved, dice, modifier) {
        this.owner = owner;
        this.dateSaved = dateSaved;
        this.dice = dice;
        this.modifier = modifier;
    }

    roll() {
        let total = 0;
        for (let die of this.dice) {
            total += Math.floor(Math.random() * die) + 1;
        }
        return total + this.modifier;
    }
}

function addDiceSetToExplore(diceSet) {
    const diceSetEntry = document.createElement('div');
    diceSetEntry.classList.add('dice-set-entry');

    const userElement = document.createElement('p');
    userElement.classList.add('user-info');
    userElement.textContent = `Saved by: ${diceSet.owner}`;
    diceSetEntry.appendChild(userElement);

    const dateElement = document.createElement('p');
    dateElement.classList.add('date-saved');
    dateElement.textContent = `Date Saved: ${diceSet.dateSaved}`;
    diceSetEntry.appendChild(dateElement);

    const detailsElement = document.createElement('p');
    detailsElement.classList.add('set-details');
    detailsElement.textContent = `Set Details: d${diceSet.dice.join(', d')}, Modifier: ${diceSet.modifier}`;
    diceSetEntry.appendChild(detailsElement);

    const viewButton = document.createElement('button');
    viewButton.classList.add('view-button');
    viewButton.textContent = 'View Dice Set';
    viewButton.dataset.dicesetId = diceSet.id; // Add a data attribute to identify the dice set
    viewButton.onclick = () => {
        // Handle button click (e.g., navigate to the diceroller.html page)
        window.location.href = 'diceroller.html';
    };
    diceSetEntry.appendChild(viewButton);

    // Append the diceSetEntry to the dice-set-list
    const diceSetList = document.querySelector('.dice-set-list');
    diceSetList.appendChild(diceSetEntry);
}