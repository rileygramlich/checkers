console.log('connected')

/*----- constants -----*/
/*----- app's state (variables) -----*/
// Should I declare red and black as objects?

// class Piece {
//     constructor()
// }

// 1. How come when reaching the end of the board I get a type error trying to read possible destination locations but not when allow the side of the board?

// 2. I totally forgot about the rule that you have to jump the piece if there's a jumpable piece. I don't remember playing like this growing up haha, can I program a different rule?

// 3. How can I write a program that checks if any piece can make a capture? and make it so that's the only movable piece?

// 4. 


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


let originSquare = null
let destinationSquare = null
let selected = null

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
    // console.log('')
    if (board[ySelected][xSelected] === red.piece || board[ySelected][xSelected] === red.king) {
        xOrigin = xSelected
        yOrigin = ySelected
        console.log('Secured origin square')
        clicks = 2
        console.log(clicks)
        // render in highlight of selected square
    } else {
        console.log('Please select a red piece')
        return
    }
}

function getDestinationSquare() {
    // check if they can move there
    console.log(`Origin coords: ${xOrigin}, ${yOrigin}`)
    // conditional to check if it's a king piece
    console.log(`Selected coords: ${xSelected}, ${ySelected}`)
    // conditional to check if destination square is an end piece to make a king piece
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
    } else {
        console.log("Move doesn't exist Please select a valid square to move to")
        return
    }
}

function checkIfMoveExists() {
    console.log('checking if move exists')
    // Rise over run, to get slope. but how 
    // 
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
        } else if (board[yOrigin][yOrigin] === black.king) {
            if (yOrigin - ySelected === 2 && xOrigin - xSelected === 2 && (board[yOrigin-1][xOrigin-1] === red.piece || board[yOrigin-1][xOrigin-1] === red.king)) {
                canJump = true
            } else if (yOrigin - ySelected === 2 && xOrigin - xSelected === -2 && (board[yOrigin-1][xOrigin+1] === red.piece || board[yOrigin-1][xOrigin+1] === red.king)) {
                canJump = true
            }
        }
    }
}

// Maybe if I wanna make jumps forced:
// function checkPieceCanJump() {
//     if (turn === 1) {
//         board.forEach(function(row, y) {
//             row.forEach(function(square, x) {
//                 if (board[y][x] === red.piece) {
//                     if (board[y-1][x-1] === black.piece) {
//                         canJump = true
//                     }
//                 }
//             })
//         })
//     }
// }

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
    console.log(`Black's move`)
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
        // render in highlight of selected square
    } else {
        console.log('Please select a black piece')
        return
    }
}

function getDestinationOptions() {
    console.log('getting destinationOptions')
    xDestinationOptions = null
    yDestinationOptions = null
    // check if in bounds: If y < 2 for red, if y > 6
    if (board[yOrigin][xOrigin] === red.piece) {
        xDestinationOptions = [xOrigin-1, xOrigin+1]
        yDestinationOptions = [yOrigin-1]
        if (board[yOrigin-1][xOrigin-1] === black.piece && board[yOrigin-2][xOrigin-2] === null) {
            xDestinationOptions = [xOrigin-2]
            yDestinationOptions = [yOrigin-2]
        } else if (board[yOrigin-1][xOrigin+1] === black.piece && board[yOrigin-2][xOrigin+2] === null) {
            xDestinationOptions = [xOrigin+2]
            yDestinationOptions = [yOrigin-2]
        }
    } else if (board[yOrigin][xOrigin] === black.piece) {
        xDestinationOptions = [xOrigin-1, xOrigin+1]
        yDestinationOptions = [yOrigin+1]
        if (board[yOrigin+1][xOrigin-1] === red.piece && board[yOrigin+2][xOrigin-2] === null) {
            xDestinationOptions = [xOrigin-2]
            yDestinationOptions = [yOrigin+2]
        } else if (board[yOrigin+1][xOrigin+1] === red.piece && board[yOrigin+2][xOrigin+2] === null) {
            xDestinationOptions = [xOrigin+2]
            yDestinationOptions = [yOrigin+2]
        }
    } else if (board[yOrigin][xOrigin] === red.king) {
        xDestinationOptions = [xOrigin-1, xOrigin+1]
        yDestinationOptions = [yOrigin-1, yOrigin +1]
        if (board[yOrigin-1][xOrigin-1] === black.piece && board[yOrigin-2][xOrigin-2] === null) {
            xDestinationOptions = [xOrigin-2]
            yDestinationOptions = [yOrigin-2]
        } else if (board[yOrigin-1][xOrigin+1] === black.piece && board[yOrigin-2][xOrigin+2] === null) {
            xDestinationOptions = [xOrigin+2]
            yDestinationOptions = [yOrigin-2]
        } else if (board[yOrigin+1][xOrigin-1] === black.piece && board[yOrigin+2][xOrigin-2] === null) {
            xDestinationOptions = [xOrigin-2]
            yDestinationOptions = [yOrigin+2]
        } else if (board[yOrigin+1][xOrigin+1] === black.piece && board[yOrigin+2][xOrigin+2] === null) {
            xDestinationOptions = [xOrigin+2]
            yDestinationOptions = [yOrigin+2]
        }
    } else if (board[yOrigin][xOrigin] === black.king) {
        xDestinationOptions = [xOrigin-1, xOrigin+1]
        yDestinationOptions = [yOrigin-1, yOrigin +1]
        if (board[yOrigin-1][xOrigin-1] === red.piece && board[yOrigin-2][xOrigin-2] === null) {
            xDestinationOptions = [xOrigin-2]
            yDestinationOptions = [yOrigin-2]
        } else if (board[yOrigin-1][xOrigin+1] === red.piece && board[yOrigin-2][xOrigin+2] === null) {
            xDestinationOptions = [xOrigin+2]
            yDestinationOptions = [yOrigin-2]
        } else if (board[yOrigin+1][xOrigin-1] === red.piece && board[yOrigin+2][xOrigin-2] === null) {
           xDestinationOptions = [xOrigin-2]
            yDestinationOptions = [yOrigin+2]
        } else if (board[yOrigin+1][xOrigin+1] === red.piece && board[yOrigin+2][xOrigin+2] === null) {
            xDestinationOptions = [xOrigin+2]
            yDestinationOptions = [yOrigin+2]
        }
    }
    
    console.log(`xDestionation Options: ${xDestinationOptions}`)
    console.log(`yDestination options: ${yDestinationOptions}`)
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
    // turn = turn * -1
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
    } else if (black.totalPieces === 0) {
        console.log('Red Wins')
        winnerEl.innerHTML = 'Red wins the game'
        gameOn = false
    }
}

