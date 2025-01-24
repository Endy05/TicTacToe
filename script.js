const Gameboard = [
    '', '', '',
    '', '', '',
    '', '', ''
];

const container = document.querySelector('.container');

function createGameboard(size = 3) {
    const gameboard = document.createElement('div');
    gameboard.classList.add('gameboard');

    Gameboard.forEach((cellValue, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        cell.textContent = cellValue;

        gameboard.appendChild(cell);
    });

    container.appendChild(gameboard);
}

function handleCellClick(event) {
    const cell = event.target;

    if (cell.classList.contains('cell') && cell.textContent === '') {
        const index = cell.dataset.index;
        Gameboard[index] = playerChoice;
        cell.textContent = playerChoice;

        if (checkWinner(playerChoice)) {
            announcementOfResults('You wins!');
            return;
        }

        if (!Gameboard.includes('')) {
            announcementOfResults('Draw!');
            return;
        }

        aiMove(aiChoice); // Хід бота
    }
}

function aiMove() {
    const emptyCells = Gameboard
        .map((value, index) => (value === '' ? index : null))
        .filter(index => index !== null);

    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        Gameboard[randomIndex] = aiChoice;

        const cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
        cell.textContent = aiChoice;

        if (checkWinner(aiChoice)) {
            announcementOfResults('AI wins!');
        }
    }
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner(player) {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return Gameboard[a] === player && Gameboard[b] === player && Gameboard[c] === player;
    });
}

function resetGame() {
    Gameboard.fill('');
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

function announcementOfResults(text) {
    const hidden = document.querySelector('.hidden');
    const hiddenText = document.querySelector('.hidden__text');
    hidden.style.display = 'flex';
    hiddenText.textContent = text;
    document.querySelector('.restart').addEventListener('click', ()=> {
        resetGame();
        hidden.style.display = 'none';
    });
    
}

function error() {
    const error = document.querySelector('.error-message');
    error.style.display = 'flex';
    setTimeout(() => {
        error.style.display = 'none';
    }, 3000);

}



document.querySelector('.replay').addEventListener('click', resetGame);

const xBtn = document.querySelector('.x-btn');
const oBtn = document.querySelector('.o-btn');
let playerChoice = 'X';
let aiChoice = 'O';

xBtn.addEventListener('click', () => {
    if (Gameboard.every(field => field === '')) {
        xBtn.classList.add('choice');
        oBtn.classList.remove('choice');
        playerChoice = 'X';
        aiChoice = 'O';
    }
    else {
        error();
    }
});

oBtn.addEventListener('click', () => {
    if (Gameboard.every(field => field === '')) {
        xBtn.classList.remove('choice');
        oBtn.classList.add('choice');
        playerChoice = 'O';
        aiChoice = 'X';
    }
    else {
        error();
    }
});

// Ініціалізація гри
createGameboard();
const gameboardElement = document.querySelector('.gameboard');
gameboardElement.addEventListener('click', handleCellClick);
