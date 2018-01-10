function Game(boardSize, players) {

    let board = [];
    let turnCount = 0;  // Used to determine whose current turn it is.
    let isFinished = false;

    let grid = document.createElement('DIV');
    grid.className = 'grid';
    grid.style.gridTemplateColumns = 'repeat(' + boardSize + ', 1fr)';
    let container = document.getElementById('container');
    container.appendChild(grid)

    // Create the board data structure.
    for (let i = 0; i < boardSize; i++) {
        board.push([]);
        for (let j = 0; j < boardSize; j++)
            board[i].push(0);
    }

    // Render the board onto the page.
    let render = function render() {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                let tile = document.createElement('DIV');
                tile.className = 'tile';
                tile.innerHTML = '<div></div>';
                tile.setAttribute('data-x', i);
                tile.setAttribute('data-y', j);
                tile.addEventListener('click', update, false);
                grid.appendChild(tile);
            }
        }

        // Size the tiles evenly.
        let tiles = document.getElementsByClassName('tile');

        for (let i = 0; i < tiles.length; i++)
            tiles[i].style.height = tiles[0].offsetWidth + 'px';
    }

    // Update the board after every turn.
    let update = function update() {
        if (this.innerHTML == '<div></div>') {
            this.innerHTML = "<img src=" + players[turnCount].symbol + ">";
            let x = this.dataset.x;
            let y = this.dataset.y;
            board[x][y] = players[turnCount].name;

            if (checkWin() > -1 && !isFinished) {
                let winMessage = document.createElement('P');
                winMessage.textContent = 'Player ' + players[turnCount].name + ' wins!';
                container.appendChild(winMessage);
                isFinished = true;
                newGame();
            } else if (checkWin() == -2 && !isFinished) {
                let drawMessage = document.createElement('P');
                drawMessage.textContent = 'No contest.';
                container.appendChild(drawMessage);
                isFinished = true;
                newGame();
            }
            turnCount++;

            if (turnCount >= players.length)
                turnCount = 0;
        }
    }

    let newGame = function newGame() {
        let nextGame = new Game(boardSize, players);
    }

    // Check if someone has won the game.
    // Lifted from my CodeWars solution:
    // https://www.codewars.com/kata/reviews/525caa5c1bf619d28c000338/groups/5a0a993405414a048f00007b
    let checkWin = function () {
        let unfinished = false;
        let largest = -1;

        function checkPlayerWin(player, turnCount) {
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
                return turnCount;

            for (let i = 0; i < board.length; i++) {
                sameRow = 0;
                sameCol = 0;

                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] == player)
                        sameRow++;
                    else if (board[i][j] == '')
                        unfinished = true;
                    if (board[j][i] == player)
                        sameCol++;
                }

                if (sameRow == board.length || sameCol == board[i].length)
                    return turnCount;
            }
            return -1;
        }

        for (let i = 0; i < players.length; i++) {
            if (checkPlayerWin(players[i].name, i) > largest)
                largest = checkPlayerWin(players[i].name, i);
        }

        if (largest == -1) {
            if (unfinished == true)
                return -1;
            return -2;
        }

        return largest;
    }

    // Render the board.
    render();
}

let players = [{ name: 'Kotori', symbol: 'assets/images/kotori.png' },
{ name: 'Nico', symbol: 'assets/images/nico.png' }];

let ticTacToe = new Game(3, players);