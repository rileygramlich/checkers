console.log('connected')

/*----- constants -----*/
/*----- app's state (variables) -----*/
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
    [null, black.piece, null, black.king, null, black.piece, null, black.piece],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [red.piece, null, red.king, null, red.piece, null, red.piece, null],
    [null, red.piece, null, red.piece, null, red.piece, null, red.piece],
    [red.piece, null, red.piece, null, red.piece, null, red.piece, null]
]


let redEndSquares = [1, 3, 5, 7]
let blackEndSquares = [0, 2, 4, 6]

let turn = 1
let gameOn = true 

let xOrigin = null
let yOrigin = null

let xDestination = null
let yDestination = null

let xSelected = null
let ySelected = null

let moveExists = null
let canJump = null

let winner = null

let clicks = 1

let xDestinationOptions = []
let yDestinationOptions = []


/*----- cached element references -----*/
let boardEl = document.getElementById('board')
let boardEls = document.querySelector('#board')
let resetEl = document.getElementById('reset')
let moveDisplayEl = document.getElementById('move-display')
let winnerEl = document.getElementById('winner')
let redsEl = document.getElementById('#reds')
let blacksEl = document.getElementById('#blacks')


/*----- event listeners -----*/
buildBoard()
init()

boardEls.addEventListener('click', function(event) {
    console.log('clicked')
    event.preventDefault
    if (gameOn) {
        console.log('game is on')
        selected = event.target
        coords = selected.id.split('-')
        if (selected.tagName !== 'DIV') return
        console.log(`coords: ${coords}`)
        xSelected = Number(coords[0])
        ySelected = Number(coords[1])
        if (turn === 1) {
            redMakeMove()
        } else {
            blackMakeMove()
        }
    } else {
        alert('Hit reset to play again')
    }
})

resetEl.addEventListener('click', function(event) {
    console.log('resetting')
    init()
})

/*----- functions -----*/
function redMakeMove() {
    if (clicks === 1) {
        getRedOriginSquare()
    } else if (clicks === 2) {
        getDestinationSquare()
    }
}

function getRedOriginSquare() {
    if (board[ySelected][xSelected] === red.piece || board[ySelected][xSelected] === red.king) {
        xOrigin = xSelected
        yOrigin = ySelected
        console.log('Secured origin square')
        clicks = 2
        console.log(clicks)
        selected.classList.add('selected')
    } else {
        console.log('Please select a red piece')
        return
    }
}

function getDestinationSquare() {
    console.log(`Origin coords: ${xOrigin}, ${yOrigin}`)
    console.log(`Selected coords: ${xSelected}, ${ySelected}`)
    checkIfJumpExists()
    checkIfMoveExists()
    if (canJump && board[ySelected][xSelected] === null) { 
        move()
        checkForKing()
        checkForCapture()
    } else if (moveExists && board[ySelected][xSelected] === null) {
        move()
        checkForKing()
        checkForCapture()
    }
    else if (xSelected === xOrigin && ySelected === yOrigin) {
        console.log('unselecting')
        clicks = 1
        render()
    } else {
        console.log("Move doesn't exist Please select a valid square to move to")
        return
    }
}

function checkIfMoveExists() {
    console.log('checking if move exists')
    if (board[yOrigin][xOrigin] === red.king || board[yOrigin][xOrigin] === black.king) {
        if (yOrigin - ySelected === 1 && Math.abs(xOrigin - xSelected) === 1) {
            moveExists = true
        } else if (yOrigin - ySelected === -1 && Math.abs(xOrigin - xSelected) === 1) {
            moveExists = true
        }
    } else if (turn === 1) {
        if (yOrigin - ySelected === 1 && Math.abs(xOrigin - xSelected) === 1) {
            moveExists = true
        }
    } else {
        if (yOrigin - ySelected === -1 && Math.abs(xOrigin - xSelected) === 1) {
            moveExists = true
        }
    }
}

