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


/*----- cached element references -----*/
let boardEl = document.getElementById('board')
let boardEls = document.querySelector('#board')
let resetEl = document.getElementById('reset')
let moveDisplayEl = document.getElementById('move-display')
let winnerEl = document.getElementById('winner')
let redCapturesEl = document.getElementById('r-captures')
let blackCapturesEl = document.getElementById('b-captures')


/*----- event listeners -----*/

// Listens to which square was selected and calls function on click according to whose turn it is:
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

// Listens for a click on the reset button and initilizes the board to start over:
resetEl.addEventListener('click', function(event) {
    console.log('resetting')
    init()
})


/*----- functions -----*/

// Builds an 8x8 chess board elements for DOM manipulation with a nested for loop:
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

// Initializes the game to the starting conditions:
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
        [black.piece, null, black.piece, null, black.piece, null, black.piece, null],
        [null, black.piece, null, black.piece, null, black.piece, null, black.piece],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [red.piece, null, red.piece, null, red.piece, null, red.piece, null],
        [null, red.piece, null, red.piece, null, red.piece, null, red.piece],
        [red.piece, null, red.piece, null, red.piece, null, red.piece, null]
    ]
    render()
}

// Renders the 2-dimensional array elements to the webpage board and whose turn it is:
function render() {
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
    rCaptures = String(12 - black.totalPieces)
    bCaptures = String(12 - red.totalPieces)
    console.log(redCapturesEl)
    redCapturesEl.innerText = `${12 - black.totalPieces}`
    blackCapturesEl.innerText = `${12 - red.totalPieces}`
}

// Runs necessary functions to make move for Red:
function redMakeMove() {
    if (clicks === 1) {
        getRedOriginSquare()
    } else if (clicks === 2) {
        moveToDestinationSquare()
    }
}

// Runs necessary functions to make move for Black:
function blackMakeMove() {
    if (clicks === 1) {
        getBlackOriginSquare()
    } else if (clicks === 2) {
        moveToDestinationSquare()
    }
}

// Checks if selected piece is a Red piece or a Red king to secure origin square coords:
function getRedOriginSquare() {
    if (board[ySelected][xSelected] === red.piece || board[ySelected][xSelected] === red.king) {
        getOriginSquare()
    } else {
        console.log('Please select a red piece')
        return
    }
}

// Checks if selected piece is a Black piece or a Black king to secure origin square coords:
function getBlackOriginSquare() {
    if (board[ySelected][xSelected] === black.piece || board[ySelected][xSelected] === black.king) {
        getOriginSquare()
    } else {
        console.log('Please select a black piece')
        return
    }
}

// Secures the orgin square coordinates
function getOriginSquare() {
    xOrigin = xSelected
    yOrigin = ySelected
    clicks = 2
    console.log(clicks)
    selected.classList.add('selected')
}

// If possible, makes the move to the destination square and renders it:
function moveToDestinationSquare() {
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

// Checks if it's possible to jump to the selected square:
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

// Checks if it's possible to move to the selected square:
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

// Changes the board values to reflect the executred move:
function move() {
    xDestination = xSelected
    yDestination = ySelected
    board[yDestination][xDestination] = board[yOrigin][xOrigin]
    board[yOrigin][xOrigin] = null
    moveExists = false
    canJump = false
}

// Promotes the piece to a king if it hits one of its end squares:
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

// Checks if a piece was captured and updates total pieces and removes the piece, if it was, then renders it to the page:
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

// If there's a winner, displays winner and turns the game off waiting for reset:
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


/*----- game -----*/
buildBoard()
init()