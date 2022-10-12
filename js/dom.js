const tictactoeGame = tictactoeFactory(3);

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
    tictactoeGame.updateField(cellID); // o this daqui ta sendo mandado la pra dentro dessa funcao
    updateHTML();
}

$(document).ready(function() {
    matchHTMLCells();
    $(".cell").on("click", markCell);
    updateHTML();
});