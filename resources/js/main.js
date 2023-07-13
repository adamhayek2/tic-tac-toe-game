const gameBoard = document.querySelector("#board");
const info = document.querySelector("#info");
let turn;

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
    t.addEventListener("mouseleave", handleMouseLeave);
    });
}


createGameboard();


function showCongrats(){
    info.textContent = `${turn} wins!`;
    gameBoard.removeEventListener("click", handleGameboardClick);
}


function updateTurn() {
    turn = turn === "X" ? "O" : "X";
    info.textContent = `${turn}s turn`;
}
function checkScore(){
    const allTiles = [...document.querySelectorAll(".tile")];
    const tilesValues = allTiles.map((t) => t.dataset.value);
    const isWinner = winningCombos.some((combo) => {
        const [a, b, c] = combo;
        return (tilesValues[a] && tilesValues[a] === tilesValues[b] && tilesValues[b] === tilesValues[c]);
    });
    if(isWinner){
        return showCongrats();
    }
    updateTurn();
}


function handleGameboardClick(e){
    const valueExist = e.target.dataset.value;
    if(!valueExist){
        e.target.dataset.value = turn;
        e.target.style.setProperty("--hue", turn === "X" ? 10 :200);
        checkScore();
    }

}


function handleMouseEnter(e) {
    const valueExist = e.target.dataset.value;
    if(!valueExist) {
        e.target.dataset.hover = turn;
        e.target.style.setProperty("--hue", turn === "X" ? 10: 200);
    }
}


function handleMouseLeave(e) {
    e.target.dataset.hover = "";
}