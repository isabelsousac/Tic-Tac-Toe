let tictactoeGame = undefined;

function checkEndGame() {
    if (tictactoeGame.checkForDraw()) {
        console.log(possibleEnds.DRAW);
        buildDrawEnd();
        $(".cell").off("click", markCell);
    }
    if (tictactoeGame.checkForWin()) {
        console.log(possibleEnds.WIN);
        $(".cell").off("click", markCell);
        buildWinEnd();
    }
    tictactoeGame.increaseMovementNumber();
    $(".turn-icon").html(tictactoeGame.getPlayer().icon);
}

function clearField() {
    $(".end-game").removeClass("show");
    $(".turn").removeClass("hide");
    tictactoeGame.clearField();
    matchHTMLCells();
    updateHTML();
    $(".cell").on("click", markCell);
}

function updatePoints($container) {
    const previousPoint = Number($container.html());
    $container.html(previousPoint + 1);
    $(".turn-icon").html(tictactoeGame.getPlayer().icon);
}

function buildWinEnd() {
    const winnerPlayer = tictactoeGame.getPlayer();

    if (winnerPlayer.icon === possibleIcons.X_ICON) {
        updatePoints($(".xPoints p"));
    } else {
        updatePoints($(".oPoints p"));
    }

    $(".turn").addClass("hide");
    $(".end-game-phrase").html("YAY");
    $(".end-icon").html(winnerPlayer.icon);
    $(".end-game").addClass("show");
    setTimeout(clearField, 3000);
}

function buildDrawEnd() {
    updatePoints($(".draw p"));
    $(".turn").addClass("hide");
    $(".end-game-phrase").html("TRY HARDER");
    $(".end-icon").html($(`<img src="../images/draw.png">`));
    $(".end-game").addClass("show");

    setTimeout(clearField, 3000);
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
    const gridHeight = $(window).height()
    const cellSize = ((gridHeight / gridSize) / 100 * 10);
    $gameContainer.css({
        // "display": "grid",
        "grid-template-rows": `repeat(${gridSize}, ${cellSize}%)`,
        "grid-template-columns": `repeat(${gridSize}, ${cellSize}%)`,
        "place-content": "center"
    })
}

function removeBorders($cellDiv, x, y, gridSize) {
    if (y === 0) {
        $cellDiv.addClass("no-border-top");
    }
    if (x === 0) {
        $cellDiv.addClass("no-border-left");
    }
    if (x === gridSize - 1) {
        $cellDiv.addClass("no-border-rigth");
    }
    if (y === gridSize - 1) {
        $cellDiv.addClass("no-border-bottom");
    }
}

function buildHTMLGame(gridSize) {
    const $gameContainer = $(".grid-container");
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const $newDiv = $(`<div class="cell" id="${y}x${x}">`);
            $newDiv.appendTo($gameContainer);

            removeBorders($newDiv, x, y, gridSize);
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
    $(".turn-icon").html(tictactoeGame.getPlayer().icon);
    $(".cell").on("click", markCell);
});