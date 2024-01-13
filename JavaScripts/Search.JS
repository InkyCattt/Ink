var currentAnswer = '';
var useCalculator = false;

function getSearchQuery() {
    // Get the URL parameter "search"
    var urlParams = new URLSearchParams(window.location.search);
    var searchQuery = urlParams.get('search');
    
    // Check if searchQuery is null or undefined, and replace it with an empty string
    return searchQuery ? searchQuery : '';
}

// Change the title of the webpage
var searchQuery = getSearchQuery();
document.title = searchQuery ? searchQuery + " - Ink" : "Ink";

search();

// Function to perform a basic search
async function search() {
    const query = getSearchQuery();
    const results = '';
    console.log(results);
    displayResults(results, query);
}

// Function to display search results
function displayResults(results, query) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';

    if(!query) {
        const errorBox = document.createElement('div');
        errorBox.classList.add('error-box');
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'No search provided.';
        errorBox.appendChild(errorMessage);
        resultsDiv.appendChild(errorBox);
    } else if (query.includes('google')) {
        const errorBox = document.createElement('div');
        errorBox.classList.add('error-box');
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Ink: Elevating Search Beyond Googles Reach.';
        errorBox.appendChild(errorMessage);
        resultsDiv.appendChild(errorBox);

        const resultItem = document.createElement('div');
        resultItem.innerHTML = `<h3>${results}`;
        resultsDiv.appendChild(resultItem);
        resultItem.innerHTML = 'If you really want to use Google, then go to this <a href="https://www.google.com" target="_blank" style="color: #ffffff;">link</a> :(';
    } else {
        const normalizedQuery = query;

        if (normalizedQuery.includes('calculator') || normalizedQuery.includes('Calculator') || isMathExpression(normalizedQuery)) {
            // Display calculator with buttons and display bar
            const calculatorBox = document.createElement('div');
            calculatorBox.classList.add('calculator-box');

            // Calculator display bar
            const displayBar = document.createElement('div');
            displayBar.classList.add('calculator-display-bar');
            displayBar.textContent = '0';
            calculatorBox.appendChild(displayBar);

            if(isMathExpression(normalizedQuery)) {
                displayBar.textContent = query;
                currentAnswer = query;
                useCalculator = true;
            }

            // Define button labels     
            const buttonLabels = [
                ' ', 'x!', '(', ')', '%', 'CE',
                'sin', 'ln', '7', '8', '9', '/',
                'cos', 'log', '4', '5', '6', '*',
                'tan', '√', '1', '2', '3', '-',
                'Ans', 'π', '0', '.', '=', '+',
            ];      

            // Create buttons dynamically
            buttonLabels.forEach(label => {
                const button = document.createElement('div');
                button.classList.add('calculator-button');
                button.textContent = label;
                button.addEventListener('click', () => onButtonClick(label));
                calculatorBox.appendChild(button);
            });

            resultsDiv.appendChild(calculatorBox);
        } else if (normalizedQuery.includes('tetris') || normalizedQuery.includes('Tetris')) {
            // Display calculator with buttons and display bar
            const gameBox = document.createElement('div');
            gameBox.classList.add('tetris-box');

            const ns = document.createElement('div');
            ns.classList.add('tetris-box-nextshape');

            resultsDiv.appendChild(gameBox);
            resultsDiv.appendChild(ns);

            //Tetris Logic
            document.addEventListener('DOMContentLoaded', function () {
                // Tetris game code
                const tetrisBox = document.querySelector('.tetris-box');
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = 300;
                canvas.height = 560;

                tetrisBox.appendChild(canvas);

                const ROWS = 20;
                const COLUMNS = 10;
                const BLOCK_SIZE = 28;
                const FALL_SPEED = 500; // Set the fall speed in milliseconds

                const board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0));

                function drawBlock(x, y, color) {
                    ctx.fillStyle = color;
                    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#fff';
                    ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }

                function drawBoard() {
                    for (let row = 0; row < ROWS; row++) {
                        for (let col = 0; col < COLUMNS; col++) {
                            const color = board[row][col];
                            if (color !== 0) {
                                drawBlock(col, row, color);
                            }
                        }
                    }
                }

                function drawTetromino(tetromino, offset) {
                    for (let row = 0; row < tetromino.length; row++) {
                        for (let col = 0; col < tetromino[row].length; col++) {
                            if (tetromino[row][col] !== 0) {
                                drawBlock(col + offset.x, row + offset.y, tetromino[row][col]);
                            }
                        }
                    }
                }

                function clearBoard() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                
                function update() {
                    clearBoard();
                    drawBoard();
                    drawTetromino(currentTetromino.shape, currentTetromino.position);
                }

                const tetrominos = [
                    { shape: [[1, 1, 1, 1], [0, 0, 0, 0]] },  // I
                    { shape: [[1, 1, 1], [1, 0, 0]] },   // J
                    { shape: [[1, 1, 1], [0, 0, 1]] },  // L
                    { shape: [[1, 1], [1, 1]] },  // O
                    { shape: [[1, 1, 1], [0, 1, 0]] },  // S
                    { shape: [[1, 1, 1], [0, 1, 0]] },  // T
                    { shape: [[1, 1, 0], [0, 1, 1]] }   // Z
                ];

                function getRandomTetromino() {
                    const randomIndex = Math.floor(Math.random() * tetrominos.length);
                    const tetromino = tetrominos[randomIndex];
                    return {
                        shape: tetromino.shape,
                        color: tetromino.color,
                        position: { x: Math.floor((COLUMNS - tetromino.shape[0].length) / 2), y: 0 }
                    };
                }

                let currentTetromino = getRandomTetromino();
                let nextTetromino = getRandomTetromino();
                let lastTime = 0;

                function displayNextShape() {
                    const ns = document.querySelector('.tetris-box-nextshape');
                    ns.innerHTML = '';
                
                    const nsCanvas = document.createElement('canvas');
                    const nsCtx = nsCanvas.getContext('2d');
                    nsCtx.clearRect(0, 0, nsCanvas.width, nsCanvas.height);
                
                    const blockSize = 48;
                
                    // Calculate the starting position to center the tetromino
                    const startX = (nextTetromino.shape[0].length * blockSize) / 2;
                    const startY = (nextTetromino.shape.length * blockSize) / 3;
                
                    for (let row = 0; row < nextTetromino.shape.length; row++) {
                        for (let col = 0; col < nextTetromino.shape[row].length; col++) {
                            if (nextTetromino.shape[row][col] !== 0) {
                                nsCtx.fillStyle = nextTetromino.color;
                                nsCtx.fillRect(startX + col * blockSize, startY + row * blockSize, blockSize, blockSize);
                                nsCtx.lineWidth = 2;
                                nsCtx.strokeStyle = '#fff';
                                nsCtx.strokeRect(startX + col * blockSize, startY + row * blockSize, blockSize, blockSize);
                            }
                        }
                    }
                
                    ns.appendChild(nsCanvas);
                }    

                function moveDown() {
                    currentTetromino.position.y++;
                    if (checkCollision()) {
                        currentTetromino.position.y--;
                        mergeTetromino();
                        currentTetromino = nextTetromino;
                        nextTetromino = getRandomTetromino();

                        console.log(nextTetromino);
                        displayNextShape();
                    }
                }

                function moveLeft() {
                    currentTetromino.position.x--;
                    if (checkCollision()) {
                        currentTetromino.position.x++;
                    }
                }

                function moveRight() {
                    currentTetromino.position.x++;
                    if (checkCollision()) {
                        currentTetromino.position.x--;
                    }
                }

                function rotate() {
                    const originalShape = currentTetromino.shape;
                    const rotatedShape = [];

                    for (let row = 0; row < originalShape[0].length; row++) {
                        rotatedShape.push([]);
                        for (let col = 0; col < originalShape.length; col++) {
                            rotatedShape[row][col] = originalShape[originalShape.length - 1 - col][row];
                        }
                    }

                    currentTetromino.shape = rotatedShape;

                    if (checkCollision()) {
                        currentTetromino.shape = originalShape;
                    }
                }

                function checkCollision(tetromino) {
                    const shape = tetromino ? tetromino.shape : currentTetromino.shape;
                    const position = tetromino ? tetromino.position : currentTetromino.position;

                    for (let row = 0; row < shape.length; row++) {
                        for (let col = 0; col < shape[row].length; col++) {
                            if (
                                shape[row][col] !== 0 &&
                                (board[row + position.y] &&
                                    board[row + position.y][col + position.x]) !== 0
                            ) {
                                return true;
                            }
                        }
                    }
                    return false;
                }

                function mergeTetromino() {
                    for (let row = 0; row < currentTetromino.shape.length; row++) {
                        for (let col = 0; col < currentTetromino.shape[row].length; col++) {
                            if (currentTetromino.shape[row][col] !== 0) {
                                board[row + currentTetromino.position.y][col + currentTetromino.position.x] = currentTetromino.color;
                            }
                        }
                    }

                    checkRowClear();
                }

                function checkRowClear() {
                    for (let row = ROWS - 1; row >= 0; row--) {
                        if (board[row].every(cell => cell !== 0)) {
                            board.splice(row, 1);
                            board.unshift(Array(COLUMNS).fill(0));
                        }
                    }
                }

                function gameLoop(timestamp) {
                    const deltaTime = timestamp - lastTime;
                
                    if (deltaTime > FALL_SPEED) {
                        moveDown();
                        if (checkCollision()) {
                            // Game over logic
                            alert('Game Over');
                            resetGame();
                        }
                        lastTime = timestamp;
                    }
                
                    update();
                    requestAnimationFrame(gameLoop);
                }
                
                // Function to reset the game
                function resetGame() {
                    // Clear the board and start a new game
                    board.forEach(row => row.fill(0));
                    currentTetromino = getRandomTetromino();
                    displayNextShape();
                    lastTime = 0;
                    displayNextShape();
                    gameLoop(0);
                }

                // Event listeners for keyboard input
                document.addEventListener('keydown', function (e) {
                    if (e.key === 'ArrowLeft') {
                        moveLeft();
                    } else if (e.key === 'ArrowRight') {
                        moveRight();
                    } else if (e.key === 'ArrowDown') {
                        moveDown();
                    } else if (e.key === 'ArrowUp') {
                        rotate();
                    }
                });
                
                displayNextShape();
                gameLoop(0);
            });
        } else if (results.length === 0) {
            const errorBox = document.createElement('div');
            errorBox.classList.add('error-box');
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'No results found.';
            errorBox.appendChild(errorMessage);
            resultsDiv.appendChild(errorBox);
        } else {
            // Display regular search results
            const resultItem = document.createElement('div');
            resultItem.innerHTML = `<h3>${results}`;
            resultsDiv.appendChild(resultItem);
        }
    }
}

