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
            let row = document.createElement('DIV');
            row.className = 'row';
            for(let j = 0; j < arr[i].length; j++){
                let tile = document.createElement('DIV');
                tile.className = 'tile ' + i.toString() + 'x' + j.toString() + 'y';
                tile.textContent = /*arr[i][j]*/i.toString() +','+ j.toString();
                tile.addEventListener('click', update, false);
                //tile.onclick = console.log('clicked coordinate: ');
                row.appendChild(tile);
            }
            container.appendChild(row);
        }
        document.body.appendChild(container);
    }

    // update after player makes a move
    let update = function update(){
        this.textContent = 'X'; // map to player instead
        let x = this.className.toString().match(/\d(?=x)/)[0];
        let y = this.className.toString().match(/\d(?=y)/)[0];
        arr[x][y] = this.textContent;
        console.log(x + ',' + y);
        printBoard();
    }

    printBoard = function(){
        console.log(arr);
        //return arr;
    }

    this.getSize = function(){
        return size;
    }

    render();
}

let ticTacToe = new Board(3);
console.log(ticTacToe.getSize());
//console.log(ticTacToe.print());
//console.log(ticTacToe.render());
//console.log(ticTacToe);