function checkMoveAgain() {
    
}

// function redMakeMove(event) {
//     console.log('red making move')
//     originSquare = getOriginSquare(event)
//     boardEls.addEventListener('click', function(event) {
//         event.removeEvent
//         getDestinationSquare(event)
//         console.log(`Destination coords: ${xDestination}, ${yDestination}`)
//         console.log(`Origin coords: ${xOrigin}, ${yOrigin}`)
//         board[xOrigin][yOrigin] = null
//         console.log(board)
//         render()
//         return
//     },
//     {capture: true})
// }

// function getOriginSquare(event) {
//     selected = event.target
//     coords = originSquare.id.split('-')
//     console.log(coords)
//     xOrigin = coords[0]
//     yOrigin = coords[1]
//     if (board[xOrigin][yOrigin] !== red.piece) {
//         console.log('please select a red piece')
//     } else {
//         originSquare = board[xOrigin][yOrigin]
//         console.log(`Origin square: ${originSquare}`)
//         return originSquare
//     }
// }

// function getDestinationSquare(event) {
//     console.log('geting destination square')
//     destinationSquare = event.target
//     coords = destinationSquare.id.split('-')
//     console.log(coords)
//     xDestination = coords[0]
//     yDestination = coords[1]
//     // if (board[xDestination][yDestination] !== board[xOrigin-1][yOrigin-1] || (board[xDestination][yDestination]!== board[xOrigin-1][yOrigin+1])) {
//     //     console.log('please select a valid square')
//     //     return
//     if (board[xDestination][yDestination] === red.piece) {
//         console.log('You cannot take your own piece')
//         return
//     } else {
//         console.log('moving piece')
//         destinationSquare = board[xDestination][yDestination]
//         console.log([xDestination][yDestination])
//         board[xDestination][yDestination] = red.piece
//         return destinationSquare
//     }
// }

function buildBoard() {
    // Building a chess board with js:
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
            cellEl.classList.remove('redPiece', 'blackPiece', 'null', 'blackKing', 'redKing')
            cellEl.classList.add(`${board[y][x]}`)
        })
    })
    turn === 1 ? moveDisplayEl.innerText = `Red's move` : moveDisplayEl.innerText = `Black's move`
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
        [black.piece, null, black.piece, null, black.piece, null, black.piece, null],
        [null, black.piece, null, black.king, null, black.piece, null, black.piece],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [red.piece, null, red.king, null, red.piece, null, red.piece, null],
        [null, red.piece, null, red.piece, null, red.piece, null, red.piece],
        [red.piece, null, red.piece, null, red.piece, null, red.piece, null]
    ]
    render()
}