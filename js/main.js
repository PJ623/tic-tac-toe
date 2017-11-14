function Game(boardSize, numberOfPlayers){
    let board = [];
    let players = [];
    let turnCount = 0;  // Used to determine whose current turn it is.

    let container = document.createElement('DIV');
    container.className = 'container';

    // Load players.
    for(let i = 1; i <= numberOfPlayers; i++)
        players.push(i);

    // Create the board data structure.
    for(let i = 0; i < boardSize; i++){
        board.push([]);
        for(let j = 0; j < boardSize; j++)
            board[i].push(0);
    }

    // Render the board onto the page.
    let render = function render(){
        for(let i = 0; i < board.length; i++){
            let row = document.createElement('DIV');
            row.className = 'row';
            for(let j = 0; j < board[i].length; j++){
                let tile = document.createElement('DIV');
                tile.className = 'tile ' + i.toString() + 'x' + j.toString() + 'y';
                tile.textContent = 0;
                tile.addEventListener('click', update, false);
                row.appendChild(tile);
            }
            container.appendChild(row);
        }
        document.body.appendChild(container);
    }

    // Updates the board after every turn.
    let update = function update(){
        if(this.textContent == 0){
            turnCount++;
            this.textContent = turnCount;
            let x = this.className.toString().match(/\d(?=x)/)[0];
            let y = this.className.toString().match(/\d(?=y)/)[0];
            board[x][y] = turnCount;
    
            if(turnCount >= players.length){
                turnCount = players[0]-1;
            }
            console.log(board);
        }
        
        // TODO: Check for win after every turn.
    }
    render();
}

let ticTacToe = new Game(3, 2);