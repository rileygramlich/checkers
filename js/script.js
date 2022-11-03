console.log('connected')

/*----- constants -----*/
/*----- app's state (variables) -----*/

// Should I declare red and black as objects?

let red = {
    piece : 'redPiece',
    king : 'redKing',
    totalPieces : 12,
    endSquares : board[0][1, 3, 5, 7]
}

let black = {
    piece : 'blackPiece',
    king : 'blackKing',
    totalPieces : 12,
    endSquares : board[7][0, 2, 4, 6]
}


let redsMove = true
let gameOn = true 

let board = [
    [null, blackPiece, null, blackPiece, null, blackPiece, null, blackPiece]
    [blackPiece, null, blackPiece, null, blackPiece, null, blackPiece, null]
    [null, blackPiece, null, blackPiece, null, blackPiece, null, blackPiece]
    [null, null, null, null, null, null, null, null]
    [null, null, null, null, null, null, null, null]
    [redPiece, null, redPiece, null, redPiece, null, redPiece, null]
    [null, redPiece, null, redPiece, null, redPiece, null, redPiece]
    [redPiece, null, redPiece, null, redPiece, null, redPiece, null]
]

let originSquare = null
let destinationSquare = null

let moveHistory = {}

let winner = null


/*----- cached element references -----*/
/*----- event listeners -----*/
/*----- functions -----*/