const possibleIcons = {
    X_ICON: "X",
    Y_ICON: "Y",
    NOT_PLAYED_ICON: " "
}

function playerFactory(playerIcon) {
    return {
        player: playerIcon,
        hasWon: false
    }
}

function buildField(xAxisSize, yAxisSize) {
    return new Array(yAxisSize).fill(
        new Array(xAxisSize).fill("hello")
    );
}

// const gameBoard = {
//     player1: playerFactory("X"), // after it can be passed by the dom, if other icons
//     player2: playerFactory("Y"),
//     field: buildField(xAxisSize, yAxisSize)
// }

const myArray = (buildField(3, 3));
for (let i = 0; i < myArray.length; i++) {
    console.log(myArray[i].join(", "));
}