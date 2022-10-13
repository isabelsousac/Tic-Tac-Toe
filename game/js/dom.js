let tictactoeGame = undefined;

function checkEndGame() {
    if (tictactoeGame.checkForDraw()) {
        console.log(possibleEnds.DRAW);
        buildDrawEnd();
    }
    if (tictactoeGame.checkForWin()) {
        console.log(possibleEnds.WIN);
        buildWinEnd();
    }
    tictactoeGame.increaseMovementNumber();
}

function clearField() {
    tictactoeGame.clearField();
    matchHTMLCells();
    updateHTML();
}

function updatePoints($container) {
    const previousPoint = Number($container.html());
    $container.html(previousPoint + 1);
}

function buildWinEnd() {
    const winnerPlayer = tictactoeGame.getPlayer();

    const $winEndGameDiv = $(`<div class=end-game">`);
    ($(`<p>YAY</p>`)).appendTo($winEndGameDiv);
    ($(winnerPlayer.icon)).appendTo($winEndGameDiv);
    $("bottom-page").prepend($winEndGameDiv);

    if (winnerPlayer.icon === possibleIcons.X_ICON) {
        updatePoints($(".xPoints p"));
    } else {
        updatePoints($(".oPoints p"));
    }

    setTimeout(clearField, 5000);
    $winEndGameDiv.remove();
}

function buildDrawEnd() {
    const $drawEndGameDiv = $(`<div class="end-game">`);
    $("<p>It's a draw</p>").appendTo($drawEndGameDiv);
    $(`<img src="../images/draw.png">`).appendTo($drawEndGameDiv);
    $("bottom-page").prepend($drawEndGameDiv);

    updatePoints($(".draw p"))
    setTimeout(clearField, 5000);
    $drawEndGameDiv.remove();
}

function updateHTML() {
    for (let y = 0; y < tictactoeGame.field.length; y++) {
        for (let x = 0; x < tictactoeGame.field[y].length; x++) {
            const cell = tictactoeGame.field[y][x];
            $(`#${cell.htmlID}`).html(cell.icon);
        }
    }
}

function matchHTMLCells() {
    const $cells = $(".cell");
    const tictactoeCells = tictactoeGame.field.flat();
    let i = 0;
    $cells.each(function() {
        const cellID = $(this).attr("id");
        tictactoeCells[i].htmlID = cellID;
        i++;
    })
}

function markCell() {
    const cellID = $(this).attr("id");
    const cellIndex = tictactoeGame.getChoosenCell(cellID);
    const chosenCell = tictactoeGame.field[cellIndex.y][cellIndex.x];
    
    if (tictactoeGame.isCellFilled(chosenCell)) {
        return;
    }
    const currentPlayer = tictactoeGame.getPlayer();
    tictactoeGame.updateCell(chosenCell);
    updateHTML();

    checkEndGame()
}

function getGridSize(gridSize) {
    return gridSizes[gridSize] || gridSizes.EASY;
}

function addGameContainerCSS(gridSize, $gameContainer) {
    const gridHeight = $gameContainer.height();
    const cellSize = ((gridHeight / gridSize) / 100 * 10);
    $gameContainer.css({
        "display": "grid",
        "grid-template-rows": `repeat(${gridSize}, ${cellSize}%)`,
        "grid-template-columns": `repeat(${gridSize}, ${cellSize}%)`,
        "place-content": "center"
    })
}

function buildHTMLGame(gridSize) {
    const $gameContainer = $(".grid-container");
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const $newDiv = $(`<div class="cell" id="${y}x${x}">`);
            $newDiv.appendTo($gameContainer);
        }
    }
    addGameContainerCSS(gridSize, $gameContainer);
}

$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const gridSizeValue = urlParams.get('gridSize');
    const gridSize = getGridSize(gridSizeValue);

    tictactoeGame = tictactoeFactory(gridSize);
    buildHTMLGame(gridSize);

    matchHTMLCells();

    $(".cell").on("click", markCell);
});