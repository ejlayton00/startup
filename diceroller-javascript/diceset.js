class DiceSet {
    constructor(owner, dateSaved, dice, modifier) {
        this.owner = owner;
        this.dateSaved = dateSaved;
        this.dice = dice;
        this.modifier = modifier;
    }
}

function getEmptySet() { 
    return new DiceSet("Current User", "Now", [], 0);
}

function addDiceToSet(firstDiceSet, secondDiceSet) {
    let dice = []
    for (let i = 0; i < firstDiceSet.dice.length; i++) {
        dice.push(firstDiceSet.dice[i])
    }
    for (let i = 0; i < secondDiceSet.dice.length; i++) {
        dice.push(secondDiceSet.dice[i]);
    }
    return new DiceSet("Current User", "Now", dice, firstDiceSet.modifier + secondDiceSet.modifier);
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
        saveDiceSet(diceSet);
        window.location.href = 'diceroller.html';
    };
    diceSetEntry.appendChild(viewButton);

    // Append the diceSetEntry to the dice-set-list
    const diceSetList = document.querySelector('.dice-set-list');
    diceSetList.appendChild(diceSetEntry);
}

function saveDiceSet(diceSet) {
    const diceSetJSON = JSON.stringify(diceSet);
    localStorage.setItem('savedDiceSet', diceSetJSON);
}

function loadDiceSet() {
    const diceSetJSON = localStorage.getItem('savedDiceSet');
    if (diceSetJSON) {
        const diceSet = JSON.parse(diceSetJSON);
        return diceSet;
    }
    return null;
}

function loadDiceSetIntoRoller(diceSet) {
    const diceSetColumn = document.getElementById('showDice');
    diceSetColumn.innerHTML = '';

    const modifierDiv = document.querySelectorAll('.roll-modifier');
    modifierDiv.forEach((element) => {
        if (diceSet.modifier < 0) element.textContent = `${diceSet.modifier}`;
        else element.textContent = `+${diceSet.modifier}`;
    });

    for (const die of diceSet.dice) {
        const img = document.createElement('img');
        img.src = `./images/d${die}/d${die}-${die}.png`;
        img.alt = `${die}`;
        img.width = 100;
        img.height = 'auto';
        diceSetColumn.appendChild(img);
    }

    resetRoll();
}

function resetRoll() {
    const rollDiceColumn = document.getElementById('rollDice');
    rollDiceColumn.innerHTML = '';

    const rollResult = document.getElementById('total-result');
    rollResult.innerHTML = '';
}

function removeAllDice() {
    const rollModifier = document.querySelectorAll('.roll-modifier');
    rollModifier.forEach((element) => {
        element.textContent = '';
    });

    const diceSetColumn = document.getElementById('showDice');
    diceSetColumn.innerHTML = '';
    currentDiceSet = getEmptySet();
}

function addDice() {
    const numDice = parseInt(document.getElementById('num-dice').value);
    const diceType = parseInt(document.getElementById('dice-type').value);
    const modifier = parseInt(document.getElementById('modifier').value);

    let dice = []
    for (let i = 0; i < numDice; i++) {
        dice.push(diceType);
    }

    const newDiceSet = new DiceSet("Current User", "Now", dice, modifier);
    currentDiceSet = addDiceToSet(currentDiceSet, newDiceSet);
    loadDiceSetIntoRoller(currentDiceSet);
}

function saveSetToServer() {
    if (currentDiceSet) {
        // TODO: implement server and send data to server
        console.log('Sent to server');
    } else {
        console.error('No dice set to save');
    }
}

function rollDie(die) {
    return Math.floor(Math.random() * die) + 1;
}

function rollDice() {
    if (!currentDiceSet) {
        console.error('No dice set available');
        return;
    }
    resetRoll();

    const rollResults = [];
    const rollDiceColumn = document.getElementById('rollDice');

    currentDiceSet.dice.forEach((die) => {
        const result = rollDie(die);
        rollResults.push(result);

        const img = document.createElement('img');
        img.src = `./images/d${die}/d${die}-${result}.png`;
        img.alt = `${result} on a d${die}`;
        img.width = 100;
        img.height = 'auto';
        rollDiceColumn.appendChild(img);
    });

    const totalResult = rollResults.reduce((acc, result) => acc + result, 0) + currentDiceSet.modifier;
    const average = calculateAverage();
    const minResult = calculateMinimum();
    const maxResult = calculateMaximum();

    document.getElementById('currentResult').textContent = totalResult;
    document.getElementById('total-result').textContent = totalResult;
    document.getElementById('average').textContent = average;
    document.getElementById('min').textContent = minResult;
    document.getElementById('max').textContent = maxResult;
    const chance = calculateChance(totalResult, calculateMaximum());
    document.getElementById('chance').textContent = `${chance.toFixed(2)}%`;
}

function calculateAverage() {
    let averageTotal = 0;
    currentDiceSet.dice.forEach((die) => {
        averageTotal += (die + 1) / 2;
    });
    return averageTotal;
}

function calculateMinimum() {
    let minimum = 0;
    currentDiceSet.dice.forEach((die) => {
        minimum += 1;
    });
    return minimum + currentDiceSet.modifier;
}

function calculateMaximum() {
    let maximum = 0;
    currentDiceSet.dice.forEach((die) => {
        maximum += die;
    });
    return maximum + currentDiceSet.modifier;
}

function calculateChance(totalResult, maximum) {
    return (1 - (totalResult / maximum)) * 100;
}

function updateLoggedInUser() {
    const storedUsername = localStorage.getItem('userName');
    const userNameElement = document.getElementById('user-info');
    userNameElement.textContent = storedUsername;
}