// Function to handle calculator button click
function onButtonClick(label) {
    const displayBar = document.querySelector('.calculator-display-bar');
    var currentExpression = displayBar.textContent;

    if (!useCalculator) {
        currentExpression = '';
        displayBar.textContent = '';
        currentAnswer = '';
        useCalculator = true;
    }

    if (label === 'sin' || label === 'cos' || label === 'log' || label === 'tan' || label === '√' || label === 'ln') {
        label = label += '(';
    } else if (label === 'x!') {
        label = '!'
    } else if (label === '+' || label === '-' || label === '*' || label === '/' || label === ' ' || label === '%') {
        displayBar.textContent = currentAnswer;
    }

    if (displayBar.textContent.includes('Result:') || displayBar.textContent.includes('Invalid Expression')) {
        currentExpression = '';
        displayBar.textContent = '';
    }

    if (label === '=') {
        try {
            const result = calculateTrig(currentExpression);
            displayBar.textContent = `Result: ${result}`;
            currentAnswer = result;
        } catch (error) {
            // Handle invalid expressions
            displayBar.textContent = 'Invalid Expression';
        }
    } else if (label === 'CE') {
        // Clear the input and display bar
        currentExpression = '';
        displayBar.textContent = '0';
        currentAnswer = '';
        useCalculator = false;
    } else {
        // Update the input and display bar with the pressed button
        displayBar.textContent = displayBar.textContent += label;
        currentAnswer = displayBar.textContent;
    }
}

