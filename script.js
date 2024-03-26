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
const boardDiv=document.getElementById("board") 
const gridCells=document.querySelectorAll(".grid-cell");
const statusDiv=document.querySelector(".display-game-status")

/*contains the loop that allows the user to drop an x or o on the board 
contains the restart button to remove all 'x' and 'o' on the board, then reinitializes the board
create a GameFlow object to access the playGame method
create a ScreenDisplay object to access displayTurn method
*/
function Gameboard(){
   
    const gameFlow= GameFlow()
    const screen=ScreenDisplay()
    const restartBtn=document.querySelector(".restartBtn")  
    restartBtn.addEventListener("click",reinitializeGame)

   
   //loop through gridCells and add an eventlistener
   gridCells.forEach((cell)=>{
        cell.addEventListener("click",(e)=>{
            e.target.textContent=gameFlow.getActivePlayer().mark
            screen.displayTurn()
            gameFlow.playGame()
            
        })
       
})


}

/*mostly in charge of controlling the flow of the game, like switching players turn
and contains the players which is an array of 2 objects(dict/hashmap)
*/
function GameFlow(){
    const players=[
        {
            name:"player1",
            mark:"X"
        },
        {
            name:"player2",
            mark:"O"
        }
    ]
    let activePlayer=players[0];
    const switchPlayer=()=>{
        return activePlayer=activePlayer===players[0] ?players[1] :players[0];
    }
    const getActivePlayer=()=>{
        return activePlayer;
    }

   /*  const printNewRound=()=>{
        console.log(`${getActivePlayer().name} put your mark`);
    } */
    
    const playGame=()=>{
        //call switchPlayer before displaying console message
        switchPlayer();
        console.log(`time for ${getActivePlayer().name} to put an '${getActivePlayer().mark}' on the board`)
       
        
    }
   
   
// these exposed methods can be accessed when I make a GameFlow object obj=GameFlow() obj.getActivePlayer()
   return{
    getActivePlayer,
    playGame,
    switchPlayer
   }
}

/* will be in charge of displaying message to the webpage 
the different message like who's turn it is and eventually who won or if its a draw
will be displayed inside of the statusDiv.
gameflow obj will have access to Gameflow methods like
 switchPlayer and another to a future method that will checkforwins or draws and display some msg on the statusDiv
*/
function ScreenDisplay(){
    const gameFlow=GameFlow();
   
    
    const displayTurn =()=>{
        //when calling getActivePlayer method from GameFlow must call switchPlayer() first otherwise statusDiv shows incorrect info
        gameFlow.switchPlayer()
        statusDiv.textContent=gameFlow.getActivePlayer().name;
        
        
    }

    return{
        displayTurn
    }
}


/*simple func to re-start the game by making each grid cell = to an empty str
then calls Gameboard to restart the game properly (player1 x should always be starting)*/
function reinitializeGame(){
    console.log("hello reinitializing board in 3 2 1...");
    gridCells.forEach(cell=>{
        cell.textContent=""
    })
    statusDiv.textContent=""
    Gameboard()
}


Gameboard();
/* GameFlow(); */