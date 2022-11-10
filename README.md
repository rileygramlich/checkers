# Checkers
### By [rileygramlich](https://github.com/rileygramlich)
---

## Description and Background Info:
Checkers, a simple 2 player board game, is one of the oldest games in human existence, going back to an estimated 5000 years ago.  Plato, the famous Greek philosopher, makes mention of the game as having an Egyptian origin.  The game is played on an 8 x 8 'checkered' board of light and dark squares; it is the same board used for another popular game of ancient origins - chess.

## Screenshots: 

## Technologies Used:
This browser-based game of Checkers was built entirely with the languages JavaScript, HTML, and CSS.

JavaScript was used to build all the functionality of the game, from listening for clicks to see what to do, to even building out the chessboard instead of writing all those divs in HTML. It tracks all the necessary data needed for the game in variables, for example, whose turn it is, where the pieces are on the board, how many total pieces each player has left, and the status of the game.

HTML was used to build the essential layout of the webpage. The title, the move display, the board, the reset button - all of these elements were first added in the HTML file.

CSS was used to style the webpage. All the color and also location of the elements in the webpage are manipulated using CSS. It's also used to render the correct pieces to the board and to style the selectd piece according to what classes are atributed to that HTML element by the JavaScript functions.

This game was programmed wholely on Virtual Studio Code Editor [https://code.visualstudio.com/]

Google images was used to find one original photo that included all four possible pieces and then they were cropped with basic Windows photo editor. Then since they still had a white background, [https://www.remove.bg/] was used to remove the white and convert to png images.

Google Fonts was used to find the fonts.

Microsoft paint was used to create the original wireframe.

Google Chrome and its developer tools was used to test and render the game during production.

## Getting Started: 

### Demo:
[Click to play game](linkhere)

### Instructions:
The object of the game is to clear all of your opponent's pieces from the board.
Rules:
* Red moves first.
* Turns alternate
* A regular piece must move one square forward at a diagonal either to the right or left (unless capturing a piece)
* A regular piece can capture a piece by jumping over an enemy piece and therefore moving two squares diagonally
* If you capture a piece, you can move again. (Special rule for this version) (Regular chess is played that you must make a capture if possible and you have to continuation capture)
* A regular piece becomes a king piece upong landing on a square that is on the last row further from his side
* A king piece can move in any direction one square diagonally
* A king piece can jump and capture an enemy piece in any direction and correspondingly move two square diagonally
* You cannot jump your own pieces
* You cannot jump more than one square
* You can never land on a light square
* No foul play
* Moderate trash talking acceptable

## Next Steps: Planned future enhancements:
* Add animations for when making the move
* Add sound effects for capturing a piece, winning the game, or obtaining a king
* Add in move history table
* Add computer player logic for single player option
