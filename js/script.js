console.log('connected')

/*----- constants -----*/
/*----- app's state (variables) -----*/
// Should I declare red and black as objects?

let red = {
    piece : 'redPiece',
    king : 'redKing',
    totalPieces : 12,
}

let black = {
    piece : 'blackPiece',
    king : 'blackKing',
    totalPieces : 12,
}

let board = [
    [null, black.piece, null, black.piece, null, black.piece, null, black.piece],
    [black.piece, null, black.piece, null, black.piece, null, black.piece, null],
    [null, black.piece, null, black.piece, null, black.piece, null, black.piece],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [red.piece, null, red.piece, null, red.piece, null, red.piece, null],
    [null, red.piece, null, red.piece, null, red.piece, null, red.piece],
    [red.piece, null, red.piece, null, red.piece, null, red.piece, null]
]


red.endSquares = board[0][1, 3, 5, 7]
black.endSquares = board[7][0, 2, 4, 6]

let redsMove = true
let gameOn = true 


let originSquare = null
let destinationSquare = null

let moveHistory = {}

let winner = null


/*----- cached element references -----*/
let boardEl = document.getElementById('board')


/*----- event listeners -----*/
init()


/*----- functions -----*/
function buildBoard() {
    // Building a chess board with js:
    board.forEach(function(row, x) {
        let rowEl = document.createElement('div')
        rowEl.classList.add('row')
        rowEl.id = `${x}`
            if (x % 2 === 0) {
                row.forEach(function(cell, y) {
                    let cellEl = document.createElement('div')
                    if (y % 2 !== 0) {
                        cellEl.classList.add('dark', 'square')
                    } else {
                        cellEl.classList.add('light', 'square')
                    }
                    cellEl.id = `${x}-${y}`
                    rowEl.append(cellEl)
                })
            } else {
                row.forEach(function(cell, y) {
                    let cellEl = document.createElement('div')
                    if (y % 2 === 0) {
                        cellEl.classList.add('dark', 'square')
                    } else {
                        cellEl.classList.add('light', 'square')
                    }
                    cellEl.id = `${x}-${y}`
                    rowEl.append(cellEl)
                })
            }
            console.log(rowEl)
            boardEl.append(rowEl)
    })
}

function render() {
    // To render the board array to the boardEl we will do another nested array
    board.forEach((row, x) => {
        row.forEach((cell, y) => {
            let cellEl = document.getElementById(`${x}-${y}`)
            console.log(cellEl.classList)
            cellEl.classList.add(`${board[x][y]}`)
        })
    })
}


function init() {
    console.log('initializing')
    buildBoard()
    render()
}