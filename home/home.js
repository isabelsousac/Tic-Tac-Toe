$(document).ready(function() {
    $("#play").on("click", function() {
        const gameSizeSelected = $("#game-size-select option:selected").val()
        location.href = `./game/game.html?gridSize=${gameSizeSelected}`;
    })
})