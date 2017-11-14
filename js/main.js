function Board(size){
    //this.size = size;
    let container = document.createElement('DIV');
    container.className = 'container';

    let arr = [];
    //this.arr = arr;
    // Build the board
    for(let i = 0; i < size; i++){
        arr.push([]);
        for(let j = 0; j < size; j++)
            arr[i].push(0);
    }

    //this.arr = arr;

    // Build it onto page
    let render = function render(){
        for(let i = 0; i < arr.length; i++){
            for(let j = 0; j < arr[i].length; j++){
                let tile = document.createElement('DIV');
                tile.className = 'tile';
                tile.textContent = arr[i][j];
                container.appendChild(tile);
            }
        }
        document.body.appendChild(container);
    }

    // update after player makes a move
    let update = function update(){
        render();        
    }

    this.print = function(){
        return arr;
    }

    this.getSize = function(){
        return size;
    }

    render();
}

let ticTacToe = new Board(3);
console.log(ticTacToe.getSize());
console.log(ticTacToe.print());
//console.log(ticTacToe.render());
//console.log(ticTacToe);