/*------------------------------PseudoCode------------------------------ */
/*first step make a function with the gameboard,in this func i'll grab all the grid-cell divs
add a click event on each of them by calling a function getActivePlayer(). ill also make an initialize method this will start the game
as long as some flag variable is true. initialize() will probly have to be an exposed method or its just a function  outside of gameboard


ill have another function gameflow, that will have getActiveplayer method
switchPlayer playRound, inside of gameflow i will make an instance of gameboard
to access the initialize method from gameboard
*/ 

/*when i implement the winning logic i might need to grab the boardDiv.
to access  grid cells from inside of i had to make gridCells a global variable
same with statusDiv i need to be able to access it from anywhere so i can modify the
text message based game status who's turn it is and later on who won or if there's a draw
 */
const boardDiv = document.getElementById("board");
const gridCells = document.querySelectorAll(".grid-cell");
const statusDiv = document.querySelector(".display-game-status");
const restartBtn = document.querySelector(".restartBtn");

function Gameboard() {
    const gameFlow = GameFlow();
    const screen = ScreenDisplay();
    let options = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true; //flag to control the game flow

    restartBtn.addEventListener("click", reinitializeGame);
    
    gridCells.forEach((cell, index) => {
        // Only add event listeners if the game is still active
        if (gameActive) {
            cell.addEventListener("click", (e) => {
                if (options[index] === "" && gameActive) {
                   // Check if the current position in the options array is empty and if the game is still active
                    e.target.textContent = gameFlow.getActivePlayer().mark;
                    options[index] = gameFlow.getActivePlayer().mark; // update the board state
                    statusDiv.textContent = `${gameFlow.getActivePlayer().name}'s turn `;
                    
                    if (checkWinner(options, gameFlow)) {
                        screen.displayWinner(gameFlow.getActivePlayer().name);
                        gameActive = false; // Set the flag to false, preventing further moves
                    } else if (options.every(cell => cell !== "")) {
                        screen.displayDraw(); // Check for draw if board is full
                        gameActive = false; // End the game if it's a draw
                    } else {
                        gameFlow.switchPlayer();
                        screen.displayTurn();
                    }
                }
            });
        }
    });
}

function GameFlow() {
    const players = [
        { name: "Player 1", mark: "X" },
        { name: "Player 2", mark: "O" }
    ];
    let activePlayer = players[0]; // player 1 starts

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]; //switches the value of activePlayer variable which is an object
    };

    const getActivePlayer = () => activePlayer;

    return { getActivePlayer, switchPlayer };
}

function ScreenDisplay() {

    const displayWinner = (winnerName) => {
        statusDiv.textContent = `${winnerName} wins!`;
    };

    const displayDraw = () => {
        statusDiv.textContent = "It's a draw!";
    };

    const displayTurn = () => {
        statusDiv.textContent = `${gameFlow.getActivePlayer().name}'s turn (${gameFlow.getActivePlayer().mark})`;
    };

    return { displayWinner, displayDraw, displayTurn };
}

function checkWinner(board, gameFlow) {
    //func checks if there's a winning combination on the Tic-Tac-Toe board
    // each sub array contains three indices that represent a winning combo
    const winCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winCondition) {
    // loop through array of wincondition so first iteration [0,1,2] second [3,4,5]
    // Destructure the condition array into three variables (a, b, c) representing the indices of the winning positions
    // For example, in the first iteration: a = 0, b = 1, c = 2; in the second iteration: a = 3, b = 4, c = 5
        const [a, b, c] = condition;
        if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
            //if the board array at the index a is not empty check if three cells match,if its empty then conditional test is skipped
            alert(`${gameFlow.getActivePlayer().name} won! \n click on restart to play again`);
            return true;
        }
    }
    return false;
}

function reinitializeGame() {
    console.log("Reinitializing board...");
    
    // Clear the board and reset the display
    gridCells.forEach(cell => {
        cell.textContent = "";
    });
    statusDiv.textContent = "";

    // Call Gameboard to start a new game, reset game state (including options)
    Gameboard();
}

Gameboard(); // Start the initial game
