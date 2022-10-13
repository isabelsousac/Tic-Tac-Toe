
function cellFactory() {
    return {
        icon: possibleIcons.NOT_PLAYED_ICON,
        htmlID: undefined
    }
}

function playerFactory(playerIcon) {
    return {
        icon: playerIcon,
        hasWon: false
    }
}

function buildField(gridSize) {
    const field = [];
    for (let y = 0; y < gridSize; y++) {
        field.push([]);
        for (let x = 0; x < gridSize; x++) {
            field[y].push(cellFactory());
        }
    }
    return field;
}

function cellIndex(yIndex, xIndex) {
    return {
        y: yIndex,
        x: xIndex
    }
}

function generateRandomNumber() {
    console.log(Math.floor((Math.random() * 2)));
    return Math.floor((Math.random() * 2));
}

function tictactoeFactory(gridSize) {
    return {
        player1: playerFactory(possibleIcons.X_ICON), // after it can be passed by the dom, if other icons
        player2: playerFactory(possibleIcons.O_ICON),
        field: buildField(gridSize),
        currentMovementNumber: generateRandomNumber(),

        getChoosenCell(htmlID) {
            let yIndex;
            let xIndex;
            for (let y = 0; y < this.field.length; y++) {
                for (let x = 0; x < this.field.length; x++) {
                    if (this.field[y][x].htmlID === htmlID) {
                        yIndex = y;
                        xIndex = x;
                    }
                }
            }
            return cellIndex(yIndex, xIndex);
        },

        checkForDraw() {
            const allCellsAreFilled = this.field.every(row => row.every(cell => cell.icon !== possibleIcons.NOT_PLAYED_ICON));
            const neitherPLayerHasWon = !this.player1.hasWon && !this.player2.hasWon;
            if (allCellsAreFilled && neitherPLayerHasWon) {
                return true;
            }
            return false;
        },
        checkForWin() {
            const player = this.getPlayer();
            // rows/xAxis
            for (let i = 0; i < gridSize; i++) {
                const hasPlayerWon = this.field[i].every(cell => cell.icon === player.icon);
                if (hasPlayerWon) {
                    return true;
                }
            }

            // columns/yAxis
            for (let x = 0; x < gridSize; x++) {
                let hasPlayerWon = true;
                for (let y = 0; y < gridSize; y++) {
                    if (this.field[y][x].icon !== player.icon) {
                        hasPlayerWon = false;
                        break;
                    }
                }
                if (hasPlayerWon) return true;
            }

            // diagonal -> right
            let hasPlayerWonDiagRight = true;
            for (let y = 0; y < gridSize; y++) {
                if (this.field[y][y].icon !== player.icon) {
                    hasPlayerWonDiagRight = false
                    break;
                }
            }
            if (hasPlayerWonDiagRight) return true;

            // diagonal <- left
            let hasPlayerWonDiagLeft = true;
            for (let y = 0; y < gridSize; y++) {
                if (this.field[y][(gridSize - 1) - y].icon !== player.icon) {
                    hasPlayerWonDiagLeft = false
                    break;
                }
            }
            if (hasPlayerWonDiagLeft) return true;
            
            return false;
        },

        updateCell(cell) {
            cell.icon = this.getPlayer().icon;
        },

        isCellFilled(cell) {
            return cell.icon !== possibleIcons.NOT_PLAYED_ICON;
        },

        getPlayer() {
            if (this.currentMovementNumber % 2 === 0) {
                return this.player1;
            } else {
                return this.player2;
            }
        },

        increaseMovementNumber() {
            this.currentMovementNumber++;
        },
        clearField() {
            this.field = buildField(gridSize);
            this.currentMovementNumber = generateRandomNumber();
        }
    }
}