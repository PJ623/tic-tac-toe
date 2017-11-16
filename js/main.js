function Game(boardSize, numberOfPlayers) {

    let board = [];
    let players = [];
    let turnCount = 0;  // Used to determine whose current turn it is.

    let grid = document.createElement('DIV');
    grid.className = 'grid';
    grid.style.gridTemplateColumns = 'repeat(' + boardSize + ', 1fr)';
    document.getElementById('container').appendChild(grid);
 
    // Load players.
    for (let i = 1; i <= numberOfPlayers; i++)
        players.push(i);

    // Create the board data structure.
    for (let i = 0; i < boardSize; i++) {
        board.push([]);
        for (let j = 0; j < boardSize; j++)
            board[i].push(0);
    }

    // Render the board onto the page.
    let render = function render() {
        for (let i = 0; i < board.length; i++) {
            let row = document.createElement('DIV');
            row.className = 'row';
            for (let j = 0; j < board[i].length; j++) {
                let tile = document.createElement('DIV');
                tile.className = 'tile ' + i.toString() + 'x' + j.toString() + 'y'; // TODO: Use data attribute to store coordinate values.
                tile.textContent = 0;
                tile.addEventListener('click', update, false);
                grid.appendChild(tile);
            }
        }

        // Size the tiles evenly.
        let tiles = document.getElementsByClassName('tile');
        for(let i = 0; i < tiles.length; i++)
            tiles[i].style.height = tiles[0].offsetWidth + 'px';
    }
    
    // Update the board after every turn.
    let update = function update() {
        if (this.textContent == 0) {
            turnCount++;
            this.textContent = turnCount;
            let x = this.className.toString().match(/\d(?=x)/)[0];
            let y = this.className.toString().match(/\d(?=y)/)[0];
            board[x][y] = turnCount;

            // Check if someone has won the game.
            if (checkWin() > 0) {
                let winMessage = document.createElement('P');
                winMessage.textContent = 'Player ' + turnCount + ' wins!';
                document.body.appendChild(winMessage);
                // TODO: Reset game
            }

            if (turnCount >= players.length)
                turnCount = players[0] - 1;
        }
    }

    // Check if someone has won the game.
    // Lifted from my CodeWars solution:
    // https://www.codewars.com/kata/reviews/525caa5c1bf619d28c000338/groups/5a0a993405414a048f00007b
    let checkWin = function () {

        let unfinished = false;
        let largest = -1;

        function checkPlayerWin(player) {

            let diagLtoR = 0;
            let diagRtoL = 0;
            let sameRow = 0;
            let sameCol = 0;

            for (let k = 0; k < board.length; k++) {
                if (board[k][k] == player)
                    diagLtoR++;
                if (board[k][(board.length - 1) - k] == player)
                    diagRtoL++;
            }

            if (diagLtoR == board.length || diagRtoL == board.length)
                return player;

            for (let i = 0; i < board.length; i++) {
                sameRow = 0;
                sameCol = 0;

                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] == player)
                        sameRow++;
                    else if (board[i][j] == 0)
                        unfinished = true;
                    if (board[j][i] == player)
                        sameCol++;
                }

                if (sameRow == board.length || sameCol == board[i].length)
                    return player;
            }
            return -1;
        }

        for (let i = players[0]; i <= players.length; i++) {
            if (checkPlayerWin(i) > largest)
                largest = checkPlayerWin(i);
        }

        if (largest == -1) {
            if (unfinished == true)
                return -1;
            return 0;
        }

        return largest;
    }

    // Render the board.
    render();
}

let ticTacToe = new Game(9, 2);
//let ticTacToe2 = new Game(4, 2);