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
        Gameboard[index] = 'X';
        cell.textContent = 'X';

        if (checkWinner('X')) {
            alert('Player X wins!');
            resetGame();
            return;
        }

        if (!Gameboard.includes('')) {
            alert('Draw!');
            resetGame();
            return;
        }

        aiMove(); // Хід бота
    }
}

function aiMove() {
    const emptyCells = Gameboard
        .map((value, index) => (value === '' ? index : null))
        .filter(index => index !== null);

    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        Gameboard[randomIndex] = 'O';

        const cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
        cell.textContent = 'O';

        if (checkWinner('O')) {
            alert('Player O (AI) wins!');
            resetGame();
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

// Ініціалізація гри
createGameboard();
const gameboardElement = document.querySelector('.gameboard');
gameboardElement.addEventListener('click', handleCellClick);