// Function to check if the query is a math expression
function isMathExpression(query) {
    // Use a regular expression to check if the query contains math-related characters
    const mathRegex = /\d*([+\-*/=^()%]|sin\(\)|cos\(\)|tan\(\)|√\(\)|ln\(\)|log\(\)|π)/g;  
    return mathRegex.test(query);
}

// Function to calculate trigonometric and other special functions
function calculateTrig(expression) {
    // Replace trigonometric and special functions with their calculated values
    expression = expression.replace(/sin\(/g, 'Math.sin(')
                           .replace(/cos\(/g, 'Math.cos(')
                           .replace(/tan\(/g, 'Math.tan(')
                           .replace(/√\(/g, 'Math.sqrt(')
                           .replace(/ln\(/g, 'Math.log(')
                           .replace(/log\(/g, 'Math.log10(')
                           .replace(/π/g, 'Math.PI')
                           .replace(/%/g, '/100');

    const result = eval(expression);

    // Determine the number of decimal places in the result
    const decimalPlaces = (result.toString().split('.')[1] || []).length;

    // Use toFixed to round the result to the determined number of decimal places
    return parseFloat(result.toFixed(decimalPlaces));
}

// Attach the search function to the "Enter" key press event
document.getElementById('searchInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        search();
    }
});

function goToLink(searchName) {
    window.location.href = searchName;
}

function performSearch() {
    var searchTerm = document.getElementById("searchInput").value;
    window.location.href = "Search.html?search=" + searchTerm
    goToLink("Search.html?search=" + searchTerm);
}

// Alternatively, you can use JavaScript to handle the click event and navigate to the desired URL.
var logoLink = document.querySelector('.logo');
logoLink.addEventListener('click', function() {
    // Replace 'your-desired-url' with the actual URL you want to navigate to
    goToLink("Home.html");
});

// Get the search input element
var searchInput = document.getElementById('searchInput');

// Add event listener for 'keydown' event
searchInput.addEventListener('keydown', function(event) {
    // Check if the key pressed is Enter (key code 13)
    if (event.keyCode === 13) {
        // Call the performSearch function
        performSearch();
    }
});