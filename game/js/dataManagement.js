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

function checkEndGame() {
    if (tictactoeGame.checkForDraw()) {
        buildDrawEnd();
        $(".cell").off("click", markCell);
    }
    if (tictactoeGame.checkForWin()) {
        $(".cell").off("click", markCell);
        buildWinEnd();
    }
    tictactoeGame.increaseMovementNumber();
    $(".turn-icon").html(tictactoeGame.getPlayer().icon);
}