function checkIfJumpExists() {
    console.log('checking if jump exists')
    if (turn === 1) {
        if (yOrigin - ySelected === 2 && xOrigin - xSelected === 2 && (board[yOrigin-1][xOrigin-1] === black.piece || board[yOrigin-1][xOrigin-1] === black.king)) {
            canJump = true
        } else if (yOrigin - ySelected === 2 && xOrigin - xSelected === -2 && (board[yOrigin-1][xOrigin+1] === black.piece || board[yOrigin-1][xOrigin+1] === black.king)) {
            canJump = true
        } else if (board[yOrigin][xOrigin] === red.king) {
            if (yOrigin - ySelected === -2 && xOrigin - xSelected === 2 && (board[yOrigin+1][xOrigin-1] === black.piece || board[yOrigin+1][xOrigin-1] === black.king)) {
                canJump = true
            } else if (yOrigin - ySelected === -2 && xOrigin - xSelected === -2 && (board[yOrigin+1][xOrigin+1] === black.piece || board[yOrigin+1][xOrigin+1] === black.king)) {
                canJump = true
            }
        }
    } else {
        if (yOrigin - ySelected === -2 && xOrigin - xSelected === 2 && (board[yOrigin+1][xOrigin-1] === red.piece || board[yOrigin+1][xOrigin-1] === red.king)) {
            canJump = true
        } else if (yOrigin - ySelected === -2 && xOrigin - xSelected === -2 && (board[yOrigin+1][xOrigin+1] === red.piece || board[yOrigin+1][xOrigin+1] === red.king)) {
            canJump = true
        } else if (board[yOrigin][xOrigin] === black.king) {
            if (yOrigin - ySelected === 2 && xOrigin - xSelected === 2 && (board[yOrigin-1][xOrigin-1] === red.piece || board[yOrigin-1][xOrigin-1] === red.king)) {
                canJump = true
            } else if (yOrigin - ySelected === 2 && xOrigin - xSelected === -2 && (board[yOrigin-1][xOrigin+1] === red.piece || board[yOrigin-1][xOrigin+1] === red.king)) {
                canJump = true
            }
        }
    }
}

function move() {
    xDestination = xSelected
    yDestination = ySelected
    console.log('secured destination square')
    board[yDestination][xDestination] = board[yOrigin][xOrigin]
    board[yOrigin][xOrigin] = null
    moveExists = false
    canJump = false
}

function blackMakeMove() {
    if (clicks === 1) {
        getBlackOriginSquare()
    } else if (clicks === 2) {
        getDestinationSquare()
}
}

function getBlackOriginSquare() {
    if (board[ySelected][xSelected] === black.piece || board[ySelected][xSelected] === black.king) {
        xOrigin = xSelected
        yOrigin = ySelected
        console.log('Secured origin square')
        clicks = 2
        console.log(clicks)
        selected.classList.add('selected')
    } else {
        console.log('Please select a black piece')
        return
    }
}

