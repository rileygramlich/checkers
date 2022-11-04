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

let xOrigin = null
let yOrigin = null

let moveHistory = {}

let winner = null


/*----- cached element references -----*/
let boardEl = document.getElementById('board')
let boardEls = document.querySelector('#board')
let resetEl = document.getElementById('reset')


/*----- event listeners -----*/
init()

boardEls.addEventListener('click', function(event) {
    console.log('clicked')
    event.preventDefault
    if (gameOn) {
        console.log('game is on')
        if (redsMove) {
            redMakeMove(event)
        } else {
            // blackMakeMove
        }
    } else {
        alert('Hit reset to play again')
    }
    render()
})


/*----- functions -----*/
function redMakeMove(event) {
    console.log('red making move')
    originSquare = getOriginSquare(event)
    boardEls.addEventListener('click', function(event) {
        event.removeEvent
        destinationSquare = getDestinationSquare(event)
        console.log(`Destination coords: ${xDestination}, ${yDestination}`)
        console.log(xOrigin, yOrigin)
        board[xOrigin][yOrigin] = null
        console.log(board)
        return
    },
    {capture: true})
}

function getOriginSquare(event) {
    originSquare = event.target
    coords = originSquare.id.split('-')
    console.log(coords)
    xOrigin = coords[0]
    yOrigin = coords[1]
    if (board[xOrigin][yOrigin] !== red.piece) {
        console.log('please select a red piece')
    } else {
        originSquare = board[xOrigin][yOrigin]
        console.log(`Origin square: ${originSquare}`)
        return originSquare
    }
}

function getDestinationSquare(event) {
    console.log('geting destination square')
    destinationSquare = event.target
    coords = destinationSquare.id.split('-')
    console.log(coords)
    xDestination = coords[0]
    yDestination = coords[1]
    if (board[xDestination][yDestination] === red.piece) {
        console.log('You cannot take your own piece')
        return
    } else {
        console.log('moving piece')
        destinationSquare = board[xDestination][yDestination]
        console.log([xDestination][yDestination])
        board[xDestination][yDestination] = red.piece
        return destinationSquare
    }
}

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
    console.log('rendering:')
    console.log(board)
    board.forEach((row, x) => {
        row.forEach((cell, y) => {
            let cellEl = document.getElementById(`${x}-${y}`)
            cellEl.classList.remove('redPiece', 'blackPiece', 'null')
            cellEl.classList.add(`${board[x][y]}`)
        })
    })
}


function init() {
    console.log('initializing')
    red = {
        piece : 'redPiece',
        king : 'redKing',
        totalPieces : 12,
    }
    
    black = {
        piece : 'blackPiece',
        king : 'blackKing',
        totalPieces : 12,
    }
    
    board = [
        [null, black.piece, null, black.piece, null, black.piece, null, black.piece],
        [black.piece, null, black.piece, null, black.piece, null, black.piece, null],
        [null, black.piece, null, black.piece, null, black.piece, null, black.piece],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [red.piece, null, red.piece, null, red.piece, null, red.piece, null],
        [null, red.piece, null, red.piece, null, red.piece, null, red.piece],
        [red.piece, null, red.piece, null, red.piece, null, red.piece, null]
    ]
    buildBoard()
    render()
    // gameOn()
}