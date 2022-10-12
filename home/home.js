$(document).ready(function() {
    $("#play").on("click", function() {
        const gameSizeSelected = $("#game-size-select option:selected").val()
        $("#game-link").attr("href", `../game/game.html?gridSize=${gameSizeSelected}`);
    })
})