function checkForCapture() {
    console.log('checking for capture')
    if (turn === 1) {
        if (yDestination === yOrigin-2) {
            if (xDestination === xOrigin-2) {
                board[yOrigin-1][xOrigin-1] = null
                black.totalPieces--
                console.log(`Black total pieces: ${black.totalPieces}`)
            } else if (xDestination === xOrigin+2) {
                board[yOrigin-1][xOrigin+1] = null
                black.totalPieces--
                console.log(`Black total pieces: ${black.totalPieces}`)
        }
        } else if (yDestination === yOrigin+2) {
            if (xDestination === xOrigin-2) {
                board[yOrigin+1][xOrigin-1] = null
                black.totalPieces--
                console.log(`Black total pieces: ${black.totalPieces}`)
            } else if (xDestination === xOrigin+2) {
                board[yOrigin+1][xOrigin+1] = null
                black.totalPieces--
                console.log(`Black total pieces: ${black.totalPieces}`)
            }
        } else {
            turn = turn * -1
        }
    } else if (turn === -1) {
        if (yDestination === yOrigin+2) {
            if (xDestination === xOrigin-2) {
                board[yOrigin+1][xOrigin-1] = null
                red.totalPieces--
                console.log(`red total pieces: ${red.totalPieces}`)
            } else if (xDestination === xOrigin+2) {
                board[yOrigin+1][xOrigin+1] = null
                red.totalPieces--
                console.log(`red total pieces: ${red.totalPieces}`)
        }
        } else if (yDestination === yOrigin-2) {
            if (xDestination === xOrigin-2) {
                board[yOrigin-1][xOrigin-1] = null
                red.totalPieces--
                console.log(`red total pieces: ${red.totalPieces}`)
            } else if (xDestination === xOrigin+2) {
                board[yOrigin-1][xOrigin+1] = null
                red.totalPieces--
                console.log(`red total pieces: ${red.totalPieces}`)
            }
        } else {
            turn = turn * -1
        }
    }
    clicks = 1
    render()
    checkForWinner()
}
 
function checkForKing() {
    console.log('checking to make king')
    if (turn === 1) {
        console.log(redEndSquares)
        if (yDestination === 0 && redEndSquares.includes(xDestination)) {
            console.log(board[yDestination][xDestination])
            board[yDestination][xDestination] = red.king
        }
    } else {
        console.log(blackEndSquares)
        if (yDestination === 7 && blackEndSquares.includes(xDestination)) {
            console.log(board[yDestination][xDestination])
            board[yDestination][xDestination] = black.king
        }
    }
}

function checkForWinner() {
    if (red.totalPieces === 0) {
        console.log(`Black Wins`)
        winnerEl.innerHTML = 'Black wins the game!'
        gameOn = false
        moveDisplayEl.innerText = 'Hit reset to play again!'
    } else if (black.totalPieces === 0) {
        console.log('Red Wins')
        winnerEl.innerHTML = 'Red wins the game'
        gameOn = false
        moveDisplayEl.innerText = 'Hit reset to play again!'
    }
}

// Building a chess board with js:
function buildBoard() {
    board.forEach(function(row, y) {
        let rowEl = document.createElement('div')
        rowEl.classList.add('row')
        rowEl.id = `${y}`
            if (y % 2 === 0) {
                row.forEach(function(cell, x) {
                    let cellEl = document.createElement('div')
                    if (x % 2 !== 0) {
                        cellEl.classList.add('dark', 'square')
                    } else {
                        cellEl.classList.add('light', 'square')
                    }
                    cellEl.id = `${x}-${y}`
                    rowEl.append(cellEl)
                })
            } else {
                row.forEach(function(cell, x) {
                    let cellEl = document.createElement('div')
                    if (x % 2 === 0) {
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
    board.forEach((row, y) => {
        row.forEach((cell, x) => {
            let cellEl = document.getElementById(`${x}-${y}`)
            cellEl.classList.remove('redPiece', 'blackPiece', 'null', 'blackKing', 'redKing', 'selected')
            cellEl.classList.add(`${board[y][x]}`)
        })
    })
    turn === 1 ? moveDisplayEl.innerText = `Red's move` : moveDisplayEl.innerText = `Black's move`
    // redsEl.innerText = `${13 - black.totalPieces}`
    // blacksEl.innerText = `${13 - red.totalPieces}`
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
    
    turn = 1

    board = [
        [null, black.piece, null, black.piece, null, black.piece, null, black.piece],
        [black.piece, null, red.king, null, black.piece, null, black.piece, null],
        [null, black.piece, null, black.piece, null, black.piece, null, black.piece],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [red.piece, null, red.piece, null, red.piece, null, red.piece, null],
        [null, black.king, null, red.piece, null, black.king, null, red.piece],
        [red.piece, null, red.piece, null, red.piece, null, red.piece, null]
    ]
    render()
}