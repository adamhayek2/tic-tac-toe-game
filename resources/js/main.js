const gameBoard = document.querySelector("#board");
const info = document.querySelector("#info");
let turn;

const xwins = document.getElementById("xwins");
const owins = document.getElementById("owins");
let xWinScore = 0;
let oWinScore = 0;

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// create the gameboard

function createGameboard() {
const emptyTiles = " ".repeat(9).split("");
const tileGrid = emptyTiles.map((t) => '<button class="tile"></button>').join("");
gameBoard.innerHTML = tileGrid;
turn = "X";
info.textContent = `${turn}s turn`;
gameBoard.addEventListener("click", handleGameboardClick);
gameBoard.addEventListener("mouseenter", handleMouseEnter);
const allTiles = gameBoard.querySelectorAll(".tile");
allTiles.forEach((t) => {
    t.addEventListener("mouseenter", handleMouseEnter);
    t.addEventListener("mouseleave", handleMouseLeave);});
    gameBoard.removeAttribute("inert", true);
}


createGameboard();

function updateTurn() {
    turn = turn === "X" ? "O" : "X";
    info.textContent = `${turn}s turn`;
}

function updateScore(){
    if (info.textContent === `X wins!`){
        xWinScore++;
        xwins.textContent = `X wins: ${xWinScore}`;
        
    }else if(info.textContent === `O wins!`){
        oWinScore++;
        owins.textContent = `O wins: ${oWinScore}`;
        console.log(oWinScore)
    }
    
}

function restartGame() {
    let seconds = 3;
    const timer = setInterval(() => {
      info.textContent = `Restarting in ${seconds}…`;
      seconds--;
      if (seconds < 0) {
        // clear the interval
        clearInterval(timer);
        // restart game
        createGameboard();
      }
    }, 1000);
  }


  function showCongrats() {
    info.textContent = `${turn} wins!`;
    gameBoard.removeEventListener("click", handleGameboardClick);
    gameBoard.setAttribute("inert", true);
    updateScore();
    setTimeout(restartGame, 1000);
    
  }


function checkScore() {
    const allTiles = [...document.querySelectorAll(".tile")];
    const tileValues = allTiles.map((t) => t.dataset.value);
    const isWinner = winningCombos.some((combo) => {
      const [a, b, c] = combo;
      return (
        tileValues[a] &&
        tileValues[a] === tileValues[b] &&
        tileValues[a] === tileValues[c]
      );
    });
    if (isWinner) {
      return showCongrats();
    }
    updateTurn();
    
  }

  function handleGameboardClick(e) {
    const valueExists = e.target.dataset.value;
    if (!valueExists) {
      e.target.dataset.value = turn;
      e.target.style.setProperty("--hue", turn === "X" ? 10 : 200);
      checkScore();
    }
  }
  


  function handleMouseEnter(e) {
    const valueExists = e.target.dataset.value;
    if (!valueExists) {
      e.target.dataset.hover = turn;
      e.target.style.setProperty("--hue", turn === "X" ? 10 : 200);
    }
  }
  
  function handleMouseLeave(e) {
    e.target.dataset.hover = "";
  }