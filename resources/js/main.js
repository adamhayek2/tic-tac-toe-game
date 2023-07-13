const gameBoard = document.querySelector("#board");
const info = document.querySelector("#info");
let turn;



// create the gameboard

function createGameboard() {
const emptyTiles = " ".repeat(9).split("");
const tileGrid = emptyTiles.map((t) => '<button class="tile"></button>').join("");
gameBoard.innerHTML = tileGrid;
turn = "X";
info.textContent = `${turn}s turn`;
gameBoard.addEventListener("click", handleGameboardClick)
}


createGameboard();

function checkScore(){
    turn = turn === "X" ? "O" : "X";
}


function handleGameboardClick(e){
    const valueExist = e.target.dataset.value;
    if(!valueExist){
        e.target.dataset.value = turn;
        checkScore();
    }

}


