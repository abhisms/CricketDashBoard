let totalBalls = 0;
let teamTotalScore = 0;
let playerScores = {};
let undoStack = [];
let extras = { wides: 0, noBalls: 0 };

// Player names array (replace with actual names)
const playerNames = [
    "Rohith Sharma(C)",
    "Shubhman Gill",
    "Virat Kohli",
    "Shreyas Iyer",
    "KL Rahul(WK)",
    "Suryakumar Yadav",
    "Ravindra Jadeja",
    "Jasprit Bumrah",
    "Mohammed Shami",
    "Kuldeep Yadav",
    "Mohammed Siraj"
];

function addRun(player, run) {
    totalBalls += 1;

    const currentState = {
        teamTotalScore: teamTotalScore,
        playerScores: { ...playerScores },
        extras: { ...extras }
    };
    undoStack.push(currentState);

    if (!playerScores[player]) {
        playerScores[player] = 0;
    }
    playerScores[player] += run;
    document.getElementById(`player-score-${player}`).innerText = playerScores[player];

    teamTotalScore += run;
    document.getElementById('total-score').innerText = `Extras: ${teamTotalScore}`;

    teamTotalScore += run;
    document.getElementById('team-total-score').innerText = `Team Total: ${teamTotalScore}`;

    const totalOvers = Math.floor(totalBalls / 6) + (totalBalls % 6) / 10;
    document.getElementById('total-overs').innerText = `Total Overs: ${totalOvers.toFixed(1)}`;

    // Calculate and display run rate
    const runRate = (teamTotalScore / totalOvers).toFixed(2);
    document.getElementById('run-rate').innerText = `Run Rate: ${runRate}`;
}

function addWide() {
    extras.wides += 1;
    teamTotalScore += 1;

    document.getElementById('extras-total').innerText = `Extras Total: ${extras.wides + extras.noBalls}`;
    document.getElementById('total-score').innerText = `Extras: ${teamTotalScore}`;
}

function addNoBall() {
    extras.noBalls += 1;
    teamTotalScore += 1;

    document.getElementById('extras-total').innerText = `Extras Total: ${extras.wides + extras.noBalls}`;
    document.getElementById('total-score').innerText = `Extras: ${teamTotalScore}`;
}
function undo() {
    if (undoStack.length > 0) {
        const prevState = undoStack.pop();
        teamTotalScore = prevState.teamTotalScore;
        document.getElementById('team-total-score').innerText = `Team Total: ${teamTotalScore}`;

        playerScores = { ...prevState.playerScores };
        for (const player in playerScores) {
            document.getElementById(`player-score-${player}`).innerText = playerScores[player];
        }

        totalBalls -= 1;
        const totalOvers = Math.floor(totalBalls / 6) + (totalBalls % 6) / 10;
        document.getElementById('total-overs').innerText = `Total Overs: ${totalOvers.toFixed(1)}`;

        // Calculate and display run rate
        const runRate = (teamTotalScore / totalOvers).toFixed(2);
        document.getElementById('run-rate').innerText = `Run Rate: ${runRate}`;
    } else {
        alert('No more undo steps available.');
    }
}

// Initialize player rows vertically
for (let i = 1; i <= 11; i++) {
    const playerRow = document.createElement('div');
    playerRow.classList.add('row');

    const playerName = document.createElement('div');
    playerName.classList.add('column');
    playerName.innerText = playerNames[i - 1]; // Adjusted to use playerNames array

    const playerScore = document.createElement('div');
    playerScore.classList.add('column');
    playerScore.id = `player-score-${i}`;
    playerScore.innerText = '0';

    const addRunBtn = document.createElement('div');
    addRunBtn.classList.add('column');
    addRunBtn.innerHTML = `<button onclick="addRun(${i}, 6)">Add Six</button>
                          <button onclick="addRun(${i}, 4)">Add Four</button>
                          <button onclick="addRun(${i}, 1)">Add Single</button>
                          <button onclick="addRun(${i}, 2)">Add Two</button>`;

    playerRow.appendChild(playerName);
    playerRow.appendChild(playerScore);
    playerRow.appendChild(addRunBtn);

    document.getElementById('scoreboard').appendChild(playerRow);
}

// Display team total score
const teamTotalRow = document.createElement('div');
teamTotalRow.classList.add('row', 'total');
teamTotalRow.innerHTML = `<div class="column"></div>
                          <div class="column"></div>
                          <div class="column"></div>
                          <div class="column" id="team-total-score">Team Total: 0</div>`;
document.getElementById('scoreboard').appendChild(teamTotalRow);

// Create a new row for the undo button
const undoRow = document.createElement('div');
undoRow.classList.add('row', 'undo-row');

// Add undo button
const undoButton = document.createElement('button');
undoButton.innerText = 'Undo';
undoButton.addEventListener('click', undo);
undoRow.appendChild(undoButton);

// Add the undo row to the scoreboard
document.getElementById('scoreboard').appendChild(undoRow);

// Display run rate
const runRateRow = document.createElement('div');
runRateRow.classList.add('row', 'run-rate-row');
runRateRow.innerHTML = `<div class="column"></div>
                        <div class="column"></div>
                        <div class="column"></div>
                        <div class="column" id="run-rate">Run Rate: 0.00</div>`;
document.getElementById('scoreboard').appendChild(runRateRow);
